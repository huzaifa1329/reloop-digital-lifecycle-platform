import { cn } from "../../utils/cn";

function Input({
  label,
  error,
  hint,
  className = "",
  id,
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

      <input
        id={id}
        className={cn(
          "h-11 w-full rounded-xl border bg-white px-4 text-sm text-reloop-espresso outline-none transition-all",
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

export default Input;