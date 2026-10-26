
"use client";

import { useActionState } from "react";

import {
  uploadProjectMedia,
  type UploadMediaState,
} from "./actions";

interface ProjectOption {
  id: number;
  title: string;
  ward: string;
}

const initialState: UploadMediaState = {
  success: false,
  message: "",
};

const fieldClass =
  "mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100";

export default function UploadMediaForm({
  projects,
}: {
  projects: ProjectOption[];
}) {
  const [state, formAction, pending] = useActionState(
    uploadProjectMedia,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label
          htmlFor="project_id"
          className="text-sm font-semibold text-gray-800"
        >
          Project *
        </label>

        <select
          id="project_id"
          name="project_id"
          required
          defaultValue=""
          className={fieldClass}
        >
          <option value="" disabled>
            Select a project
          </option>

          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title} — {project.ward || "Ward not assigned"}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="title"
          className="text-sm font-semibold text-gray-800"
        >
          Media title *
        </label>

        <input
          id="title"
          name="title"
          type="text"
          maxLength={160}
          required
          placeholder="e.g. Masii Water Project site visit"
          className={fieldClass}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="text-sm font-semibold text-gray-800"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows={4}
          maxLength={2000}
          placeholder="Describe what this media documents."
          className={fieldClass}
        />
      </div>

      <div>
        <label
          htmlFor="media_date"
          className="text-sm font-semibold text-gray-800"
        >
          Media date
        </label>

        <input
          id="media_date"
          name="media_date"
          type="date"
          className={fieldClass}
        />

        <p className="mt-1 text-xs text-gray-500">
          Optional. Use the actual date the material was recorded,
          where known.
        </p>
      </div>

      <div>
        <label
          htmlFor="file"
          className="text-sm font-semibold text-gray-800"
        >
          File *
        </label>

        <input
          id="file"
          name="file"
          type="file"
          accept="image/jpeg,image/png,image/webp,video/mp4,application/pdf"
          required
          className={`${fieldClass} file:mr-3 file:rounded-md file:border-0 file:bg-green-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-green-800`}
        />

        <p className="mt-1 text-xs text-gray-500">
          JPEG, PNG, WebP, MP4, or PDF. Maximum size: 10 MB.
        </p>
      </div>

      {state.message && (
        <p
          role="status"
          aria-live="polite"
          className={`rounded-lg px-4 py-3 text-sm ${
            state.success
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || projects.length === 0}
        className="inline-flex items-center justify-center rounded-lg bg-green-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Uploading…" : "Upload project media"}
      </button>
    </form>
  );
}
