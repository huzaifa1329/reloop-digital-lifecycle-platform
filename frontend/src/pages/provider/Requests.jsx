import { Link } from "react-router-dom";
import { ClipboardList } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";
import { useData } from "../../context/DataContext";

function Requests() {
  const { repairRequests } = useData();

  return (
    <PageContainer className="space-y-6 py-8">
      <SectionHeading
        eyebrow="Repair Requests"
        title="Incoming Requests"
        description="Review requests from customers and accept the ones you can take on."
      />

      {repairRequests.length === 0 ? (
        <EmptyState icon={ClipboardList} title="No requests yet" />
      ) : (
        <div className="space-y-3">
          {repairRequests.map((r) => (
            <Link key={r.id} to={`/partner/requests/${r.id}`}>
              <Card
                hover
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-display text-base font-bold text-reloop-espresso">
                    {r.productName}
                  </p>
                  <p className="mt-1 text-sm text-reloop-espresso/55">
                    {r.issue}
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-reloop-espresso/35">
                    {r.location} · Preferred {r.preferredDate}
                  </p>
                </div>
                <StatusBadge status={r.status} />
              </Card>
            </Link>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

export default Requests;
