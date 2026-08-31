import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import { useData } from "../../context/DataContext";

function Products() {
  const { products } = useData();

  return (
    <PageContainer className="space-y-6 py-8">
      <SectionHeading
        eyebrow="Products"
        title="Registered Products"
        description="All products registered across the platform."
      />

      <DataTable
        columns={[
          { key: "productId", label: "Product ID" },
          { key: "name", label: "Name" },
          { key: "category", label: "Category" },
          { key: "condition", label: "Condition" },
          {
            key: "lifecycleStatus",
            label: "Status",
            render: (row) => <StatusBadge status={row.lifecycleStatus} />,
          },
        ]}
        rows={products}
      />
    </PageContainer>
  );
}

export default Products;
