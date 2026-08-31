import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";
import { useData } from "../../context/DataContext";

function ProductTimeline() {
  const { productId } = useParams();
  const { products, events } = useData();

  const product = products.find((p) => p.id === productId);
  const productEvents = [...(events[productId] ?? [])].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  if (!product) {
    return (
      <PageContainer className="py-8">
        <EmptyState title="Product not found" />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="space-y-6 py-8">
      <Link
        to={`/customer/products/${productId}`}
        className="inline-flex items-center gap-2 text-xs font-semibold text-reloop-espresso/60 hover:text-reloop-orange"
      >
        <ArrowLeft size={14} />
        Back to Passport
      </Link>

      <SectionHeading
        eyebrow={product.productId}
        title={`${product.name} — Lifecycle Timeline`}
        description="Every important event in this product's life, in one place."
      />

      <Card>
        {productEvents.length === 0 ? (
          <EmptyState title="No lifecycle events yet" />
        ) : (
          <ol className="relative space-y-8 border-l border-reloop-espresso/10 pl-6">
            {productEvents.map((event) => (
              <li key={event.id} className="relative">
                <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-reloop-ivory bg-reloop-orange" />
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-reloop-espresso/40">
                  {new Date(event.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="mt-1 font-display text-base font-bold text-reloop-espresso">
                  {event.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-reloop-espresso/55">
                  {event.description}
                </p>
              </li>
            ))}
          </ol>
        )}
      </Card>
    </PageContainer>
  );
}

export default ProductTimeline;
