
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../../lib/supabase/server";

export interface UpdateProjectState {
  success: boolean;
  message: string;
}

export async function updateProject(
  _previousState: UpdateProjectState,
  formData: FormData,
): Promise<UpdateProjectState> {
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
        message: "You are not authorized to update projects.",
      };
    }

    const projectIdValue = String(
      formData.get("project_id") ?? "",
    );

    if (!/^[1-9]\d*$/.test(projectIdValue)) {
      return {
        success: false,
        message: "Invalid project ID.",
      };
    }

    const projectId = Number(projectIdValue);

    if (!Number.isSafeInteger(projectId)) {
      return {
        success: false,
        message: "Invalid project ID.",
      };
    }

    const title = String(formData.get("title") ?? "").trim();
    const wardIdValue = String(formData.get("ward_id") ?? "");
    const location = String(formData.get("location") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim();
    const description = String(
      formData.get("description") ?? "",
    ).trim();
    const keyDetail = String(
      formData.get("key_detail") ?? "",
    ).trim();
    const status = String(formData.get("status") ?? "");
    const progressValue = String(formData.get("progress") ?? "");
    const verificationStatus = String(
      formData.get("verification_status") ?? "",
    );
    const budgetValue = String(
      formData.get("budget_amount") ?? "",
    ).trim();
    const budgetDisplay = String(
      formData.get("budget_display") ?? "",
    ).trim();
    const startDate = String(
      formData.get("start_date") ?? "",
    ).trim();
    const expectedCompletion = String(
      formData.get("expected_completion") ?? "",
    ).trim();
    const lastVerified = String(
      formData.get("last_verified") ?? "",
    ).trim();
    const source = String(formData.get("source") ?? "").trim();
    const featured = formData.get("featured") === "on";

    if (!title || title.length > 200) {
      return {
        success: false,
        message: "Enter a project title of 1–200 characters.",
      };
    }

    if (!/^[1-9]\d*$/.test(wardIdValue)) {
      return {
        success: false,
        message: "Please select a valid ward.",
      };
    }

    const wardId = Number(wardIdValue);

    if (!Number.isSafeInteger(wardId)) {
      return {
        success: false,
        message: "Please select a valid ward.",
      };
    }

    if (
      !["ongoing", "completed", "pending"].includes(status)
    ) {
      return {
        success: false,
        message: "Invalid project status.",
      };
    }

    if (
      !["verified", "in_progress", "unverified"].includes(
        verificationStatus,
      )
    ) {
      return {
        success: false,
        message: "Invalid verification status.",
      };
    }

    if (!/^(0|[1-9]\d*)$/.test(progressValue)) {
      return {
        success: false,
        message: "Progress must be a whole number from 0 to 100.",
      };
    }

    const progress = Number(progressValue);

    if (progress > 100) {
      return {
        success: false,
        message: "Progress must be between 0 and 100.",
      };
    }

    if (status === "completed" && progress !== 100) {
      return {
        success: false,
        message: "Completed projects must have 100% progress.",
      };
    }

    if (status === "pending" && progress !== 0) {
      return {
        success: false,
        message: "Pending projects must have 0% progress.",
      };
    }

    let budgetAmount: number | null = null;

    if (budgetValue !== "") {
      if (!/^\d+(\.\d{1,2})?$/.test(budgetValue)) {
        return {
          success: false,
          message: "Enter a valid budget amount.",
        };
      }

      budgetAmount = Number(budgetValue);

      if (
        !Number.isFinite(budgetAmount) ||
        budgetAmount < 0
      ) {
        return {
          success: false,
          message: "Budget cannot be negative.",
        };
      }
    }

    const isValidDate = (value: string) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
      }

      const date = new Date(`${value}T00:00:00Z`);

      return (
        !Number.isNaN(date.getTime()) &&
        date.toISOString().startsWith(value)
      );
    };

    for (const [label, value] of [
      ["Start date", startDate],
      ["Expected completion date", expectedCompletion],
      ["Last verified date", lastVerified],
    ]) {
      if (value && !isValidDate(value)) {
        return {
          success: false,
          message: `${label} is invalid.`,
        };
      }
    }

    if (
      startDate &&
      expectedCompletion &&
      expectedCompletion < startDate
    ) {
      return {
        success: false,
        message:
          "Expected completion cannot be earlier than the start date.",
      };
    }

    // Confirm the selected ward exists.
    const { data: ward, error: wardError } = await supabase
      .from("wards")
      .select("id")
      .eq("id", wardId)
      .maybeSingle();

    if (wardError || !ward) {
      return {
        success: false,
        message: "The selected ward could not be found.",
      };
    }

    // Update only editable fields. Existing display-label fields
    // are deliberately left untouched.
    const { data: updatedProject, error: updateError } =
      await supabase
        .from("projects")
        .update({
          ward_id: wardId,
          title,
          location: location || null,
          category: category || null,
          description: description || null,
          key_detail: keyDetail || null,
          status,
          progress,
          budget_amount: budgetAmount,
          budget_display: budgetDisplay || null,
          start_date: startDate || null,
          expected_completion: expectedCompletion || null,
          source: source || null,
          verification_status: verificationStatus,
          last_verified: lastVerified || null,
          featured,
        })
        .eq("id", projectId)
        .select("id")
        .maybeSingle();

    if (updateError) {
      console.error("Project update failed:", updateError.message);

      return {
        success: false,
        message:
          "The project could not be updated. Please check your information and try again.",
      };
    }

    if (!updatedProject) {
      return {
        success: false,
        message:
          "No project was updated. It may not exist or you may not have permission.",
      };
    }

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${projectId}/edit`);

    return {
      success: true,
      message: "Project updated successfully.",
    };
  } catch (error) {
    console.error("Unexpected project update error:", error);

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
