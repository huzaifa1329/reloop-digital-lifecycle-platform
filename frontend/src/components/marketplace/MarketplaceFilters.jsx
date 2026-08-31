import { useState } from "react";
import {
  ChevronDown,
  Filter,
  SlidersHorizontal,
  X,
} from "lucide-react";

const categories = [
  "All products",
  "Laptops",
  "Phones",
  "Cameras",
  "Audio",
  "Gaming",
  "Tablets",
];

const conditions = [
  "Any condition",
  "Excellent",
  "Very Good",
  "Good",
  "Fair",
];

const healthScores = [
  "Any health score",
  "90–100",
  "80–89",
  "70–79",
  "Below 70",
];

const sortOptions = [
  "Recommended",
  "Newest listings",
  "Health score",
  "Price: Low to high",
  "Price: High to low",
];

function MarketplaceFilters({
  category,
  setCategory,
  condition,
  setCondition,
  health,
  setHealth,
  sort,
  setSort,
  hasFilters,
  clearFilters,
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <section className="border-b border-reloop-espresso/10 bg-reloop-ivory">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">

        {/* =====================================================
            TOP ROW
        ====================================================== */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Mobile filter button */}

          <button
            type="button"
            onClick={() => setFiltersOpen((current) => !current)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-reloop-espresso/10 bg-white px-4 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-reloop-espresso/60 transition-colors hover:border-reloop-orange/30 hover:text-reloop-orange lg:hidden"
          >
            <SlidersHorizontal size={14} />

            Filters

            {hasFilters && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-reloop-orange px-1 text-[8px] text-white">
                !
              </span>
            )}
          </button>

          {/* Desktop filters */}

          <div className="hidden items-center gap-3 lg:flex">

            <div className="mr-2 flex items-center gap-2">
              <Filter
                size={14}
                className="text-reloop-orange"
              />

              <span className="font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-reloop-espresso/35">
                Filter by
              </span>
            </div>

            <FilterSelect
              value={category}
              onChange={setCategory}
              options={categories}
            />

            <FilterSelect
              value={condition}
              onChange={setCondition}
              options={conditions}
            />

            <FilterSelect
              value={health}
              onChange={setHealth}
              options={healthScores}
            />
          </div>

          {/* Sort */}

          <div className="relative">
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="h-11 w-full appearance-none rounded-xl border border-reloop-espresso/10 bg-white pl-4 pr-10 font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-reloop-espresso/55 outline-none transition-colors hover:border-reloop-orange/30 focus:border-reloop-orange/40 sm:min-w-52"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-reloop-espresso/30"
            />
          </div>
        </div>

        {/* =====================================================
            MOBILE FILTER PANEL
        ====================================================== */}

        {filtersOpen && (
          <div className="mt-5 rounded-2xl border border-reloop-espresso/10 bg-white p-4 lg:hidden">

            <div className="flex items-center justify-between border-b border-reloop-espresso/10 pb-4">

              <div className="flex items-center gap-2">
                <Filter
                  size={14}
                  className="text-reloop-orange"
                />

                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-reloop-espresso/55">
                  Filters
                </span>
              </div>

              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="rounded-full p-1.5 text-reloop-espresso/35 hover:bg-reloop-neutral hover:text-reloop-espresso"
                aria-label="Close filters"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">

              <FilterField
                label="Category"
                value={category}
                onChange={setCategory}
                options={categories}
              />

              <FilterField
                label="Condition"
                value={condition}
                onChange={setCondition}
                options={conditions}
              />

              <FilterField
                label="Health"
                value={health}
                onChange={setHealth}
                options={healthScores}
              />

            </div>
          </div>
        )}

        {/* =====================================================
            ACTIVE FILTERS
        ====================================================== */}

        {hasFilters && (
          <div className="mt-5 flex flex-wrap items-center gap-2">

            <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-reloop-espresso/30">
              Active:
            </span>

            {category !== "All products" && (
              <ActiveFilter
                label={category}
                onRemove={() => setCategory("All products")}
              />
            )}

            {condition !== "Any condition" && (
              <ActiveFilter
                label={condition}
                onRemove={() => setCondition("Any condition")}
              />
            )}

            {health !== "Any health score" && (
              <ActiveFilter
                label={health}
                onRemove={() => setHealth("Any health score")}
              />
            )}

            {sort !== "Recommended" && (
              <ActiveFilter
                label={sort}
                onRemove={() => setSort("Recommended")}
              />
            )}

            <button
              type="button"
              onClick={clearFilters}
              className="ml-2 inline-flex items-center gap-1.5 font-mono text-[8px] font-medium uppercase tracking-[0.12em] text-reloop-espresso/35 transition-colors hover:text-reloop-orange"
            >
              <X size={12} />
              Clear all
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   DESKTOP SELECT
========================================================= */

function FilterSelect({
  value,
  onChange,
  options,
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 min-w-36 appearance-none rounded-full border border-reloop-espresso/10 bg-white pl-4 pr-9 font-mono text-[8px] font-medium uppercase tracking-[0.08em] text-reloop-espresso/50 outline-none transition-colors hover:border-reloop-orange/30 focus:border-reloop-orange/40"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={12}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-reloop-espresso/25"
      />
    </div>
  );
}

/* =========================================================
   MOBILE FILTER FIELD
========================================================= */

function FilterField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[8px] font-medium uppercase tracking-[0.12em] text-reloop-espresso/35">
        {label}
      </span>

      <div className="relative">
        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="h-11 w-full appearance-none rounded-xl border border-reloop-espresso/10 bg-reloop-neutral px-3 pr-9 text-xs text-reloop-espresso outline-none focus:border-reloop-orange/40"
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={13}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-reloop-espresso/25"
        />
      </div>
    </label>
  );
}

/* =========================================================
   ACTIVE FILTER
========================================================= */

function ActiveFilter({
  label,
  onRemove,
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 rounded-full bg-reloop-orange/10 px-3 py-1.5 font-mono text-[8px] font-medium uppercase tracking-[0.08em] text-reloop-orange transition-colors hover:bg-reloop-orange hover:text-white"
    >
      {label}

      <X size={10} />
    </button>
  );
}

export default MarketplaceFilters;