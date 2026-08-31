import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import { useData } from "../../context/DataContext";

function RequestDetail() {
  const { requestId } = useParams();
  const { repairRequests, updateRepairRequest } = useData();
  const navigate = useNavigate();

  const request = repairRequests.find((r) => r.id === requestId);

  if (!request) {
    return (
      <PageContainer className="py-8">
        <EmptyState title="Request not found" />
      </PageContainer>
    );
  }

  function accept() {
    updateRepairRequest(requestId, { status: "Accepted" });
    navigate(`/partner/jobs/${requestId}`);
  }

  function reject() {
    updateRepairRequest(requestId, { status: "Rejected" });
  }

  return (
    <PageContainer className="space-y-6 py-8">
      <Link
        to="/partner/requests"
        className="inline-flex items-center gap-2 text-xs font-semibold text-reloop-espresso/60 hover:text-reloop-orange"
      >
        <ArrowLeft size={14} />
        Back to Requests
      </Link>

      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-reloop-espresso">
              {request.productName}
            </h1>
            <p className="mt-1 text-sm font-semibold text-reloop-espresso/70">
              {request.issue}
            </p>
          </div>
          <StatusBadge status={request.status} />
        </div>

        <p className="mt-4 max-w-xl text-sm leading-6 text-reloop-espresso/60">
          {request.description}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-reloop-espresso/10 pt-5 sm:grid-cols-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-reloop-espresso/35">
              Service Type
            </p>
            <p className="mt-1 text-sm font-semibold">{request.serviceType}</p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-reloop-espresso/35">
              Preferred Date
            </p>
            <p className="mt-1 text-sm font-semibold">
              {request.preferredDate}
            </p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-reloop-espresso/35">
              Location
            </p>
            <p className="mt-1 text-sm font-semibold">{request.location}</p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-reloop-espresso/35">
              Submitted
            </p>
            <p className="mt-1 text-sm font-semibold">{request.createdAt}</p>
          </div>
        </div>

        {request.status === "Submitted" && (
          <div className="mt-6 flex gap-3 border-t border-reloop-espresso/10 pt-5">
            <Button onClick={accept}>
              <Check size={16} />
              Accept Request
            </Button>
            <Button variant="outline" onClick={reject}>
              <X size={16} />
              Reject
            </Button>
          </div>
        )}

        {request.status !== "Submitted" && request.status !== "Rejected" && (
          <div className="mt-6 border-t border-reloop-espresso/10 pt-5">
            <Link to={`/partner/jobs/${requestId}`}>
              <Button variant="outline">Manage in Repair Job</Button>
            </Link>
          </div>
        )}
      </Card>
    </PageContainer>
  );
}

export default RequestDetail;
