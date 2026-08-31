import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import Button from "../../components/common/Button";
import { useData } from "../../context/DataContext";

function Marketplace() {
  const { marketplaceListings, updateMarketplaceListing, removeMarketplaceListing } =
    useData();

  function approve(row) {
    updateMarketplaceListing(row.id, { status: "Active" });
  }

  return (
    <PageContainer className="space-y-6 py-8">
      <SectionHeading
        eyebrow="Marketplace"
        title="Listing Moderation"
        description="Review marketplace listings for policy compliance. Actions update MongoDB immediately and notify the listing owner."
      />

      <DataTable
        columns={[
          { key: "title", label: "Listing" },
          {
            key: "price",
            label: "Price",
            render: (row) => `PKR ${row.price.toLocaleString()}`,
          },
          { key: "location", label: "Location" },
          {
            key: "status",
            label: "Status",
            render: (row) => <StatusBadge status={row.status} />,
          },
        ]}
        rows={marketplaceListings}
        renderActions={(row) => (
          <div className="flex gap-2">
            <Button
              size="sm"
              disabled={row.status === "Active" || row.status === "Removed"}
              onClick={() => approve(row)}
            >
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={row.status === "Removed"}
              onClick={() => removeMarketplaceListing(row.id)}
            >
              Remove
            </Button>
          </div>
        )}
      />
    </PageContainer>
  );
}

export default Marketplace;
