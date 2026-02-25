import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import type { Recipe } from "../../lib/db/recipes";
import { listRecipes } from "../../lib/db/recipes";
import CreateRecipeDialog from "./CreateRecipeDialog";
import ViewRecipeDialog from "./ViewRecipeDialog";
import EditRecipeDialog from "./EditRecipeDialog";

export type RecipesLandingHandle = {
  openCreate: () => void;
};

const RecipesLanding = forwardRef<RecipesLandingHandle>(function RecipesLanding(_props, ref) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [createOpen, setCreateOpen] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewRecipe, setViewRecipe] = useState<Recipe | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editRecipe, setEditRecipe] = useState<Recipe | null>(null);

  useImperativeHandle(ref, () => ({
    openCreate: () => setCreateOpen(true),
  }));

  const refresh = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const rows = await listRecipes();
      setRecipes(rows);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load recipes";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const openView = (r: Recipe) => {
    setViewRecipe(r);
    setViewOpen(true);
  };

  const openEditFromView = () => {
    if (!viewRecipe) return;
    setEditRecipe(viewRecipe);
    setEditOpen(true);
    setViewOpen(false);
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Recipes</h1>
      </div>

      {loading && <div className="text-sm text-zinc-500">Loading recipes...</div>}

      {errorMsg && (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm">
          {errorMsg}
        </div>
      )}

      {!loading && !errorMsg && recipes.length === 0 && (
        <div className="text-sm text-zinc-500">No recipes yet.</div>
      )}

      {!loading && !errorMsg && recipes.length > 0 && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
          {recipes.map((r) => (
            <button
              key={r.id}
              type="button"
              className="cursor-pointer text-left flex flex-col h-[220px] rounded-lg border border-zinc-800 text-zinc-800 shadow-sm hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-zinc-400/40"
              onClick={() => openView(r)}
            >
              {/* Title */}
              <div className="px-4 py-3">
                <div className="truncate text-sm font-semibold text-zinc-800 dark:text-zinc-50">
                  {r.title?.trim() ? r.title : "Untitled"}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-zinc-700/70" />

              {/* Body fills remaining space */}
              <div className="flex flex-1 flex-col px-4 py-3 min-h-0">
                {/* Content */}
                <div className="line-clamp-5 text-sm leading-5 text-zinc-800 dark:text-zinc-50">
                  {r.description?.trim() ? r.description : "No description"}
                    
                </div>

                <div className="mt-auto pt-3 text-xs text-zinc-500">
                  Updated {new Date(r.updated_at).toLocaleString()}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <CreateRecipeDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={refresh}
      />

      <ViewRecipeDialog
        open={viewOpen}
        onOpenChange={setViewOpen}
        recipe={viewRecipe}
        onEdit={openEditFromView}
        onDeleted={refresh}
      />

      <EditRecipeDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        recipe={editRecipe}
        onSaved={refresh}
      />
    </div>
  );
});
export default RecipesLanding;