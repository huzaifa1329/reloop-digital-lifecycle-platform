function PagePlaceholder({ title, description }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="max-w-xl text-center">
        <p className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-reloop-orange">
          ReLoop
        </p>

        <h1 className="font-display text-4xl font-bold tracking-tight text-reloop-espresso">
          {title}
        </h1>

        <p className="mt-4 text-base leading-7 text-reloop-espresso/65">
          {description}
        </p>
      </section>
    </main>
  );
}

export default PagePlaceholder;