function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-reloop-orange">
            {eyebrow}
          </p>
        )}

        <h2 className="font-display text-2xl font-bold tracking-tight text-reloop-espresso sm:text-3xl">
          {title}
        </h2>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-reloop-espresso/55">
            {description}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}

export default SectionHeading;