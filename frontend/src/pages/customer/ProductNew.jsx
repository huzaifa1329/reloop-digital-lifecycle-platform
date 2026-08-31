import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import Card from "../../components/common/Card";
import ProductForm from "../../components/product/ProductForm";
import { useData } from "../../context/DataContext";

function ProductNew() {
  const { addProduct } = useData();
  const navigate = useNavigate();

  function handleSubmit(values) {
    const product = addProduct(values);
    navigate(`/customer/products/${product.id}`);
  }

  return (
    <PageContainer className="space-y-6 py-8">
      <SectionHeading
        eyebrow="Register a product"
        title="Add Product"
        description="Give this product a permanent digital identity on ReLoop."
      />

      <Card className="max-w-2xl">
        <ProductForm onSubmit={handleSubmit} submitLabel="Create Passport" />
      </Card>
    </PageContainer>
  );
}

export default ProductNew;
