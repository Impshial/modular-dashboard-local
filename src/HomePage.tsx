import { useState } from "react";
import RecipesLanding from "./modules/recipes/RecipesLanding";
import NotepadLanding from "./modules/notepad/NotepadLanding";

import {
  House,
  Globe,
  TreeStructure,
  Sparkle,
  Sword,
  GameController,
  FilmSlate,
  DiceSix,
  Wrench,
  Calendar,
  Notepad,
  CookingPot,
  CaretDown,
  CaretRight,
} from "@phosphor-icons/react";

type Theme = "light" | "dark";

type HomePageProps = {
  theme: Theme;
  toggleTheme: () => void;
};

const navItem = (active: boolean) =>
  `flex items-center gap-2 rounded-md px-2 py-1 ${
    active ? "bg-zinc-100 dark:bg-zinc-900" : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
  }`;

export default function HomePage({ theme, toggleTheme }: HomePageProps) {
  const [openGroups, setOpenGroups] = useState({
    world: true,
    entertainment: true,
    utilities: true,
  });

  const toggleGroup = (group: keyof typeof openGroups) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  type ViewKey = "home" | "notepad" | "recipes";

  const [view, setView] = useState<ViewKey>("home");

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Fixed Header */}
      <header className="fixed left-0 top-0 z-50 h-12 w-full border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex h-full items-center justify-between px-4">
          <div className="text-md font-semibold tracking-wide">Modular Dashboard</div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-200 px-3 text-sm hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === "dark" ? "Dark" : "Light"}
            </button>

            {/* User Menu Icon */}
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
              aria-label="User menu"
              title="User menu"
            >
              <span className="h-4 w-4 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-12 z-40 h-[calc(100vh-3rem)] w-52 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <nav className="flex h-full flex-col p-2 text-sm">
          {/* Home */}
          <button
            className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            onClick={() => setView("home")}
          >
            <House size={18} />
            Home
          </button>

          {/* Separator */}
          <div className="my-2 border-t border-zinc-200 dark:border-zinc-800" />

          {/* World Building Group */}
          <button
            onClick={() => toggleGroup("world")}
            className="mt-3 flex items-center justify-between rounded-md px-3 py-2 text-xs uppercase tracking-wide text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            <div className="flex items-center gap-2">
              <Globe size={18} />
              World Building
            </div>
            {openGroups.world ? <CaretDown size={16} /> : <CaretRight size={16} />}
          </button>

          {openGroups.world && (
            <div className="ml-6 mt-1 flex flex-col gap-1">
              <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-900">
                <TreeStructure size={16} />
                Builder
              </button>
              <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-900">
                <Sparkle size={16} />
                Generator
              </button>
              <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-900">
                <Sword size={16} />
                RPG
              </button>
            </div>
          )}

          {/* Entertainment Group */}
          <button
            onClick={() => toggleGroup("entertainment")}
            className="mt-3 flex items-center justify-between rounded-md px-3 py-2 text-xs uppercase tracking-wide text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            <div className="flex items-center gap-2">
              <GameController size={18} />
              Entertainment
            </div>
            {openGroups.entertainment ? <CaretDown size={16} /> : <CaretRight size={16} />}
          </button>

          {openGroups.entertainment && (
            <div className="ml-6 mt-1 flex flex-col gap-1">
              <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-900">
                <FilmSlate size={16} />
                Movie Tracker
              </button>
              <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-900">
                <DiceSix size={16} />
                Episode Roulette
              </button>
            </div>
          )}

          {/* Utilities Group */}
          <button
            onClick={() => toggleGroup("utilities")}
            className="mt-3 flex items-center justify-between rounded-md px-3 py-2 text-xs uppercase tracking-wide text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            <div className="flex items-center gap-2">
              <Wrench size={18} />
              Utilities
            </div>
            {openGroups.utilities ? <CaretDown size={16} /> : <CaretRight size={16} />}
          </button>

          {openGroups.utilities && (
            <div className="ml-6 mt-1 flex flex-col gap-1">
              <button  className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-900">
                <Calendar size={16} />
                Calendar
              </button>
              <button 
                
                type="button" 
                onClick={() => setView("notepad")} 
                className={navItem(view === "notepad")}
              >
                <Notepad size={16} />
                Notepad
              </button>
              <button 
                type="button" 
                onClick={() => setView("recipes")} 
                className={navItem(view === "recipes")}
              >
                <CookingPot size={16} />
                Recipes
              </button>
            </div>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pt-12">
        <div className="ml-52 min-h-[calc(100vh-3rem)] p-4">
          {view === "home" && <div className="p-4 text-sm text-zinc-500">Home (empty)</div>}
          {view === "notepad" && <NotepadLanding />}
          {view === "recipes" && <RecipesLanding />}
        </div>
      </main>
    </div>
  );
}