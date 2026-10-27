
"use client";

import { useActionState } from "react";

import {
  deleteProjectMedia,
  replaceProjectMediaFile,
  updateProjectMedia,
  type UploadMediaState,
} from "./actions";
import type { ProjectMediaRecord } from "../../../lib/supabase/project-media";

interface ProjectOption {
  id: number;
  title: string;
  ward: string;
}

interface Props {
  media: ProjectMediaRecord;
  projects: ProjectOption[];
}

const initialState: UploadMediaState = {
  success: false,
  message: "",
};

const fieldClass =
  "mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100";

const buttonClass =
  "inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60";

function Feedback({ state }: { state: UploadMediaState }) {
  if (!state.message) return null;

  return (
    <p
      role="status"
      aria-live="polite"
      className={`mt-3 rounded-lg px-3 py-2 text-sm ${
        state.success
          ? "bg-green-50 text-green-800"
          : "bg-red-50 text-red-800"
      }`}
    >
      {state.message}
    </p>
  );
}

export default function MediaRecordActions({
  media,
  projects,
}: Props) {
  const [editState, editAction, editPending] = useActionState(
    updateProjectMedia,
    initialState,
  );

  const [replaceState, replaceAction, replacePending] = useActionState(
    replaceProjectMediaFile,
    initialState,
  );

  const [deleteState, deleteAction, deletePending] = useActionState(
    deleteProjectMedia,
    initialState,
  );

  const prefix = `media-${media.id}`;

  return (
    <div className="w-full space-y-3 sm:w-64 sm:shrink-0">
      <details className="rounded-lg border border-gray-200">
        <summary className="cursor-pointer px-3 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50">
          Edit details
        </summary>

        <form action={editAction} className="space-y-4 border-t p-3">
          <input type="hidden" name="media_id" value={media.id} />

          <div>
            <label
              htmlFor={`${prefix}-project`}
              className="text-sm font-medium text-gray-800"
            >
              Project
            </label>
            <select
              id={`${prefix}-project`}
              name="project_id"
              defaultValue={String(media.projectId)}
              required
              className={fieldClass}
            >
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title} — {project.ward || "Ward not assigned"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor={`${prefix}-title`}
              className="text-sm font-medium text-gray-800"
            >
              Title
            </label>
            <input
              id={`${prefix}-title`}
              name="title"
              defaultValue={media.title}
              maxLength={160}
              required
              className={fieldClass}
            />
          </div>

          <div>
            <label
              htmlFor={`${prefix}-description`}
              className="text-sm font-medium text-gray-800"
            >
              Description
            </label>
            <textarea
              id={`${prefix}-description`}
              name="description"
              defaultValue={media.description}
              maxLength={2000}
              rows={3}
              className={fieldClass}
            />
          </div>

          <div>
            <label
              htmlFor={`${prefix}-date`}
              className="text-sm font-medium text-gray-800"
            >
              Media date
            </label>
            <input
              id={`${prefix}-date`}
              name="media_date"
              type="date"
              defaultValue={media.mediaDate ?? ""}
              className={fieldClass}
            />
            <p className="mt-1 text-xs text-gray-500">
              Leave blank if the actual date is unknown.
            </p>
          </div>

          <button
            type="submit"
            disabled={editPending || projects.length === 0}
            className={`${buttonClass} w-full bg-green-800 text-white hover:bg-green-900`}
          >
            {editPending ? "Saving…" : "Save changes"}
          </button>

          <Feedback state={editState} />
        </form>
      </details>

      <details className="rounded-lg border border-gray-200">
        <summary className="cursor-pointer px-3 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50">
          Replace file
        </summary>

        <form action={replaceAction} className="space-y-3 border-t p-3">
          <input type="hidden" name="media_id" value={media.id} />

          <p className="text-xs leading-5 text-gray-600">
            Upload a new file for this record. The title, description and date
            will remain unchanged.
          </p>

          <label
            htmlFor={`${prefix}-file`}
            className="text-sm font-medium text-gray-800"
          >
            Replacement file
          </label>

          <input
            id={`${prefix}-file`}
            name="file"
            type="file"
            accept="image/jpeg,image/png,image/webp,video/mp4,application/pdf"
            required
            className="block w-full text-sm text-gray-700 file:mr-2 file:mb-2 file:rounded-md file:border-0 file:bg-green-50 file:px-3 file:py-2 file:font-semibold file:text-green-800"
          />

          <p className="text-xs text-gray-500">
            JPEG, PNG, WebP, MP4 or PDF. Maximum 10 MB.
          </p>

          <button
            type="submit"
            disabled={replacePending}
            className={`${buttonClass} w-full bg-green-800 text-white hover:bg-green-900`}
          >
            {replacePending ? "Replacing…" : "Replace file"}
          </button>

          <Feedback state={replaceState} />
        </form>
      </details>

      <details className="rounded-lg border border-red-200">
        <summary className="cursor-pointer px-3 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50">
          Delete media
        </summary>

        <form
          action={deleteAction}
          onSubmit={(event) => {
            if (
              !window.confirm(
                `Permanently delete "${media.title}"? This removes its media record from the public site.`,
              )
            ) {
              event.preventDefault();
            }
          }}
          className="space-y-3 border-t border-red-100 p-3"
        >
          <input type="hidden" name="media_id" value={media.id} />

          <p className="text-xs leading-5 text-gray-600">
            This action cannot be undone. If a stored file exists, it will
            also be removed when Storage cleanup succeeds.
          </p>

          <button
            type="submit"
            disabled={deletePending}
            className={`${buttonClass} w-full bg-red-700 text-white hover:bg-red-800`}
          >
            {deletePending ? "Deleting…" : "Confirm deletion"}
          </button>

          <Feedback state={deleteState} />
        </form>
      </details>
    </div>
  );
}
