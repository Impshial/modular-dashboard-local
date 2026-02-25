import type { Note } from "../../lib/db/notes";
import { buttonClassName } from "../../lib/ui/button";

type Props = {
  open: boolean;
  note: Note | null;
  onClose: () => void;
  onEdit: () => void;
};

export default function ViewNoteDialog({ open, note, onClose, onEdit }: Props) {
  if (!open) return null;

  const title = note?.title?.trim() ? note.title : "Untitled";
  const content = note?.content?.trim() ? note.content : "No content";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="View note"
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="Close"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-zinc-200 p-4 dark:border-zinc-800">
          <div className="min-w-0">
            <div className="truncate text-base font-semibold">{title}</div>
            {note && (
              <div className="mt-1 text-xs text-zinc-500">
                Created {new Date(note.created_at).toLocaleString()}
                <span className="mx-2">•</span>
                Updated {new Date(note.updated_at).toLocaleString()}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className={buttonClassName({ variant: "secondary" })}
              onClick={onEdit}
              disabled={!note}
            >
              Edit
            </button>

            <button
              type="button"
              className="rounded-md border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-auto p-4">
          <div className="whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-200">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}