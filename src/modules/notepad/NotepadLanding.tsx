import { useEffect, useState } from "react";
import type { Note } from "../../lib/db/notes";
import { listNotes } from "../../lib/db/notes";
import CreateNoteDialog from "./CreateNoteDialog";
import ViewNoteDialog from "./ViewNoteDialog";
import EditNoteDialog from "./EditNoteDialog";
import { buttonClassName } from "../../lib/ui/button";

export default function NotepadLanding() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [createOpen, setCreateOpen] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const refresh = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const rows = await listNotes();
      setNotes(rows);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load notes";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const openView = (note: Note) => {
    setSelectedNote(note);
    setViewOpen(true);
  };

  const closeView = () => {
    setViewOpen(false);
    setSelectedNote(null);
  };

  

  const openEdit = () => {
    if (!selectedNote) return;
    setReturnToViewOnEditClose(true);
    setViewOpen(false);
    setEditOpen(true);
  };
  
  const closeEdit = () => {
    setEditOpen(false);
    if (returnToViewOnEditClose) {
      setViewOpen(true);
      setReturnToViewOnEditClose(false);
    }
  };
  
  const handleSaved = (updated: Note) => {
    setSelectedNote(updated); // this is the key part
    setEditOpen(false);
    setViewOpen(true);        // go back to view with updated content
    setReturnToViewOnEditClose(false);
  };

  const [returnToViewOnEditClose, setReturnToViewOnEditClose] = useState(false);

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Notepad</h1>
        <button
          type="button"
          className={buttonClassName({ variant: "secondary" })}
          onClick={() => setCreateOpen(true)}
        >
          Create Note
        </button>
      </div>

      {loading && <div className="text-sm text-zinc-500">Loading notes...</div>}

      {errorMsg && (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm">
          {errorMsg}
        </div>
      )}

      {!loading && !errorMsg && notes.length === 0 && (
        <div className="text-sm text-zinc-500">No notes yet.</div>
      )}

      {!loading && !errorMsg && notes.length > 0 && (
        <div className="grid content-start items-start grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
          {notes.map((n) => (
            <button
            key={n.id}
            type="button"
            onClick={() => openView(n)}
            className="cursor-pointer text-left flex flex-col h-[220px] rounded-lg border border-zinc-800 text-zinc-800 shadow-sm hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-zinc-400/40"
          >
            {/* Title */}
            <div className="px-4 py-3">
              <div className="truncate text-sm font-semibold text-zinc-800 dark:text-zinc-50">
                {n.title?.trim() ? n.title : "Untitled"}
              </div>
            </div>
          
            {/* Divider */}
            <div className="h-px bg-zinc-700/70" />
          
            {/* Body fills remaining space */}
            <div className="flex flex-1 flex-col px-4 py-3 min-h-0">
              {/* Content */}
              <div className="line-clamp-5 text-sm leading-5 text-zinc-800 dark:text-zinc-50">
                {n.content?.trim() ? n.content : "No content"}
              </div>
          
              {/* Footer — forced to bottom */}
              <div className="mt-auto pt-3 text-xs text-zinc-400">
                Updated {new Date(n.updated_at).toLocaleString()}
              </div>
            </div>
          </button>
          ))}
        </div>
      )}

        <CreateNoteDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={refresh}
        />

        <ViewNoteDialog
        open={viewOpen}
        note={selectedNote}
        onClose={closeView}
        onEdit={openEdit}
        />

        <EditNoteDialog
        open={editOpen}
        note={selectedNote}
        onClose={closeEdit}
        onUpdated={refresh}
        onSaved={handleSaved}
        />
    </div>
  );
}