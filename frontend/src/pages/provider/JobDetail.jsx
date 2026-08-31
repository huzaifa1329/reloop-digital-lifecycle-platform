import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Textarea from "../../components/common/Textarea";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import { useData } from "../../context/DataContext";

const STATUS_FLOW = [
  "Accepted",
  "Diagnosing",
  "Quote Provided",
  "Repairing",
  "Completed",
];

function JobDetail() {
  const { jobId } = useParams();
  const { repairRequests, updateRepairRequest } = useData();

  const job = repairRequests.find((r) => r.id === jobId);
  const [diagnosis, setDiagnosis] = useState(job?.diagnosis || "");
  const [estimatedCost, setEstimatedCost] = useState(
    job?.estimatedCost || "",
  );

  if (!job) {
    return (
      <PageContainer className="py-8">
        <EmptyState title="Job not found" />
      </PageContainer>
    );
  }

  const currentIndex = STATUS_FLOW.indexOf(job.status);
  const nextStatus = STATUS_FLOW[currentIndex + 1];

  function saveDiagnosis() {
    updateRepairRequest(jobId, {
      diagnosis,
      estimatedCost: Number(estimatedCost) || 0,
      status: job.status === "Accepted" ? "Diagnosing" : job.status,
    });
  }

  function submitQuote() {
    updateRepairRequest(jobId, {
      status: "Quote Provided",
      estimatedCost: Number(estimatedCost) || job.estimatedCost,
    });
  }

  function advanceStatus() {
    if (nextStatus) {
      updateRepairRequest(jobId, { status: nextStatus });
    }
  }

  return (
    <PageContainer className="space-y-6 py-8">
      <Link
        to="/partner/jobs"
        className="inline-flex items-center gap-2 text-xs font-semibold text-reloop-espresso/60 hover:text-reloop-orange"
      >
        <ArrowLeft size={14} />
        Back to Jobs
      </Link>

      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-reloop-espresso">
              {job.productName}
            </h1>
            <p className="mt-1 text-sm font-semibold text-reloop-espresso/70">
              {job.issue}
            </p>
          </div>
          <StatusBadge status={job.status} />
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="font-display text-lg font-bold text-reloop-espresso">
            Diagnosis & Estimate
          </h3>

          <div className="mt-4 space-y-4">
            <Textarea
              label="Diagnosis notes"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="What did you find?"
              disabled={job.status === "Completed"}
            />

            <Input
              label="Estimated cost (PKR)"
              type="number"
              value={estimatedCost}
              onChange={(e) => setEstimatedCost(e.target.value)}
              disabled={job.status === "Completed"}
            />

            {job.status !== "Completed" && (
              <div className="flex gap-3">
                <Button variant="outline" onClick={saveDiagnosis}>
                  Save Diagnosis
                </Button>
                <Button onClick={submitQuote}>Submit Quote</Button>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="font-display text-lg font-bold text-reloop-espresso">
            Update Status
          </h3>

          <p className="mt-3 text-sm text-reloop-espresso/55">
            Current status: <strong>{job.status}</strong>
          </p>

          {job.status === "Completed" ? (
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-green-700">
              <CheckCircle2 size={18} />
              Job completed
            </div>
          ) : (
            <Button className="mt-5" onClick={advanceStatus}>
              Mark as "{nextStatus}"
            </Button>
          )}

          {job.parts?.length > 0 && (
            <div className="mt-6 space-y-1 border-t border-reloop-espresso/10 pt-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-reloop-espresso/35">
                Parts Used
              </p>
              {job.parts.map((part) => (
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

export default JobDetail;
