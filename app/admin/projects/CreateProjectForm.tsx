
"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  createProject,
  type CreateProjectState,
} from "./actions";

interface WardOption {
  id: number;
  name: string;
}

const initialState: CreateProjectState = {
  success: false,
  message: "",
};

const inputClass =
  "mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-100";

const labelClass = "block text-sm font-medium text-gray-700";

export default function CreateProjectForm({
  wards,
}: {
  wards: WardOption[];
}) {
  const [state, formAction, isPending] = useActionState(
    createProject,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-8">
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
        <p className="mt-1 text-sm text-gray-500">
          Enter the project details you can currently verify.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Project title *
            <input
              name="title"
              required
              maxLength={200}
              placeholder="e.g. Masii Water Project"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            Ward *
            <select
              name="ward_id"
              required
              defaultValue=""
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
              placeholder="e.g. Water, Roads, Education"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            Location
            <input
              name="location"
              maxLength={200}
              placeholder="Project location"
              className={inputClass}
            />
          </label>

          <label className={`${labelClass} sm:col-span-2`}>
            Description
            <textarea
              name="description"
              rows={4}
              maxLength={5000}
              placeholder="Describe the project and its purpose."
              className={inputClass}
            />
          </label>

          <label className={`${labelClass} sm:col-span-2`}>
            Key detail
            <textarea
              name="key_detail"
              rows={2}
              maxLength={2000}
              placeholder="A key fact or important project detail"
              className={inputClass}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-semibold text-gray-900">
          Status and verification
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Use accurate values and preserve uncertainty where details
          have not been confirmed.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Project status *
            <select
              name="status"
              required
              defaultValue="pending"
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
              defaultValue="unverified"
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
              defaultValue={0}
              required
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            Last verified date
            <input
              name="last_verified"
              type="date"
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
          Leave unknown figures and dates blank rather than guessing.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Budget amount (KSh)
            <input
              name="budget_amount"
              type="number"
              min={0}
              step="0.01"
              placeholder="Leave blank if unknown"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            Budget display (optional)
            <input
              name="budget_display"
              maxLength={100}
              placeholder="e.g. KSh 2,500,000"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            Start date
            <input
              name="start_date"
              type="date"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            Expected completion date
            <input
              name="expected_completion"
              type="date"
              className={inputClass}
            />
          </label>

          <label className={`${labelClass} sm:col-span-2`}>
            Source or reference
            <input
              name="source"
              maxLength={1000}
              placeholder="e.g. Official document or field verification"
              className={inputClass}
            />
          </label>

          <label className="flex items-start gap-3 sm:col-span-2">
            <input
              type="checkbox"
              name="featured"
              className="mt-1 h-4 w-4 rounded border-gray-300 accent-green-700"
            />
            <span>
              <span className="block text-sm font-medium text-gray-700">
                Feature this project
              </span>
              <span className="mt-1 block text-sm text-gray-500">
                Mark this project as featured where supported by the
                public website.
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
          {isPending ? "Saving project..." : "Create project"}
        </button>
      </div>
    </form>
  );
}
