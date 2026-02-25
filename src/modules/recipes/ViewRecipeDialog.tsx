import type { Recipe } from "../../lib/db/recipes";
import { deleteRecipe } from "../../lib/db/recipes";
import { buttonClassName } from "../../lib/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipe: Recipe | null;
  onEdit: () => void;
  onDeleted: () => void; // refresh
};

export default function ViewRecipeDialog({
  open,
  onOpenChange,
  recipe,
  onEdit,
  onDeleted,
}: Props) {
  const close = () => onOpenChange(false);

  const handleDelete = async () => {
    if (!recipe) return;
    const ok = confirm("Delete this recipe? This cannot be undone.");
    if (!ok) return;

    try {
      await deleteRecipe(recipe.id);
      close();
      onDeleted();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete recipe");
    }
  };

  if (!open || !recipe) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="flex max-h-[85vh] w-full max-w-3xl flex-col rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-start justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">
              {recipe.title?.trim() ? recipe.title : "Untitled"}
            </div>
            <div className="mt-1 text-xs text-zinc-500">
              Updated {new Date(recipe.updated_at).toLocaleString()}
            </div>
          </div>

          <div className="flex items-center gap-2">
          <button
              type="button"
              className="rounded-md border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
              onClick={close}
            >
              Close
            </button>
            
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 overflow-hidden p-4">
          {recipe.description?.trim() && (
            <section>
              <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                Description
              </div>
              <div className="whitespace-pre-wrap text-sm text-zinc-800 dark:text-zinc-200">
                {recipe.description}
              </div>
            </section>
          )}
            <section className="flex min-h-0 flex-col">
            <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                Ingredients
            </div>

            <div className="flex-1 overflow-y-auto rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm whitespace-pre-wrap dark:border-zinc-800 dark:bg-zinc-900">
                {recipe.ingredients?.trim() ? recipe.ingredients : "None"}
            </div>
            </section>

            <section className="flex min-h-0 flex-col">
                <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                    Instructions
                </div>

                <div className="flex-1 overflow-y-auto rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm whitespace-pre-wrap dark:border-zinc-800 dark:bg-zinc-900">
                    {recipe.instructions?.trim() ? recipe.instructions : "None"}
                </div>
                </section>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <button
            type="button"
            className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-600 hover:bg-red-500/15 dark:text-red-400"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
              type="button"
              className={buttonClassName({ variant: "secondary" })}
              onClick={onEdit}
            >
              Edit
            </button>
          
        </div>
      </div>
    </div>
  );
}