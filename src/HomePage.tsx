import { useRef, useState } from "react";
import { ArrowsLeftRightIcon } from "@phosphor-icons/react";
import type { NotepadLandingHandle } from "./modules/notepad/NotepadLanding";
import type { RecipesLandingHandle } from "./modules/recipes/RecipesLanding";
import BuilderLanding from "./modules/builder/BuilderLanding";
import GeneratorLanding from "./modules/generator/GeneratorLanding";
import RpgLanding from "./modules/rpg/RpgLanding";
import MovieTrackerLanding from "./modules/movietracker/MovieTrackerLanding";
import EpisodeRouletteLanding from "./modules/episoderoulette/EpisodeRouletteLanding";
import CalendarLanding from "./modules/calendar/CalendarLanding";
import RecipesLanding from "./modules/recipes/RecipesLanding";
import NotepadLanding from "./modules/notepad/NotepadLanding";
import RightNav from "./layout/RightNav";

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

// Pages
type ViewKey =
  | "home"
  | "notepad"
  | "recipes"
  | "builder"
  | "generator"
  | "rpg"
  | "movietracker"
  | "episoderoulette"
  | "calendar";

type Theme = "light" | "dark";

type HomePageProps = {
  theme: Theme;
  toggleTheme: () => void;
};
export default function HomePage({ theme, toggleTheme }: HomePageProps) {
const notepadRef = useRef<NotepadLandingHandle>(null);
const recipesRef = useRef<RecipesLandingHandle>(null);

const navItem = (active: boolean) =>
  `flex items-center gap-2 rounded-md px-2 py-1 ${
    active ? "bg-zinc-100 dark:bg-zinc-900" : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
  }`;

  
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

  const [view, setView] = useState<ViewKey>("home");
  const [rightNavOpen, setRightNavOpen] = useState(true);
  
  const handleRightNavAction = (action: { type: "create" } | { type: "tool"; id: string }) => {
    if (action.type === "create") {
      if (view === "notepad") notepadRef.current?.openCreate();
      if (view === "recipes") recipesRef.current?.openCreate();
      return;
    }
  
    // tool actions later
    console.log("tool:", view, action.id);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Fixed Header */}
      <header className="fixed left-0 top-0 z-50 h-12 w-full border-b border-zinc-400 bg-white/80 backdrop-blur dark:border-zinc-500 dark:bg-zinc-900">
        <div className="flex h-full items-center justify-between px-4">
          <div className="text-md font-semibold tracking-wide">Modular Dashboard</div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-200 px-3 text-sm hover:bg-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-700"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === "dark" ? "Dark" : "Light"}
            </button>
            <button
              type="button"
              onClick={() => setRightNavOpen((v) => !v)}
              className="rounded-md p-2 text-zinc-500 hover:bg-zinc-300 dark:text-zinc-300 dark:hover:bg-zinc-700"
              title={rightNavOpen ? "Collapse right panel" : "Expand right panel"}
            >
              <ArrowsLeftRightIcon size={18} />
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

      {/* Body (Grid under the fixed header) */}
      <div className="pt-12">
      <div className="flex h-[calc(100dvh-3rem)] overflow-hidden">
          {/* Left Sidebar */}
          <aside className="w-[13rem] shrink-0 border-r border-zinc-400 bg-white dark:border-zinc-500 dark:bg-zinc-950">
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
                className="mt-3 flex items-center justify-between rounded-md px-3 py-2 text-xs uppercase tracking-wide text-blue-900 hover:bg-zinc-100 dark:text-blue-400 dark:hover:bg-zinc-900"
              >
                <div className="flex items-center gap-2">
                  <Globe size={18} />
                  World Building
                </div>
                {openGroups.world ? <CaretDown size={16} /> : <CaretRight size={16} />}
              </button>

              {openGroups.world && (
                <div className="ml-6 mt-1 flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => setView("builder")}
                    className={navItem(view === "builder")}
                  >
                    <TreeStructure size={16} />
                    Builder
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("generator")}
                    className={navItem(view === "generator")}
                  >
                    <Sparkle size={16} />
                    Generator
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("rpg")}
                    className={navItem(view === "rpg")}
                  >
                    <Sword size={16} />
                    RPG
                  </button>
                </div>
              )}

              {/* Entertainment Group */}
              <button
                onClick={() => toggleGroup("entertainment")}
                className="mt-3 flex items-center justify-between rounded-md px-3 py-2 text-xs uppercase tracking-wide text-blue-900 hover:bg-zinc-100 dark:text-blue-400 dark:hover:bg-zinc-900"
              >
                <div className="flex items-center gap-2">
                  <GameController size={18} />
                  Entertainment
                </div>
                {openGroups.entertainment ? <CaretDown size={16} /> : <CaretRight size={16} />}
              </button>

              {openGroups.entertainment && (
                <div className="ml-6 mt-1 flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => setView("movietracker")}
                    className={navItem(view === "movietracker")}
                  >
                    <FilmSlate size={16} />
                    Movie Tracker
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("episoderoulette")}
                    className={navItem(view === "episoderoulette")}
                  >
                    <DiceSix size={16} />
                    Episode Roulette
                  </button>
                </div>
              )}

              {/* Utilities Group */}
              <button
                onClick={() => toggleGroup("utilities")}
                className="mt-3 flex items-center justify-between rounded-md px-3 py-2 text-xs uppercase tracking-wide text-blue-900 hover:bg-zinc-100 dark:text-blue-400 dark:hover:bg-zinc-900"
              >
                <div className="flex items-center gap-2">
                  <Wrench size={18} />
                  Utilities
                </div>
                {openGroups.utilities ? <CaretDown size={16} /> : <CaretRight size={16} />}
              </button>

              {openGroups.utilities && (
                <div className="ml-6 mt-1 flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => setView("calendar")}
                    className={navItem(view === "calendar")}
                  >
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

          {/* Center Content */}
          <main className="min-w-0 flex-1 overflow-auto p-4">
            {view === "home" && <div />}

            {view === "builder" && <BuilderLanding />}
            {view === "generator" && <GeneratorLanding />}
            {view === "rpg" && <RpgLanding />}
            {view === "movietracker" && <MovieTrackerLanding />}
            {view === "episoderoulette" && <EpisodeRouletteLanding />}
            {view === "calendar" && <CalendarLanding />}

            {view === "notepad" && <NotepadLanding ref={notepadRef} />}
            {view === "recipes" && <RecipesLanding ref={recipesRef} />}
          </main>

          {/* Right Nav (animated) */}
            <div
              className="shrink-0 overflow-hidden transition-[width] duration-200 ease-out"
              style={{
                width: rightNavOpen ? "20rem" : "0px",
                pointerEvents: rightNavOpen ? "auto" : "none",
              }}
            >
              <div className="h-full w-[20rem] border-l border-zinc-400 bg-white dark:border-zinc-500 dark:bg-zinc-950">
                <RightNav view={view} onAction={handleRightNavAction} />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}