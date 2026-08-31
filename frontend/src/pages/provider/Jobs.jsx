import { Link } from "react-router-dom";
import { Wrench } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";
import { useData } from "../../context/DataContext";

function Jobs() {
  const { repairRequests } = useData();

  const jobs = repairRequests.filter((r) =>
    ["Accepted", "Diagnosing", "Quote Provided", "Repairing", "Completed"].includes(
      r.status,
    ),
  );

  return (
    <PageContainer className="space-y-6 py-8">
      <SectionHeading
        eyebrow="Repair Jobs"
        title="Active & Completed Jobs"
        description="Manage diagnosis, quotes and status for jobs you've accepted."
      />

      {jobs.length === 0 ? (
        <EmptyState
          icon={Wrench}
          title="No jobs yet"
          description="Accepted requests will show up here as active jobs."
        />
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <Link key={job.id} to={`/partner/jobs/${job.id}`}>
              <Card
                hover
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-display text-base font-bold text-reloop-espresso">
                    {job.productName}
                  </p>
                  <p className="mt-1 text-sm text-reloop-espresso/55">
                    {job.issue}
                  </p>
                </div>
                <StatusBadge status={job.status} />
              </Card>
            </Link>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

export default Jobs;
