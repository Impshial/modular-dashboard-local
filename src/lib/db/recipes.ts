import { supabase } from "../supabase";

export type Recipe = {
  id: string;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  created_at: string;
  updated_at: string;
};

export async function listRecipes() {
  const { data, error } = await supabase
    .from("recipes")
    .select("id,title,description,ingredients,instructions,created_at,updated_at")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Recipe[];
}

export async function createRecipe(input: {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
}) {
  const { data, error } = await supabase
    .from("recipes")
    .insert([
      {
        title: input.title,
        description: input.description,
        ingredients: input.ingredients,
        instructions: input.instructions,
      },
    ])
    .select("id,title,description,ingredients,instructions,created_at,updated_at")
    .single();

  if (error) throw error;
  return data as Recipe;
}

export async function updateRecipe(
  id: string,
  patch: { title: string; description: string; ingredients: string; instructions: string }
) {
  const { data, error } = await supabase
    .from("recipes")
    .update(patch)
    .eq("id", id)
    .select("id,title,description,ingredients,instructions,created_at,updated_at")
    .single();

  if (error) throw error;
  return data as Recipe;
}

export async function deleteRecipe(id: string) {
  const { error } = await supabase.from("recipes").delete().eq("id", id);
  if (error) throw error;
}