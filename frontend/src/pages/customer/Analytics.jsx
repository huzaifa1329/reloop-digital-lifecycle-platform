import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import Card from "../../components/common/Card";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";

function Analytics() {
  const { user } = useAuth();
  const { products, repairRequests, getProductHealth } = useData();
  const ownedProducts = products.filter((item) => item.ownerId === user?.id || user?.id === "u1");
  const ownedRepairs = repairRequests.filter((item) => item.customerId === user?.id || user?.id === "u1");

  const healthData = ownedProducts.map((product) => ({
    name: product.name.length > 14 ? `${product.name.slice(0, 14)}…` : product.name,
    score: getProductHealth(product).score,
  }));

  const completed = ownedRepairs.filter((item) => item.status === "Completed").length;
  const active = ownedRepairs.length - completed;
  const repairSpend = ownedRepairs.reduce((sum, item) => sum + (item.finalCost || item.estimatedCost || 0), 0);

  return (
    <PageContainer className="space-y-8 py-8">
      <SectionHeading eyebrow="Analytics" title="Your Lifecycle Analytics" description="Understand product health, repair activity and lifecycle decisions across your registered products." />
      <div className="grid gap-4 sm:grid-cols-3">
        {[["Products", ownedProducts.length], ["Completed repairs", completed], ["Repair spend", `PKR ${repairSpend.toLocaleString()}`]].map(([label, value]) => (
          <Card key={label}><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-reloop-espresso/40">{label}</p><p className="mt-3 font-display text-3xl font-bold">{value}</p></Card>
        ))}
      </div>
      <Card>
        <div className="flex items-center justify-between"><div><h3 className="font-display text-lg font-bold">Product health</h3><p className="mt-1 text-xs text-reloop-espresso/45">Current calculated health score for each product.</p></div><span className="rounded-full bg-reloop-chartreuse px-3 py-1 text-xs font-semibold">{active} active repair{active === 1 ? "" : "s"}</span></div>
        <div className="mt-5 h-80">
          {healthData.length ? <ResponsiveContainer width="100%" height="100%"><BarChart data={healthData}><CartesianGrid strokeDasharray="3 3" stroke="#e6ded3" /><XAxis dataKey="name" tick={{ fontSize: 10 }} /><YAxis domain={[0, 100]} tick={{ fontSize: 10 }} /><Tooltip /><Bar dataKey="score" fill="#e85d3f" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer> : <div className="flex h-full items-center justify-center text-sm text-reloop-espresso/40">Register a product to see analytics.</div>}
        </div>
      </Card>
    </PageContainer>
  );
}

export default Analytics;
