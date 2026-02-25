import { useEffect, useMemo, useState } from "react";
import { createNote } from "../../lib/db/notes";
import { buttonClassName } from "../../lib/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void; // refresh list
};

export default function CreateNoteDialog({ open, onClose, onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isDirty = useMemo(() => title.trim() !== "" || content.trim() !== "", [title, content]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") attemptClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isDirty, title, content]);

  useEffect(() => {
    if (!open) return;
    // reset when opened
    setTitle("");
    setContent("");
    setSaving(false);
    setErrorMsg(null);
  }, [open]);

  const attemptClose = () => {
    if (saving) return;
    if (isDirty) {
      const ok = window.confirm("Discard this note?");
      if (!ok) return;
    }
    onClose();
  };

  const handleSave = async () => {
    if (saving) return;

    try {
      setSaving(true);
      setErrorMsg(null);

      await createNote({
        title: title.trim(),
        content: content.trim(),
      });

      onCreated();
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create note";
      setErrorMsg(message);
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/50"
        onClick={attemptClose}
      />

      {/* Dialog */}
      <div className="absolute left-1/2 top-1/2 w-[min(720px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2">
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          {/* Header (fixed) */}
          <div className="flex h-12 items-center justify-between px-4 dark:border-zinc-800">
            <div className="text-sm font-semibold">Create Note</div>
            <button
              type="button"
              className="rounded-md px-2 py-1 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
              onClick={attemptClose}
            >
              Close
            </button>
          </div>

          {/* Body (scrollable) */}
          <div className="max-h-[70vh] overflow-auto p-4">
            {errorMsg && (
              <div className="mb-3 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm">
                {errorMsg}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-zinc-500">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Untitled"
                  className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400/30 dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-zinc-500">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your note..."
                  rows={10}
                  className="w-full resize-y rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400/30 dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>
            </div>
          </div>

          {/* Footer (fixed) */}
          <div className="flex h-12 items-center justify-end gap-2 px-4 dark:border-zinc-800">
            <button
              type="button"
              className="rounded-md border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
              onClick={attemptClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
            
              type="button"
              className={buttonClassName({ variant: "secondary" })}
              //className="rounded-md border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-100 disabled:opacity-60 dark:border-zinc-800 dark:hover:bg-zinc-900"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}