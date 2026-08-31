import { Star } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import Card from "../../components/common/Card";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";

function Reviews() {
  const { repairPartners } = useData();
  const { user } = useAuth();
  const partner = repairPartners.find((item) => item.userId === user?.id) || repairPartners[0];
  const reviews = [
    { id: 1, name: "Ahmed Khan", rating: 5, text: "Clear diagnosis and quick repair." },
    { id: 2, name: "Sara Ahmed", rating: 4, text: "Good communication and fair pricing." },
    { id: 3, name: "Bilal Raza", rating: 5, text: "The device was returned in excellent condition." },
  ];
  return <PageContainer className="space-y-6 py-8"><SectionHeading eyebrow="Reviews" title="Customer Reviews" description="See feedback associated with your repair partner profile." /><Card><div className="flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-reloop-orange/10 text-reloop-orange"><Star size={23} fill="currentColor" /></div><div><p className="font-display text-2xl font-bold">{partner?.ratingAverage || "4.7"}</p><p className="text-xs text-reloop-espresso/45">{partner?.reviewCount || reviews.length} reviews</p></div></div></Card><div className="grid gap-4 lg:grid-cols-2">{reviews.map((review) => <Card key={review.id}><div className="flex items-center justify-between"><p className="font-semibold text-sm">{review.name}</p><div className="flex gap-0.5 text-reloop-orange">{Array.from({ length: review.rating }).map((_, i) => <Star key={i} size={13} fill="currentColor" />)}</div></div><p className="mt-3 text-sm leading-6 text-reloop-espresso/55">{review.text}</p></Card>)}</div></PageContainer>;
}
export default Reviews;
