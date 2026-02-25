import { useEffect, useState } from "react";
import type { Recipe } from "../../lib/db/recipes";
import { updateRecipe } from "../../lib/db/recipes";
import { buttonClassName } from "../../lib/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipe: Recipe | null;
  onSaved: () => void; // refresh
};

export default function EditRecipeDialog({ open, onOpenChange, recipe, onSaved }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (open && recipe) {
      setTitle(recipe.title ?? "");
      setDescription(recipe.description ?? "");
      setIngredients(recipe.ingredients ?? "");
      setInstructions(recipe.instructions ?? "");
      setErrorMsg(null);
      setSaving(false);
    }
  }, [open, recipe]);

  const close = () => onOpenChange(false);

  const submit = async () => {
    if (!recipe) return;

    try {
      setSaving(true);
      setErrorMsg(null);
      await updateRecipe(recipe.id, {
        title,
        description,
        ingredients,
        instructions,
      });
      close();
      onSaved();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to save recipe");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="w-full max-w-2xl rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="text-sm font-semibold">Edit Recipe</div>
          <div className="mt-1 text-xs text-zinc-500">
            {recipe?.title?.trim() ? recipe.title : "Untitled"}
          </div>
        </div>

        <div className="space-y-3 p-4">
          {errorMsg && (
            <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm">
              {errorMsg}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs text-zinc-500">Title</label>
            <input
              className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400/40 dark:border-zinc-800 dark:bg-zinc-950"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500">Description</label>
            <textarea
              className="min-h-[72px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400/40 dark:border-zinc-800 dark:bg-zinc-950"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500">Ingredients</label>
            <textarea
              className="min-h-[120px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400/40 dark:border-zinc-800 dark:bg-zinc-950"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500">Instructions</label>
            <textarea
              className="min-h-[160px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400/40 dark:border-zinc-800 dark:bg-zinc-950"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <button
            type="button"
            className="rounded-md border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
            onClick={close}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="button"
            className={buttonClassName({ variant: "secondary" })}
            onClick={submit}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}