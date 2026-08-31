import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import Card from "../../components/common/Card";
import ProductForm from "../../components/product/ProductForm";
import EmptyState from "../../components/common/EmptyState";
import { useData } from "../../context/DataContext";

function ProductEdit() {
  const { productId } = useParams();
  const { products, updateProduct } = useData();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <PageContainer className="py-8">
        <EmptyState title="Product not found" />
      </PageContainer>
    );
  }

  function handleSubmit(values) {
    updateProduct(productId, {
      ...values,
      estimatedValue: Number(values.estimatedValue) || 0,
    });
    navigate(`/customer/products/${productId}`);
  }

  return (
    <PageContainer className="space-y-6 py-8">
      <SectionHeading
        eyebrow={product.productId}
        title={`Edit ${product.name}`}
        description="Update this product's details. Changes are reflected instantly across its passport."
      />

      <Card className="max-w-2xl">
        <ProductForm
          initialValues={{
            name: product.name,
            brand: product.brand,
            model: product.model,
            category: product.category,
            purchaseDate: product.purchaseDate,
            condition: product.condition,
            estimatedValue: product.estimatedValue,
            serialNumber: product.serialNumber,
            notes: product.notes,
            imageUrl: product.imageUrl,
          }}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
        />
      </Card>
    </PageContainer>
  );
}

export default ProductEdit;
