import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const ownerToken = import.meta.env.VITE_OWNER_TOKEN as string;

if (!url) throw new Error("Missing VITE_SUPABASE_URL");
if (!anon) throw new Error("Missing VITE_SUPABASE_ANON_KEY");
if (!ownerToken) throw new Error("Missing VITE_OWNER_TOKEN");

export const supabase = createClient(url, anon, {
  global: {
    headers: {
      "x-owner-token": ownerToken,
    },
  },
});