import { useState } from "react";
import { Check, UserRound } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

function Profile() {
  const { user } = useAuth();
  const { updateUser } = useData();
  const [name, setName] = useState(user?.name || "");
  const [saved, setSaved] = useState(false);

  function save(event) {
    event.preventDefault();
    updateUser(user.id, { name });
    setSaved(true);
  }

  return <PageContainer className="space-y-6 py-8"><SectionHeading eyebrow="Profile" title="Your Profile" description="Keep your ReLoop account details up to date." /><Card className="max-w-2xl"><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-reloop-orange text-white"><UserRound size={19} /></div><div><h3 className="font-display text-lg font-bold">Account details</h3><p className="text-xs text-reloop-espresso/45">{user?.role}</p></div></div><form onSubmit={save} className="mt-6 space-y-4"><Input id="profile-name" label="Full name" value={name} onChange={(e) => setName(e.target.value)} /><Input id="profile-email" label="Email" value={user?.email || ""} readOnly /><div className="flex items-center gap-3"><Button type="submit"><Check size={16} /> Save profile</Button>{saved && <span className="text-xs font-semibold text-reloop-orange">Profile updated.</span>}</div></form></Card></PageContainer>;
}
export default Profile;
