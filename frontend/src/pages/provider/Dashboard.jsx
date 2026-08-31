import { Link } from "react-router-dom";
import { ArrowRight, ClipboardList, Star, Wrench } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

function Dashboard() {
  const { user } = useAuth();
  const { repairRequests } = useData();

  const pending = repairRequests.filter((r) => r.status === "Submitted");
  const activeJobs = repairRequests.filter((r) =>
    ["Accepted", "Diagnosing", "Quote Provided", "Repairing"].includes(
      r.status,
    ),
  );
  const completed = repairRequests.filter((r) => r.status === "Completed");
  const completionRate = repairRequests.length
    ? Math.round((completed.length / repairRequests.length) * 100)
    : 0;

  return (
    <PageContainer className="space-y-8 py-8">
      <SectionHeading
        eyebrow="Provider Overview"
        title={`Welcome back, ${user?.name?.split(" ")[0] || "Partner"}`}
        description="Here's a snapshot of your repair operations."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-reloop-espresso/40">
            Pending Requests
          </p>
          <p className="mt-3 font-display text-3xl font-bold text-reloop-espresso">
            {pending.length}
          </p>
        </Card>
        <Card>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-reloop-espresso/40">
            Active Jobs
          </p>
          <p className="mt-3 font-display text-3xl font-bold text-reloop-espresso">
            {activeJobs.length}
          </p>
        </Card>
        <Card>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-reloop-espresso/40">
            Completion Rate
          </p>
          <p className="mt-3 font-display text-3xl font-bold text-reloop-orange">
            {completionRate}%
          </p>
        </Card>
        <Card>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-reloop-espresso/40">
            Average Rating
          </p>
          <p className="mt-3 flex items-center gap-1 font-display text-3xl font-bold text-reloop-espresso">
            4.7 <Star size={20} className="fill-reloop-orange text-reloop-orange" />
          </p>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-reloop-espresso">
            Incoming Requests
          </h3>
          <Link
            to="/partner/requests"
            className="flex items-center gap-1 text-xs font-semibold text-reloop-orange"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>

        {pending.length === 0 ? (
          <EmptyState
            icon={ClipboardList}
            title="No pending requests"
            description="New repair requests from customers will appear here."
          />
        ) : (
          <div className="mt-5 divide-y divide-reloop-espresso/8">
            {pending.map((r) => (
              <Link
                key={r.id}
                to={`/partner/requests/${r.id}`}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0 hover:opacity-80"
              >
                <div className="flex items-center gap-3">
                  <Wrench size={16} className="text-reloop-orange" />
                  <div>
                    <p className="text-sm font-semibold text-reloop-espresso">
                      {r.productName}
                    </p>
                    <p className="text-xs text-reloop-espresso/50">
                      {r.issue}
                    </p>
                  </div>
                </div>
                <StatusBadge status={r.status} />
              </Link>
            ))}
          </div>
        )}
      </Card>
    </PageContainer>
  );
}

export default Dashboard;
