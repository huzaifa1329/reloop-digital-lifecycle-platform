import { cn } from "../../utils/cn";

function Textarea({
  label,
  error,
  hint,
  id,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-reloop-espresso"
        >
          {label}
        </label>
      )}

      <textarea
        id={id}
        className={cn(
          "min-h-32 w-full resize-y rounded-xl border bg-white px-4 py-3 text-sm text-reloop-espresso outline-none transition-all",
          "placeholder:text-reloop-espresso/35",
          "focus:border-reloop-orange focus:ring-2 focus:ring-reloop-orange/10",
          error
            ? "border-red-500"
            : "border-reloop-espresso/12",
          className,
        )}
        {...props}
      />

      {error && (
        <p className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}

      {!error && hint && (
        <p className="text-xs text-reloop-espresso/50">
          {hint}
        </p>
      )}
    </div>
  );
}

export default Textarea;