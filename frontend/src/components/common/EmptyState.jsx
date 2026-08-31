import { PackageOpen } from "lucide-react";

function EmptyState({
  icon: Icon = PackageOpen,
  title = "Nothing here yet",
  description,
  action,
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-reloop-espresso/15 bg-white/50 px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-reloop-neutral text-reloop-espresso/60">
        <Icon size={22} />
      </div>

      <h3 className="mt-4 font-display text-lg font-bold text-reloop-espresso">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-sm text-sm leading-6 text-reloop-espresso/50">
          {description}
        </p>
      )}

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default EmptyState;