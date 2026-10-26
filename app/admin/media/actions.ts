
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

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().startsWith(value)
  );
}

export async function uploadProjectMedia(
  _previousState: UploadMediaState,
  formData: FormData,
): Promise<UploadMediaState> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        message: "Your session has expired. Please sign in again.",
      };
    }

    const { data: isAdmin, error: roleError } =
      await supabase.rpc("is_admin");

    if (roleError || isAdmin !== true) {
      return {
        success: false,
        message: "You are not authorized to upload project media.",
      };
    }

    const projectIdValue = String(
      formData.get("project_id") ?? "",
    );

    const projectId = Number(projectIdValue);
    const title = String(formData.get("title") ?? "").trim();
    const description = String(
      formData.get("description") ?? "",
    ).trim();
    const mediaDate = String(
      formData.get("media_date") ?? "",
    ).trim();

    const file = formData.get("file");

    if (
      !/^[1-9]\d*$/.test(projectIdValue) ||
      !Number.isSafeInteger(projectId)
    ) {
      return {
        success: false,
        message: "Please select a valid project.",
      };
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
      return {
        success: false,
        message: "Please enter a valid media date.",
      };
    }

    if (!(file instanceof File) || file.size === 0) {
      return {
        success: false,
        message: "Please choose a file to upload.",
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        message: "The file exceeds the 10 MB upload limit.",
      };
    }

    const mediaType = ALLOWED_TYPES[file.type];

    if (!mediaType) {
      return {
        success: false,
        message: "Use a JPEG, PNG, WebP, MP4, or PDF file.",
      };
    }

    // Confirm that the selected project exists.
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

    const safeFileName = file.name
      .normalize("NFKD")
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .replace(/-+/g, "-")
      .slice(-120);

    const storagePath =
      `${projectId}/${randomUUID()}-${safeFileName || "media"}`;

    const { error: uploadError } = await supabase.storage
      .from("project-media")
      .upload(storagePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Project media upload failed:", uploadError.message);

      return {
        success: false,
        message:
          "The file could not be uploaded. Check the Storage policies and try again.",
      };
    }

    const { data: publicUrlData } = supabase.storage
      .from("project-media")
      .getPublicUrl(storagePath);

    const dateLabel = mediaDate
      ? new Intl.DateTimeFormat("en-GB", {
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        }).format(new Date(`${mediaDate}T00:00:00Z`))
      : null;

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
        date_label: dateLabel,
      });

    if (insertError) {
      console.error("Project media record creation failed:", insertError.message);

      // Avoid leaving an orphaned file if its database record failed.
      const { error: cleanupError } = await supabase.storage
        .from("project-media")
        .remove([storagePath]);

      if (cleanupError) {
        console.error(
          "Could not clean up an unlinked media file:",
          cleanupError.message,
        );
      }

      return {
        success: false,
        message:
          "The file uploaded, but its record could not be saved. Please try again.",
      };
    }

    revalidatePath("/");
    revalidatePath(`/projects/${projectId}`);
    revalidatePath("/admin");
    revalidatePath("/admin/media");

    return {
      success: true,
      message: "Project media uploaded successfully.",
    };
  } catch (error) {
    console.error("Unexpected project media error:", error);

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
