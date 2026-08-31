import { Bell, CheckCheck } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";
import { useData } from "../../context/DataContext";

function Notifications() {
  const { notifications, markNotificationRead } = useData();

  return (
    <PageContainer className="space-y-6 py-8">
      <SectionHeading
        eyebrow="Notifications"
        title="Stay updated"
        description="Everything happening across your product lifecycle, in one feed."
      />

      {notifications.length === 0 ? (
        <EmptyState icon={Bell} title="No notifications yet" />
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <Card
              key={n.id}
              className={`flex items-start justify-between gap-4 ${
                n.isRead ? "opacity-60" : "border-reloop-orange/20 bg-reloop-orange/5"
              }`}
            >
              <div>
                <p className="font-display text-sm font-bold text-reloop-espresso">
                  {n.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-reloop-espresso/60">
                  {n.message}
                </p>
                <p className="mt-2 font-mono text-[10px] text-reloop-espresso/35">
                  {n.createdAt}
                </p>
              </div>

              {!n.isRead && (
                <button
                  type="button"
                  onClick={() => markNotificationRead(n.id)}
                  className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-reloop-orange hover:bg-reloop-orange/10"
                >
                  <CheckCheck size={14} />
                  Mark read
                </button>
              )}
            </Card>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

export default Notifications;
