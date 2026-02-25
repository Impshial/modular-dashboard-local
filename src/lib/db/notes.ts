import { supabase } from "../supabase";

export type Note = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export async function listNotes() {
  const { data, error } = await supabase
    .from("notes")
    .select("id,title,content,created_at,updated_at")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Note[];
}

export async function createNote(input: { title: string; content: string }) {
    const { data, error } = await supabase
      .from("notes")
      .insert([{ title: input.title, content: input.content }])
      .select("id,title,content,created_at,updated_at")
      .single();
  
    if (error) throw error;
    return data as Note;
  }

  export async function updateNote(
    id: string,
    patch: { title: string; content: string }
  ): Promise<Note> {
    const { data, error } = await supabase
      .from("notes")
      .update({
        title: patch.title,
        content: patch.content,
        // If your DB doesn't auto-update updated_at, uncomment this:
        // updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("id,title,content,created_at,updated_at")
      .single();
  
    if (error) throw error;
    return data as Note;
  }