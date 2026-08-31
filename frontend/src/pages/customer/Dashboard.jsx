import { Link } from "react-router-dom";
import { ArrowRight, Bell, Package, PlusCircle, Wrench } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";
import ProductHealthScore from "../../components/product/ProductHealthScore";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

function Dashboard() {
  const { user } = useAuth();
  const { products, repairRequests, notifications, getProductHealth } =
    useData();

  const activeRepairs = repairRequests.filter(
    (r) => r.status !== "Completed" && r.status !== "Cancelled",
  );

  const avgHealth = products.length
    ? Math.round(
        products.reduce(
          (sum, p) => sum + getProductHealth(p).score,
          0,
        ) / products.length,
      )
    : 0;

  const needsAttention = products.filter(
    (p) => getProductHealth(p).score < 60,
  );

  const unreadNotifications = notifications.filter((n) => !n.isRead);

  return (
    <PageContainer className="space-y-8 py-8">
      <SectionHeading
        eyebrow="Overview"
        title={`Welcome back, ${user?.name?.split(" ")[0] || "there"}`}
        description="Here's what's happening across your product lifecycle."
        action={
          <Link to="/customer/products/new">
            <Button>
              <PlusCircle size={16} />
              Add Product
            </Button>
          </Link>
        }
      />

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-reloop-espresso/40">
            Total Products
          </p>
          <p className="mt-3 font-display text-3xl font-bold text-reloop-espresso">
            {products.length}
          </p>
        </Card>

        <Card>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-reloop-espresso/40">
            Average Health
          </p>
          <p className="mt-3 font-display text-3xl font-bold text-reloop-orange">
            {avgHealth}/100
          </p>
        </Card>

        <Card>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-reloop-espresso/40">
            Active Repairs
          </p>
          <p className="mt-3 font-display text-3xl font-bold text-reloop-espresso">
            {activeRepairs.length}
          </p>
        </Card>

        <Card>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-reloop-espresso/40">
            Needs Attention
          </p>
          <p className="mt-3 font-display text-3xl font-bold text-reloop-espresso">
            {needsAttention.length}
          </p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Product Health Summary */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-reloop-espresso">
              Product Health Summary
            </h3>
            <Link
              to="/customer/products"
              className="flex items-center gap-1 text-xs font-semibold text-reloop-orange"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>

          {products.length === 0 ? (
            <EmptyState
              icon={Package}
              title="Your first product is waiting."
              description="Register a product to start tracking its lifecycle."
              action={
                <Link to="/customer/products/new">
                  <Button>Add Product</Button>
                </Link>
              }
            />
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {products.slice(0, 4).map((product) => {
                const { score, recommendation } = getProductHealth(product);
                return (
                  <Link
                    key={product.id}
                    to={`/customer/products/${product.id}`}
                    className="flex items-center gap-4 rounded-2xl border border-reloop-espresso/10 p-4 transition-colors hover:bg-reloop-neutral/50"
                  >
                    <ProductHealthScore score={score} size={64} />
                    <div className="min-w-0">
                      <p className="truncate font-display text-sm font-bold text-reloop-espresso">
                        {product.name}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-reloop-espresso/40">
                        {product.productId}
                      </p>
                      <p className="mt-2 text-xs font-semibold text-reloop-orange">
                        {recommendation.action} recommended
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </Card>

        {/* Notifications */}
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-reloop-espresso">
              Recent Notifications
            </h3>
            <Bell size={16} className="text-reloop-espresso/40" />
          </div>

          <div className="mt-5 space-y-3">
            {unreadNotifications.length === 0 && (
              <p className="text-sm text-reloop-espresso/45">
                You're all caught up.
              </p>
            )}

            {notifications.slice(0, 4).map((n) => (
              <div
                key={n.id}
                className={`rounded-xl border p-3 ${
                  n.isRead
                    ? "border-reloop-espresso/8 opacity-60"
                    : "border-reloop-orange/20 bg-reloop-orange/5"
                }`}
              >
                <p className="text-sm font-semibold text-reloop-espresso">
                  {n.title}
                </p>
                <p className="mt-1 text-xs leading-5 text-reloop-espresso/55">
                  {n.message}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Active Repairs */}
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-reloop-espresso">
            Active Repairs
          </h3>
          <Link
            to="/customer/repairs"
            className="flex items-center gap-1 text-xs font-semibold text-reloop-orange"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>

        {activeRepairs.length === 0 ? (
          <EmptyState
            icon={Wrench}
            title="No active repairs"
            description="Request a repair from any product's passport when it needs one."
          />
        ) : (
          <div className="mt-5 divide-y divide-reloop-espresso/8">
            {activeRepairs.map((repair) => (
              <Link
                key={repair.id}
                to={`/customer/repairs/${repair.id}`}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0 hover:opacity-80"
              >
                <div>
                  <p className="text-sm font-semibold text-reloop-espresso">
                    {repair.productName}
                  </p>
                  <p className="text-xs text-reloop-espresso/50">
                    {repair.issue}
                  </p>
                </div>
                <StatusBadge status={repair.status} />
              </Link>
            ))}
          </div>
        )}
      </Card>
    </PageContainer>
  );
}

export default Dashboard;
