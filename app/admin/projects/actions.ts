
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../../lib/supabase/server";

export interface CreateProjectState {
  success: boolean;
  message: string;
}

export async function createProject(
  _previousState: CreateProjectState,
  formData: FormData,
): Promise<CreateProjectState> {
  try {
    const supabase = await createClient();

    // Require an authenticated user.
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

    // Verify the user's administrator role on the server.
    const { data: isAdmin, error: roleError } =
      await supabase.rpc("is_admin");

    if (roleError || isAdmin !== true) {
      return {
        success: false,
        message: "You are not authorized to create projects.",
      };
    }

    const title = String(formData.get("title") ?? "").trim();
    const wardId = Number(formData.get("ward_id"));
    const location = String(formData.get("location") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim();
    const description = String(
      formData.get("description") ?? "",
    ).trim();
    const keyDetail = String(
      formData.get("key_detail") ?? "",
    ).trim();
    const status = String(formData.get("status") ?? "");
    const progressValue = String(
      formData.get("progress") ?? "0",
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
    const source = String(formData.get("source") ?? "").trim();
    const verificationStatus = String(
      formData.get("verification_status") ?? "unverified",
    );
    const lastVerified = String(
      formData.get("last_verified") ?? "",
    ).trim();
    const featured = formData.get("featured") === "on";

    if (!title) {
      return {
        success: false,
        message: "Project title is required.",
      };
    }

    if (!Number.isSafeInteger(wardId) || wardId <= 0) {
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
        message: "Please select a valid project status.",
      };
    }

    if (
      !["verified", "in_progress", "unverified"].includes(
        verificationStatus,
      )
    ) {
      return {
        success: false,
        message: "Please select a valid verification status.",
      };
    }

    if (!/^(0|[1-9]\d*)$/.test(progressValue)) {
      return {
        success: false,
        message: "Progress must be a whole number from 0 to 100.",
      };
    }

    const progress = Number(progressValue);

    if (progress < 0 || progress > 100) {
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

    if (
      status === "pending" &&
      progress !== 0
    ) {
      return {
        success: false,
        message: "Pending projects must have 0% progress.",
      };
    }

    let budgetAmount: number | null = null;

    if (budgetValue !== "") {
      budgetAmount = Number(budgetValue);

      if (
        !Number.isFinite(budgetAmount) ||
        budgetAmount < 0 ||
        !/^\d+(\.\d{1,2})?$/.test(budgetValue)
      ) {
        return {
          success: false,
          message: "Enter a valid non-negative budget amount.",
        };
      }
    }

    const isValidDate = (value: string) =>
      /^\d{4}-\d{2}-\d{2}$/.test(value) &&
      !Number.isNaN(Date.parse(`${value}T00:00:00Z`)) &&
      new Date(`${value}T00:00:00Z`)
        .toISOString()
        .startsWith(value);

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

    const { error: insertError } = await supabase
      .from("projects")
      .insert({
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
      });

    if (insertError) {
      console.error("Project creation failed:", insertError.message);

      return {
        success: false,
        message:
          "The project could not be saved. Please check the information and try again.",
      };
    }

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");

    return {
      success: true,
      message: "Project created successfully.",
    };
  } catch (error) {
    console.error("Unexpected project creation error:", error);

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
