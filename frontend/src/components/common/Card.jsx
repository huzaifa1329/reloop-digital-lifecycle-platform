import { cn } from "../../utils/cn";

function Card({
  children,
  className = "",
  hover = false,
  padding = true,
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-reloop-espresso/10 bg-white",
        "shadow-[0_8px_30px_rgba(33,26,23,0.04)]",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(33,26,23,0.08)]",
        padding && "p-5 sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Card;