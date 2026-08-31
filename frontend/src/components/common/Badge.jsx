import { cn } from "../../utils/cn";

const variants = {
  orange:
    "bg-reloop-orange/10 text-reloop-orange",
  green:
    "bg-reloop-chartreuse/30 text-reloop-espresso",
  neutral:
    "bg-reloop-neutral text-reloop-espresso/70",
  dark:
    "bg-reloop-espresso text-white",
  danger:
    "bg-red-100 text-red-700",
};

function Badge({
  children,
  variant = "neutral",
  className = "",
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Badge;