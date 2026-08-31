import { useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Search } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";
import ProductHealthScore from "../../components/product/ProductHealthScore";
import { useData } from "../../context/DataContext";

function Products() {
  const { products, getProductHealth } = useData();
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    [p.name, p.brand, p.category, p.productId]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <PageContainer className="space-y-6 py-8">
      <SectionHeading
        eyebrow="My Products"
        title="Your registered products"
        description="Every product you register keeps a permanent digital lifecycle here."
        action={
          <Link to="/customer/products/new">
            <Button>
              <PlusCircle size={16} />
              Add Product
            </Button>
          </Link>
        }
      />

      <div className="max-w-sm">
        <Input
          placeholder="Search your products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Search}
          title={
            products.length === 0
              ? "Your first product is waiting."
              : "No products match your search."
          }
          description={
            products.length === 0
              ? "Register a laptop, phone or appliance to start its digital lifecycle."
              : "Try a different search term."
          }
          action={
            products.length === 0 && (
              <Link to="/customer/products/new">
                <Button>Add Product</Button>
              </Link>
            )
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => {
            const { score } = getProductHealth(product);
            return (
              <Link key={product.id} to={`/customer/products/${product.id}`}>
                <Card hover padding={false} className="h-full overflow-hidden">
                  <div className="relative h-36 w-full bg-reloop-neutral">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-display text-2xl font-bold text-reloop-espresso/15">
                          R
                        </span>
                      </div>
                    )}
                    <div className="absolute right-3 top-3">
                      <StatusBadge status={product.lifecycleStatus} />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="min-w-0">
                      <p className="truncate font-display text-lg font-bold text-reloop-espresso">
                        {product.name}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-reloop-espresso/40">
                        {product.productId}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center gap-4">
                      <ProductHealthScore score={score} size={64} />
                      <div className="text-sm">
                        <p className="text-reloop-espresso/50">
                          {product.category} · {product.condition}
                        </p>
                        <p className="mt-1 font-mono font-semibold text-reloop-espresso">
                          PKR {product.estimatedValue?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}

export default Products;
