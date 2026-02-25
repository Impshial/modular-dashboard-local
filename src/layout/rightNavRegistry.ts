// src/layout/rightNavRegistry.ts

export type ViewKey =
  | "home"
  | "builder"
  | "generator"
  | "rpg"
  | "movietracker"
  | "episoderoulette"
  | "calendar"
  | "notepad"
  | "recipes";

export type RightNavConfig = {
  title: string;
  createLabel?: string; // if missing, Right Nav won't show a Create button
  tools?: { id: string; label: string }[];
};

export function getRightNavConfig(view: ViewKey): RightNavConfig {
  switch (view) {
    case "notepad":
        return {
            title: "Notepad",
            createLabel: "Create Note",
            tools: [
              { id: "search", label: "Search Notes" },
              { id: "bulk", label: "Bulk Edit" },
            ],
          };

    case "recipes":
        return {
            title: "Recipes",
            createLabel: "Create Recipe",
            tools: [
              { id: "import", label: "Import Recipe" },
              { id: "build", label: "Build A Meal" },
            ],
          };

    case "builder":
      return { title: "Builder", createLabel: "Create Entity" };

    case "generator":
      return { title: "Generator", createLabel: "Create Template" };

    case "rpg":
      return { title: "RPG", createLabel: "Create Entry" };

    case "movietracker":
      return { title: "Movie Tracker", createLabel: "Create Movie" };

    case "calendar":
      return { title: "Calendar", createLabel: "Create Event" };

    case "episoderoulette":
      return { title: "Episode Roulette" };

    case "home":
    default:
      return { title: "Home" };
  }
}