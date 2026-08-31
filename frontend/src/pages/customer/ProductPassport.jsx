import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Edit3,
  History,
  ShieldCheck,
  Wrench,
  Trash2,
} from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import ProductHealthScore from "../../components/product/ProductHealthScore";
import { useData } from "../../context/DataContext";

const FACTOR_LABELS = {
  condition: "Condition",
  age: "Age",
  repair: "Repair Frequency",
  maintenance: "Maintenance",
  warranty: "Warranty",
  parts: "Parts Replacement",
};

function ProductPassport() {
  const { productId } = useParams();
  const { products, events, repairRequests, getProductHealth, deleteProduct } = useData();

  const product = products.find((p) => p.id === productId);

  async function handleDelete() {
    if (!window.confirm("Delete this product and its passport? This cannot be undone.")) return;
    await deleteProduct(productId);
    window.location.href = "/customer/products";
  }

  if (!product) {
    return (
      <PageContainer className="py-8">
        <EmptyState title="Product not found" />
      </PageContainer>
    );
  }

  const { score, factors, recommendation } = getProductHealth(product);
  const productEvents = events[productId] ?? [];
  const productRepairs = repairRequests.filter(
    (r) => r.productId === productId,
  );

  return (
    <PageContainer className="space-y-6 py-8">
      {/* Header */}
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-reloop-neutral">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-display text-2xl font-bold text-reloop-espresso/25">
                  R
                </span>
              )}
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-reloop-orange">
                {product.productId}
              </p>
              <h1 className="mt-1 font-display text-2xl font-bold text-reloop-espresso sm:text-3xl">
                {product.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <StatusBadge status={product.lifecycleStatus} />
                <Badge variant="neutral">{product.category}</Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ProductHealthScore score={score} size={96} />
            <div className="flex flex-col gap-2">
              <Link to={`/customer/products/${productId}/edit`}>
                <Button variant="outline" size="sm">
                  <Edit3 size={14} />
                  Edit
                </Button>
              </Link>
              <Link to={`/customer/products/${productId}/timeline`}>
                <Button variant="ghost" size="sm">
                  <History size={14} />
                  Timeline
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleDelete}>
                <Trash2 size={14} />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Recommendation */}
      <Card className="border-reloop-orange/20 bg-reloop-orange/5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-reloop-orange">
              Recommended next action
            </p>
            <p className="mt-2 font-display text-xl font-bold text-reloop-espresso">
              {recommendation.action}
            </p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-reloop-espresso/60">
              {recommendation.reason}
            </p>
          </div>

          {recommendation.action === "Repair" && (
            <Link to={`/customer/repairs/new?productId=${productId}`}>
              <Button>
                <Wrench size={16} />
                Request Repair
              </Button>
            </Link>
          )}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Identity + Warranty */}
        <Card className="lg:col-span-2">
          <h3 className="font-display text-lg font-bold text-reloop-espresso">
            Product Identity
          </h3>

          <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              ["Brand", product.brand || "—"],
              ["Model", product.model || "—"],
              ["Category", product.category],
              [
                "Purchase Date",
                product.purchaseDate
                  ? new Date(product.purchaseDate).toLocaleDateString()
                  : "—",
              ],
              ["Condition", product.condition],
              ["Serial No.", product.serialNumber || "—"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-reloop-espresso/35">
                  {label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-reloop-espresso">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 border-t border-reloop-espresso/10 pt-5">
            <h4 className="flex items-center gap-2 font-display text-sm font-bold text-reloop-espresso">
              <ShieldCheck size={16} className="text-reloop-orange" />
              Warranty
            </h4>

            {product.warranty ? (
              <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-reloop-espresso/35">
                    Provider
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {product.warranty.provider}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-reloop-espresso/35">
                    Status
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {product.warranty.status}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-reloop-espresso/35">
                    Ends
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {new Date(
                      product.warranty.endDate,
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-reloop-espresso/35">
                    Coverage
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {product.warranty.coverage}
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-3 text-sm text-reloop-espresso/50">
                No warranty on file for this product.
              </p>
            )}
          </div>

          <div className="mt-6 border-t border-reloop-espresso/10 pt-5">
            <h4 className="font-display text-sm font-bold text-reloop-espresso">
              Repair History
            </h4>

            {productRepairs.length === 0 ? (
              <p className="mt-3 text-sm text-reloop-espresso/50">
                No repairs recorded yet.
              </p>
            ) : (
              <div className="mt-3 space-y-2">
                {productRepairs.map((r) => (
                  <Link
                    key={r.id}
                    to={`/customer/repairs/${r.id}`}
                    className="flex items-center justify-between rounded-xl border border-reloop-espresso/10 px-4 py-3 hover:bg-reloop-neutral/50"
                  >
                    <div>
                      <p className="text-sm font-semibold text-reloop-espresso">
                        {r.issue}
                      </p>
                      <p className="mt-0.5 text-xs text-reloop-espresso/45">
                        {r.createdAt}
                      </p>
                    </div>
                    <StatusBadge status={r.status} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Health Breakdown + Value */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-display text-lg font-bold text-reloop-espresso">
              Health Breakdown
            </h3>
            <div className="mt-4 space-y-3">
              {Object.entries(factors).map(([key, value]) => (
                <div key={key}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-reloop-espresso/60">
                      {FACTOR_LABELS[key]}
                    </span>
                    <span className="font-mono font-semibold text-reloop-espresso">
                      {Math.round(value)}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-reloop-neutral">
                    <div
                      className="h-full rounded-full bg-reloop-orange"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-reloop-espresso/40">
                Estimated Value
              </p>
              <Calendar size={14} className="text-reloop-espresso/30" />
            </div>
            <p className="mt-2 font-mono text-2xl font-bold text-reloop-espresso">
              PKR {product.estimatedValue?.toLocaleString() ?? 0}
            </p>
            <p className="mt-2 text-xs text-reloop-espresso/45">
              Estimate only — based on category, age and condition.
            </p>
          </Card>

          <Link
            to={`/customer/products/${productId}/timeline`}
            className="flex items-center justify-between rounded-2xl border border-reloop-espresso/10 bg-white p-5 hover:bg-reloop-neutral/50"
          >
            <div>
              <p className="font-display text-sm font-bold text-reloop-espresso">
                View Full Timeline
              </p>
              <p className="mt-1 text-xs text-reloop-espresso/45">
                {productEvents.length} lifecycle events recorded
              </p>
            </div>
            <ArrowRight size={16} className="text-reloop-orange" />
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}

export default ProductPassport;
