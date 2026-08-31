import { useEffect, useState } from "react";
import { Bell, Check, Shield } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { api } from "../../utils/api";

function Settings() {
  const { user } = useAuth();
  const { markAllNotificationsRead } = useData();
  const [settings, setSettings] = useState(user?.preferences || { repairAlerts: true, lifecycleReminders: true, marketplaceUpdates: false });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      if (user?.preferences) setSettings(user.preferences);
    } catch {}
  }, [user?.preferences]);

  async function save() {
    try { await api("/auth/preferences", { method: "PATCH", body: JSON.stringify(settings) }); setSaved(true); } catch (error) { alert(error.message); }
  }

  return (
    <PageContainer className="space-y-8 py-8">
      <SectionHeading eyebrow="Settings" title="Account Settings" description="Control the notifications and lifecycle reminders you want to receive." />
      <Card>
        <div className="divide-y divide-reloop-espresso/8">
          {[["repairAlerts", "Repair alerts", "Get notified when a repair request changes status."], ["lifecycleReminders", "Lifecycle reminders", "Receive reminders about maintenance, warranties and product health."], ["marketplaceUpdates", "Marketplace updates", "Receive updates about listings connected to your products."]].map(([keyName, title, description]) => (
            <div key={keyName} className="flex items-center justify-between gap-5 py-5 first:pt-0 last:pb-0"><div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-reloop-espresso/45">{description}</p></div><button type="button" onClick={() => setSettings((prev) => ({ ...prev, [keyName]: !prev[keyName] }))} className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${settings[keyName] ? "bg-reloop-orange" : "bg-reloop-espresso/15"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${settings[keyName] ? "translate-x-6" : "translate-x-1"}`} /></button></div>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-3"><Button onClick={save}><Check size={16} /> Save preferences</Button>{saved && <span className="text-xs font-semibold text-reloop-orange">Saved.</span>}<Button variant="outline" onClick={markAllNotificationsRead}><Bell size={15} /> Mark notifications read</Button></div>
      </Card>
      <Card><div className="flex items-center gap-3"><Shield size={18} className="text-reloop-orange" /><h3 className="font-display text-lg font-bold">Privacy</h3></div><p className="mt-3 text-sm leading-6 text-reloop-espresso/55">Authentication and account preferences are stored through the secure ReLoop API.</p></Card>
    </PageContainer>
  );
}
export default Settings;
