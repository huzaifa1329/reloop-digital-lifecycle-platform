import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";
import { useData } from "../../context/DataContext";

const STEPS = [
  "Submitted",
  "Accepted",
  "Diagnosing",
  "Quote Provided",
  "Repairing",
  "Completed",
];

function RepairDetail() {
  const { repairId } = useParams();
  const { repairRequests, repairPartners, products } = useData();

  const repair = repairRequests.find((r) => r.id === repairId);

  if (!repair) {
    return (
      <PageContainer className="py-8">
        <EmptyState title="Repair request not found" />
      </PageContainer>
    );
  }

  const product = products.find((p) => p.id === repair.productId);
  const partner = repairPartners.find(
    (p) => p.id === repair.assignedPartnerId,
  );

  const currentIndex = Math.max(STEPS.indexOf(repair.status), 0);

  return (
    <PageContainer className="space-y-6 py-8">
      <Link
        to="/customer/repairs"
        className="inline-flex items-center gap-2 text-xs font-semibold text-reloop-espresso/60 hover:text-reloop-orange"
      >
        <ArrowLeft size={14} />
        Back to Repairs
      </Link>

      <Card>
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-reloop-orange">
          {product?.productId}
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-reloop-espresso">
          {repair.productName} — {repair.issue}
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-reloop-espresso/55">
          {repair.description}
        </p>
      </Card>

      {/* Progress stepper */}
      <Card>
        <h3 className="font-display text-lg font-bold text-reloop-espresso">
          Progress
        </h3>

        <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-4">
          {STEPS.map((step, index) => {
            const isDone = index < currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold ${
                    isDone
                      ? "border-reloop-orange bg-reloop-orange text-white"
                      : isCurrent
                        ? "border-reloop-orange text-reloop-orange"
                        : "border-reloop-espresso/15 text-reloop-espresso/30"
                  }`}
                >
                  {isDone ? <Check size={14} /> : index + 1}
                </div>
                <span
                  className={`text-xs font-medium ${
                    isDone || isCurrent
                      ? "text-reloop-espresso"
                      : "text-reloop-espresso/35"
                  }`}
                >
                  {step}
                </span>
                {index < STEPS.length - 1 && (
                  <span className="mx-1 h-px w-6 bg-reloop-espresso/10 sm:w-10" />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="font-display text-lg font-bold text-reloop-espresso">
            Repair Partner
          </h3>
          {partner ? (
            <div className="mt-4 space-y-1">
              <p className="text-sm font-semibold text-reloop-espresso">
                {partner.businessName}
              </p>
              <p className="text-xs text-reloop-espresso/50">
                {partner.location} · {partner.categories.join(", ")}
              </p>
              <p className="text-xs text-reloop-espresso/50">
                ★ {partner.ratingAverage} ({partner.reviewCount} reviews)
              </p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-reloop-espresso/50">
              Not yet assigned.
            </p>
          )}
        </Card>

        <Card>
          <h3 className="font-display text-lg font-bold text-reloop-espresso">
            Diagnosis & Estimate
          </h3>
          <p className="mt-3 text-sm leading-6 text-reloop-espresso/60">
            {repair.diagnosis || "Diagnosis pending."}
          </p>
          {repair.estimatedCost && (
            <p className="mt-3 font-mono text-lg font-bold text-reloop-espresso">
              PKR {repair.estimatedCost.toLocaleString()}
            </p>
          )}
          {repair.parts?.length > 0 && (
            <div className="mt-4 space-y-1 border-t border-reloop-espresso/10 pt-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-reloop-espresso/35">
                Parts
              </p>
              {repair.parts.map((part) => (
                <div
                  key={part.name}
                  className="flex justify-between text-xs text-reloop-espresso/65"
                >
                  <span>{part.name}</span>
                  <span className="font-mono">
                    PKR {part.cost.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </PageContainer>
  );
}

export default RepairDetail;
