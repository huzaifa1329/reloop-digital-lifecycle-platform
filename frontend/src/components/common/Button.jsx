import { LoaderCircle } from "lucide-react";
import { cn } from "../../utils/cn";

const variants = {
  primary:
    "bg-reloop-orange text-white hover:bg-reloop-orange/90",
  secondary:
    "bg-reloop-espresso text-white hover:bg-reloop-espresso/90",
  outline:
    "border border-reloop-espresso/15 bg-transparent text-reloop-espresso hover:bg-reloop-neutral",
  ghost:
    "text-reloop-espresso/70 hover:bg-reloop-neutral hover:text-reloop-espresso",
  danger:
    "bg-red-700 text-white hover:bg-red-800",
};

const sizes = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-reloop-orange/40",
        "disabled:pointer-events-none disabled:opacity-50",
        "hover:-translate-y-0.5",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading && <LoaderCircle size={16} className="animate-spin" />}

      {children}
    </button>
  );
}

export default Button;