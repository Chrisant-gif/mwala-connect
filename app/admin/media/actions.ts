
"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { createClient } from "../../../lib/supabase/server";

export interface UploadMediaState {
  success: boolean;
  message: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES: Record<string, "image" | "video" | "document"> = {
  "image/jpeg": "image",
  "image/png": "image",
  "image/webp": "image",
  "video/mp4": "video",
  "application/pdf": "document",
};

const FAILED: UploadMediaState = {
  success: false,
  message: "An unexpected error occurred. Please try again.",
};

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

function makeDateLabel(value: string): string | null {
  if (!value) return null;

  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function safeFileName(name: string): string {
  return (
    name.normalize("NFKD")
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .replace(/-+/g, "-")
      .slice(-120) || "media"
  );
}

function readId(value: FormDataEntryValue | null): number | null {
  const text = String(value ?? "");
  const id = Number(text);

  return /^[1-9]\d*$/.test(text) && Number.isSafeInteger(id)
    ? id
    : null;
}

async function getAdminClient() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      supabase: null,
      message: "Your session has expired. Please sign in again.",
    };
  }

  const { data: isAdmin, error: roleError } =
    await supabase.rpc("is_admin");

  if (roleError || isAdmin !== true) {
    return {
      supabase: null,
      message: "You are not authorized to manage project media.",
    };
  }

  return { supabase, message: null };
}

async function getMediaRecord(
  supabase: NonNullable<
    Awaited<ReturnType<typeof getAdminClient>>["supabase"]
  >,
  id: number,
) {
  return supabase
    .from("project_media")
    .select("id, project_id, storage_path, media_date, date_label")
    .eq("id", id)
    .maybeSingle();
}

function refreshMediaPaths(projectIds: number[]) {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/media");

  for (const id of new Set(projectIds)) {
    revalidatePath(`/projects/${id}`);
  }
}

export async function uploadProjectMedia(
  _previousState: UploadMediaState,
  formData: FormData,
): Promise<UploadMediaState> {
  try {
    const { supabase, message } = await getAdminClient();
    if (!supabase) return { success: false, message: message! };

    const projectId = readId(formData.get("project_id"));
    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const mediaDate = String(formData.get("media_date") ?? "").trim();
    const file = formData.get("file");

    if (!projectId) {
      return { success: false, message: "Please select a valid project." };
    }

    if (!title || title.length > 160) {
      return {
        success: false,
        message: "Enter a title of up to 160 characters.",
      };
    }

    if (description.length > 2000) {
      return {
        success: false,
        message: "The description must be 2,000 characters or fewer.",
      };
    }

    if (mediaDate && !isValidDate(mediaDate)) {
      return { success: false, message: "Please enter a valid media date." };
    }

    if (!(file instanceof File) || file.size === 0) {
      return { success: false, message: "Please choose a file to upload." };
    }

    if (file.size > MAX_FILE_SIZE) {
      return { success: false, message: "The file exceeds the 10 MB limit." };
    }

    const mediaType = ALLOWED_TYPES[file.type];
    if (!mediaType) {
      return {
        success: false,
        message: "Use a JPEG, PNG, WebP, MP4, or PDF file.",
      };
    }

    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id")
      .eq("id", projectId)
      .maybeSingle();

    if (projectError || !project) {
      return {
        success: false,
        message: "The selected project could not be found.",
      };
    }

    const storagePath =
      `${projectId}/${randomUUID()}-${safeFileName(file.name)}`;

    const { error: uploadError } = await supabase.storage
      .from("project-media")
      .upload(storagePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Media upload failed:", uploadError.message);
      return { success: false, message: "The file could not be uploaded." };
    }

    const { data: publicUrlData } = supabase.storage
      .from("project-media")
      .getPublicUrl(storagePath);

    const { error: insertError } = await supabase
      .from("project_media")
      .insert({
        project_id: projectId,
        media_type: mediaType,
        title,
        description: description || null,
        url: publicUrlData.publicUrl,
        storage_path: storagePath,
        media_date: mediaDate || null,
        date_label: makeDateLabel(mediaDate),
      });

    if (insertError) {
      console.error("Media record creation failed:", insertError.message);
      const { error: cleanupError } = await supabase.storage
        .from("project-media")
        .remove([storagePath]);

      if (cleanupError) {
        console.error("Orphaned file cleanup failed:", cleanupError.message);
      }

      return {
        success: false,
        message: "The file uploaded, but its record could not be saved.",
      };
    }

    refreshMediaPaths([projectId]);
    return { success: true, message: "Project media uploaded successfully." };
  } catch (error) {
    console.error("Media upload failed:", error);
    return FAILED;
  }
}

export async function updateProjectMedia(
  _previousState: UploadMediaState,
  formData: FormData,
): Promise<UploadMediaState> {
  try {
    const { supabase, message } = await getAdminClient();
    if (!supabase) return { success: false, message: message! };

    const id = readId(formData.get("media_id"));
    const projectId = readId(formData.get("project_id"));
    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const mediaDate = String(formData.get("media_date") ?? "").trim();

    if (!id || !projectId) {
      return { success: false, message: "Invalid media or project." };
    }

    if (!title || title.length > 160) {
      return {
        success: false,
        message: "Enter a title of up to 160 characters.",
      };
    }

    if (description.length > 2000) {
      return {
        success: false,
        message: "The description must be 2,000 characters or fewer.",
      };
    }

    if (mediaDate && !isValidDate(mediaDate)) {
      return { success: false, message: "Please enter a valid media date." };
    }

    const { data: existing, error: recordError } =
      await getMediaRecord(supabase, id);

    if (recordError || !existing) {
      return { success: false, message: "This media record no longer exists." };
    }

    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id")
      .eq("id", projectId)
      .maybeSingle();

    if (projectError || !project) {
      return { success: false, message: "The selected project was not found." };
    }

    // Preserve legacy date labels such as "August 2026" when the row
    // has no actual date value and the date input is left empty.
    const dateLabel =
      mediaDate
        ? makeDateLabel(mediaDate)
        : existing.media_date
          ? null
          : existing.date_label;

    const { error } = await supabase
      .from("project_media")
      .update({
        project_id: projectId,
        title,
        description: description || null,
        media_date: mediaDate || null,
        date_label: dateLabel,
      })
      .eq("id", id);

    if (error) {
      console.error("Media update failed:", error.message);
      return { success: false, message: "Could not save the media changes." };
    }

    refreshMediaPaths([existing.project_id, projectId]);

    return { success: true, message: "Media details updated successfully." };
  } catch (error) {
    console.error("Media update failed:", error);
    return FAILED;
  }
}

export async function replaceProjectMediaFile(
  _previousState: UploadMediaState,
  formData: FormData,
): Promise<UploadMediaState> {
  try {
    const { supabase, message } = await getAdminClient();
    if (!supabase) return { success: false, message: message! };

    const id = readId(formData.get("media_id"));
    const file = formData.get("file");

    if (!id) {
      return { success: false, message: "Invalid media record." };
    }

    if (!(file instanceof File) || file.size === 0) {
      return { success: false, message: "Choose a replacement file." };
    }

    if (file.size > MAX_FILE_SIZE) {
      return { success: false, message: "The file exceeds the 10 MB limit." };
    }

    const mediaType = ALLOWED_TYPES[file.type];
    if (!mediaType) {
      return {
        success: false,
        message: "Use a JPEG, PNG, WebP, MP4, or PDF file.",
      };
    }

    const { data: existing, error: recordError } =
      await getMediaRecord(supabase, id);

    if (recordError || !existing) {
      return { success: false, message: "This media record no longer exists." };
    }

    const newPath =
      `${existing.project_id}/${randomUUID()}-${safeFileName(file.name)}`;

    const { error: uploadError } = await supabase.storage
      .from("project-media")
      .upload(newPath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Replacement upload failed:", uploadError.message);
      return { success: false, message: "The replacement file could not be uploaded." };
    }

    const { data: publicUrlData } = supabase.storage
      .from("project-media")
      .getPublicUrl(newPath);

    const { error: updateError } = await supabase
      .from("project_media")
      .update({
        url: publicUrlData.publicUrl,
        storage_path: newPath,
        media_type: mediaType,
      })
      .eq("id", id);

    if (updateError) {
      console.error("Replacement record update failed:", updateError.message);

      const { error: cleanupError } = await supabase.storage
        .from("project-media")
        .remove([newPath]);

      if (cleanupError) {
        console.error("New file cleanup failed:", cleanupError.message);
      }

      return {
        success: false,
        message: "The replacement uploaded, but the record could not be updated.",
      };
    }

    let cleanupWarning = "";

    if (existing.storage_path && existing.storage_path !== newPath) {
      const { error: oldFileError } = await supabase.storage
        .from("project-media")
        .remove([existing.storage_path]);

      if (oldFileError) {
        console.error("Old media cleanup failed:", oldFileError.message);
        cleanupWarning = " The previous file could not be removed from Storage.";
      }
    }

    refreshMediaPaths([existing.project_id]);

    return {
      success: true,
      message: `Replacement file saved successfully.${cleanupWarning}`,
    };
  } catch (error) {
    console.error("Media replacement failed:", error);
    return FAILED;
  }
}

export async function deleteProjectMedia(
  _previousState: UploadMediaState,
  formData: FormData,
): Promise<UploadMediaState> {
  try {
    const { supabase, message } = await getAdminClient();
    if (!supabase) return { success: false, message: message! };

    const id = readId(formData.get("media_id"));

    if (!id) {
      return { success: false, message: "Invalid media record." };
    }

    const { data: existing, error: recordError } =
      await getMediaRecord(supabase, id);

    if (recordError || !existing) {
      return { success: false, message: "This media record no longer exists." };
    }

    // Delete the database row first so the item immediately disappears
    // from the public page. Storage cleanup is handled afterward.
    const { error: deleteError } = await supabase
      .from("project_media")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Media record deletion failed:", deleteError.message);
      return { success: false, message: "Could not delete this media record." };
    }

    let cleanupWarning = "";

    if (existing.storage_path) {
      const { error: storageError } = await supabase.storage
        .from("project-media")
        .remove([existing.storage_path]);

      if (storageError) {
        console.error("Deleted media file cleanup failed:", storageError.message);
        cleanupWarning = " Its Storage file could not be removed and may need cleanup.";
      }
    }

    refreshMediaPaths([existing.project_id]);

    return {
      success: true,
      message: `Media record deleted.${cleanupWarning}`,
    };
  } catch (error) {
    console.error("Media deletion failed:", error);
    return FAILED;
  }
}
