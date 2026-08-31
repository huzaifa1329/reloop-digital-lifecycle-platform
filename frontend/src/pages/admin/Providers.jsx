import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import Button from "../../components/common/Button";
import { useData } from "../../context/DataContext";

function Providers() {
  const { repairPartners, updateProvider } = useData();

  function verify(row) {
    updateProvider(row.id, { verificationStatus: "Verified", status: "Active" });
  }

  function toggleSuspension(row) {
    updateProvider(row.id, {
      status: row.status === "Suspended" ? "Active" : "Suspended",
    });
  }

  return (
    <PageContainer className="space-y-6 py-8">
      <SectionHeading
        eyebrow="Repair Partners"
        title="Partner Verification"
        description="Review, verify and suspend repair partners before they receive jobs."
      />

      <DataTable
        columns={[
          { key: "businessName", label: "Business" },
          { key: "location", label: "Location" },
          {
            key: "categories",
            label: "Categories",
            render: (row) => row.categories.join(", "),
          },
          {
            key: "verificationStatus",
            label: "Verification",
            render: (row) => <StatusBadge status={row.verificationStatus} />,
          },
          {
            key: "status",
            label: "Account",
            render: (row) => <StatusBadge status={row.status || "Active"} />,
          },
        ]}
        rows={repairPartners}
        renderActions={(row) => (
          <div className="flex gap-2">
            <Button
              size="sm"
              disabled={row.verificationStatus === "Verified"}
              onClick={() => verify(row)}
            >
              Verify
            </Button>
            <Button size="sm" variant="outline" onClick={() => toggleSuspension(row)}>
              {row.status === "Suspended" ? "Reactivate" : "Suspend"}
            </Button>
          </div>
        )}
      />
    </PageContainer>
  );
}

export default Providers;
