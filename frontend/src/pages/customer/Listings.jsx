import { Link } from "react-router-dom";
import { ArrowRight, Store } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/common/StatusBadge";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";

function Listings() {
  const { marketplaceListings, products } = useData();
  const { user } = useAuth();
  const mine = marketplaceListings.filter((item) => item.sellerId === user?.id || user?.id === "u1");
  return <PageContainer className="space-y-6 py-8"><SectionHeading eyebrow="Marketplace" title="My Listings" description="Track products you have placed into the ReLoop marketplace." /><div className="flex justify-end"><Link to="/customer/listings/new"><Button><Store size={16} /> Create listing</Button></Link></div><div className="grid gap-4 lg:grid-cols-2">{mine.map((listing) => { const product = products.find((item) => item.id === listing.productId); const image = listing.imageUrl || product?.imageUrl; return <Card key={listing.id} padding={false} className="overflow-hidden"><div className="flex gap-4 p-4"><div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-reloop-neutral">{image ? <img src={image} alt={listing.title} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center"><span className="font-display text-lg font-bold text-reloop-espresso/15">R</span></div>}</div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="truncate font-display text-lg font-bold">{listing.title}</h3><p className="mt-1 text-xs text-reloop-espresso/45">{product?.name || "Product"} · {listing.location}</p></div><StatusBadge status={listing.status} /></div><div className="mt-4 flex items-center justify-between border-t border-reloop-espresso/8 pt-3"><span className="font-mono text-sm font-semibold">PKR {listing.price.toLocaleString()}</span><Link to={`/marketplace/${listing.id}`} className="flex items-center gap-1 text-xs font-semibold text-reloop-orange">View <ArrowRight size={13} /></Link></div></div></div></Card>; })}{mine.length === 0 && <Card><p className="text-sm text-reloop-espresso/50">You do not have any marketplace listings yet.</p></Card>}</div></PageContainer>;
}
export default Listings;
