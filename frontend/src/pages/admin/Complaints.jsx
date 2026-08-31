import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";

const initialComplaints = [
  {
    id: "c1",
    subject: "Repair took longer than quoted",
    raisedBy: "Ahmed Khan",
    against: "Usman Electronics Repair",
    status: "Under Review",
    date: "2026-07-05",
  },
  {
    id: "c2",
    subject: "Marketplace listing description was inaccurate",
    raisedBy: "Sara Ahmed",
    against: "Seller — Bilal Raza",
    status: "Submitted",
    date: "2026-08-10",
  },
  {
    id: "c3",
    subject: "Partner missed scheduled pickup",
    raisedBy: "Fatima Noor",
    against: "FixIt Mobile Care",
    status: "Resolved",
    date: "2026-05-18",
  },
];

const STATUS_FLOW = ["Submitted", "Under Review", "Resolved"];

function Complaints() {
  const [complaints, setComplaints] = useState(initialComplaints);

  function advance(id) {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const idx = STATUS_FLOW.indexOf(c.status);
        const next = STATUS_FLOW[Math.min(idx + 1, STATUS_FLOW.length - 1)];
        return { ...c, status: next };
      }),
    );
  }

  return (
    <PageContainer className="space-y-6 py-8">
      <SectionHeading
        eyebrow="Complaints"
        title="Complaint Handling"
        description="Track and resolve issues raised by customers about repairs or marketplace activity."
      />

      {complaints.length === 0 ? (
        <EmptyState icon={AlertTriangle} title="No complaints on file" />
      ) : (
        <DataTable
          columns={[
            { key: "subject", label: "Subject" },
            { key: "raisedBy", label: "Raised By" },
            { key: "against", label: "Against" },
            { key: "date", label: "Date" },
            {
              key: "status",
              label: "Status",
              render: (row) => <StatusBadge status={row.status} />,
            },
          ]}
          rows={complaints}
          renderActions={(row) => (
            <Button
              size="sm"
              variant="outline"
              disabled={row.status === "Resolved"}
              onClick={() => advance(row.id)}
            >
              {row.status === "Submitted" ? "Start Review" : "Mark Resolved"}
            </Button>
          )}
        />
      )}
    </PageContainer>
  );
}

export default Complaints;
