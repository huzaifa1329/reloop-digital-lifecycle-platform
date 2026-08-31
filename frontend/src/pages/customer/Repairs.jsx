import { Link } from "react-router-dom";
import { PlusCircle, Wrench } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";
import { useData } from "../../context/DataContext";

function Repairs() {
  const { repairRequests } = useData();

  return (
    <PageContainer className="space-y-6 py-8">
      <SectionHeading
        eyebrow="Repairs"
        title="My Repair Requests"
        description="Track every repair request from submission to completion."
        action={
          <Link to="/customer/repairs/new">
            <Button>
              <PlusCircle size={16} />
              Request Repair
            </Button>
          </Link>
        }
      />

      {repairRequests.length === 0 ? (
        <EmptyState
          icon={Wrench}
          title="No repair requests yet"
          description="When a product needs attention, request a repair from its passport."
        />
      ) : (
        <div className="space-y-3">
          {repairRequests.map((repair) => (
            <Link key={repair.id} to={`/customer/repairs/${repair.id}`}>
              <Card
                hover
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-display text-base font-bold text-reloop-espresso">
                    {repair.productName}
                  </p>
                  <p className="mt-1 text-sm text-reloop-espresso/55">
                    {repair.issue}
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-reloop-espresso/35">
                    Submitted {repair.createdAt}
                  </p>
                </div>
                <StatusBadge status={repair.status} />
              </Card>
            </Link>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

export default Repairs;
