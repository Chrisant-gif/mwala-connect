
"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  updateProject,
  type UpdateProjectState,
} from "./update-actions";

interface WardOption {
  id: number;
  name: string;
}

interface EditableProject {
  id: number;
  wardId: number | null;
  title: string;
  location: string;
  category: string;
  description: string;
  keyDetail: string;
  status: string;
  progress: number;
  budgetAmount: number | string | null;
  budgetDisplay: string;
  startDate: string;
  expectedCompletion: string;
  source: string;
  verificationStatus: string;
  lastVerified: string;
  featured: boolean;
}

const initialState: UpdateProjectState = {
  success: false,
  message: "",
};

const inputClass =
  "mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-100";

const labelClass = "block text-sm font-medium text-gray-700";

function dateInputValue(value: string): string {
  if (!value || value === "To be confirmed" || value === "To be verified") {
    return "";
  }

  const match = value.match(/^\d{4}-\d{2}-\d{2}/);
  return match?.[0] ?? "";
}

export default function EditProjectForm({
  project,
  wards,
}: {
  project: EditableProject;
  wards: WardOption[];
}) {
  const [state, formAction, isPending] = useActionState(
    updateProject,
    initialState,
  );

  const numericBudget =
    project.budgetAmount === null || project.budgetAmount === ""
      ? ""
      : String(project.budgetAmount);

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="project_id" value={project.id} />

      {state.message && (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-lg border p-4 text-sm ${
            state.success
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {state.message}

          {state.success && (
            <div className="mt-3">
              <Link
                href="/admin/projects"
                className="font-semibold underline"
              >
                Return to projects
              </Link>
            </div>
          )}
        </div>
      )}

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-semibold text-gray-900">
          Basic information
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Project title *
            <input
              name="title"
              required
              maxLength={200}
              defaultValue={project.title}
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            Ward *
            <select
              name="ward_id"
              required
              defaultValue={project.wardId?.toString() ?? ""}
              className={inputClass}
            >
              <option value="" disabled>
                Select a ward
              </option>

              {wards.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.name}
                </option>
              ))}
            </select>
          </label>

          <label className={labelClass}>
            Category
            <input
              name="category"
              maxLength={100}
              defaultValue={project.category}
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            Location
            <input
              name="location"
              maxLength={200}
              defaultValue={project.location}
              className={inputClass}
            />
          </label>

          <label className={`${labelClass} sm:col-span-2`}>
            Description
            <textarea
              name="description"
              rows={4}
              maxLength={5000}
              defaultValue={project.description}
              className={inputClass}
            />
          </label>

          <label className={`${labelClass} sm:col-span-2`}>
            Key detail
            <textarea
              name="key_detail"
              rows={2}
              maxLength={2000}
              defaultValue={project.keyDetail}
              className={inputClass}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-semibold text-gray-900">
          Status and verification
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Project status *
            <select
              name="status"
              required
              defaultValue={project.status}
              className={inputClass}
            >
              <option value="pending">Pending</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </label>

          <label className={labelClass}>
            Verification status *
            <select
              name="verification_status"
              required
              defaultValue={project.verificationStatus}
              className={inputClass}
            >
              <option value="unverified">Unverified</option>
              <option value="in_progress">Verification in progress</option>
              <option value="verified">Verified</option>
            </select>
          </label>

          <label className={labelClass}>
            Progress (%)
            <input
              name="progress"
              type="number"
              min={0}
              max={100}
              step={1}
              required
              defaultValue={project.progress}
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            Last verified date
            <input
              name="last_verified"
              type="date"
              defaultValue={dateInputValue(project.lastVerified)}
              className={inputClass}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-semibold text-gray-900">
          Budget and timeline
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          If you change a budget or date, make sure the new value is verified.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Budget amount (KSh)
            <input
              name="budget_amount"
              type="number"
              min={0}
              step="0.01"
              defaultValue={numericBudget}
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            Budget display (optional)
            <input
              name="budget_display"
              maxLength={100}
              defaultValue={project.budgetDisplay}
              placeholder="e.g. KSh 2,500,000"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            Start date
            <input
              name="start_date"
              type="date"
              defaultValue={dateInputValue(project.startDate)}
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            Expected completion date
            <input
              name="expected_completion"
              type="date"
              defaultValue={dateInputValue(project.expectedCompletion)}
              className={inputClass}
            />
          </label>

          <label className={`${labelClass} sm:col-span-2`}>
            Source or reference
            <input
              name="source"
              maxLength={1000}
              defaultValue={project.source}
              className={inputClass}
            />
          </label>

          <label className="flex items-start gap-3 sm:col-span-2">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={project.featured}
              className="mt-1 h-4 w-4 rounded border-gray-300 accent-green-700"
            />

            <span>
              <span className="block text-sm font-medium text-gray-700">
                Feature this project
              </span>
              <span className="mt-1 block text-sm text-gray-500">
                Mark this project as featured where supported by the public website.
              </span>
            </span>
          </label>
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/admin/projects"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={isPending || wards.length === 0}
          className="inline-flex items-center justify-center rounded-lg bg-green-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving changes..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
