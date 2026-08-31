import { cn } from "../../utils/cn";

function Select({
  label,
  error,
  options = [],
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

      <select
        id={id}
        className={cn(
          "h-11 w-full rounded-xl border bg-white px-4 text-sm text-reloop-espresso outline-none transition-all",
          "focus:border-reloop-orange focus:ring-2 focus:ring-reloop-orange/10",
          error
            ? "border-red-500"
            : "border-reloop-espresso/12",
          className,
        )}
        {...props}
      >
        <option value="">Select an option</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default Select;