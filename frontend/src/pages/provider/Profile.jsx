import { useState } from "react";
import { Building2, Check } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

function Profile() {
  const { user } = useAuth();
  const { repairPartners, updateProvider } = useData();
  const partner = repairPartners.find((item) => item.userId === user?.id) || repairPartners[0];
  const [businessName, setBusinessName] = useState(partner?.businessName || "");
  const [location, setLocation] = useState(partner?.location || "");
  const [saved, setSaved] = useState(false);
  function save(event) { event.preventDefault(); if (!partner) return; updateProvider(partner.id, { businessName, location }); setSaved(true); }
  return <PageContainer className="space-y-6 py-8"><SectionHeading eyebrow="Provider Profile" title="Business Profile" description="Keep your repair partner information accurate for customers and the admin team." /><Card className="max-w-2xl"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-reloop-orange/10 text-reloop-orange"><Building2 size={19} /></div><div><h3 className="font-display text-lg font-bold">Repair business</h3><p className="text-xs text-reloop-espresso/45">Verification: {partner?.verificationStatus || "Pending"}</p></div></div><form onSubmit={save} className="mt-6 space-y-4"><Input id="business" label="Business name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} /><Input id="location" label="Location" value={location} onChange={(e) => setLocation(e.target.value)} /><div className="flex items-center gap-3"><Button type="submit"><Check size={16} /> Save profile</Button>{saved && <span className="text-xs font-semibold text-reloop-orange">Profile updated.</span>}</div></form></Card></PageContainer>;
}
export default Profile;
