import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import { useData } from "../../context/DataContext";

function Repairs() {
  const { repairRequests } = useData();

  return (
    <PageContainer className="space-y-6 py-8">
      <SectionHeading
        eyebrow="Repairs"
        title="Repair Requests"
        description="Monitor repair activity across all customers and partners."
      />

      <DataTable
        columns={[
          { key: "productName", label: "Product" },
          { key: "issue", label: "Issue" },
          { key: "location", label: "Location" },
          {
            key: "status",
            label: "Status",
            render: (row) => <StatusBadge status={row.status} />,
          },
        ]}
        rows={repairRequests}
      />
    </PageContainer>
  );
}

export default Repairs;
