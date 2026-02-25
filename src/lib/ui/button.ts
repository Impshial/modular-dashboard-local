export type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "danger" | "success";
export type ButtonSize = "sm" | "md" | "full";

const base =
  "inline-flex items-center justify-center rounded-md text-sm font-medium " +
  "focus:outline-none focus:ring-2 focus:ring-zinc-400/40 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  default:
    "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200",
  secondary:
    "bg-blue-900 text-white hover:bg-zinc-800 dark:bg-blue-900 dark:text-white dark:hover:bg-zinc-600",
  outline:
    "border border-zinc-200 bg-white hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900",
  ghost:
    "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900",
  danger:
    "bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700",
  success:
    "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3",
  md: "h-10 px-4",
  full: "h-10 w-full",
};

export function buttonClassName(opts?: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  const variant = opts?.variant ?? "outline";
  const size = opts?.size ?? "md";
  const extra = opts?.className ? ` ${opts.className}` : "";
  return `${base} ${sizes[size]} ${variants[variant]}${extra}`;
}