import { getRightNavConfig } from "./rightNavRegistry";
import { buttonClassName } from "../lib/ui/button";

type ViewKey =
  | "home"
  | "builder"
  | "generator"
  | "rpg"
  | "movietracker"
  | "episoderoulette"
  | "calendar"
  | "notepad"
  | "recipes";

  type Props = {
    view: ViewKey;
    onAction: (action: { type: "create" } | { type: "tool"; id: string }) => void;
  };

  export default function RightNav({ view, onAction }: Props) {
  const rn = getRightNavConfig(view);

  return (
    <aside className="border-l border-zinc-400 bg-white dark:border-zinc-500 dark:bg-zinc-950">
      <div className="flex h-full min-h-0 flex-col">
        {/* Header */}
        <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-900/40">
          <div className="text-xs uppercase tracking-wider text-zinc-500">
            Right Nav
          </div>
          <div className="mt-1 text-sm font-semibold">{rn.title}</div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-3">
            {rn.createLabel && (
                <button
                type="button"
                className={buttonClassName({ variant: "secondary", size: "full" })}
                onClick={() => onAction({ type: "create" })}
                >
                {rn.createLabel}
                </button>
            )}
        

            {rn.tools && rn.tools.length > 0 && (
                <div className="mt-2">
                    <label className="mb-3 mt-6 block text-xs uppercase tracking-wider text-zinc-500">
                    Tools
                    </label>

                    <select
                    className="h-11 pb-1 w-full rounded-md border border-zinc-900 bg-white px-3 text-sm dark:border-zinc-500 dark:bg-zinc-950"
                    defaultValue=""
                    onChange={(e) => {
                        const toolId = e.target.value;
                        if (!toolId) return;

                        e.currentTarget.value = "";
                        onAction({ type: "tool", id: toolId });
                    }}
                    >
                    <option value="" disabled>
                        Select a tool…
                    </option>
                    {rn.tools.map((t) => (
                        <option key={t.id} value={t.id}>
                        {t.label}
                        </option>
                    ))}
                    </select>
                </div>
            )}
           </div> 
      </div>
    </aside>
  );
}