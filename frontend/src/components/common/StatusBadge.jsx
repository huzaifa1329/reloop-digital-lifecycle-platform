import Badge from "./Badge";

const statusMap = {
  active: {
    label: "Active",
    variant: "green",
  },

  pending: {
    label: "Pending",
    variant: "orange",
  },

  completed: {
    label: "Completed",
    variant: "green",
  },

  cancelled: {
    label: "Cancelled",
    variant: "danger",
  },

  repair: {
    label: "Under Repair",
    variant: "orange",
  },

  "under repair": {
    label: "Under Repair",
    variant: "orange",
  },

  healthy: {
    label: "Healthy",
    variant: "green",
  },

  listed: {
    label: "Listed",
    variant: "orange",
  },

  donated: {
    label: "Donated",
    variant: "green",
  },

  recycled: {
    label: "Recycled",
    variant: "neutral",
  },

  submitted: { label: "Submitted", variant: "neutral" },
  "under review": { label: "Under Review", variant: "orange" },
  accepted: { label: "Accepted", variant: "orange" },
  diagnosing: { label: "Diagnosing", variant: "orange" },
  "quote provided": { label: "Quote Provided", variant: "orange" },
  approved: { label: "Approved", variant: "green" },
  repairing: { label: "Repairing", variant: "orange" },
  rejected: { label: "Rejected", variant: "danger" },
  verified: { label: "Verified", variant: "green" },
  suspended: { label: "Suspended", variant: "danger" },
  needs_maintenance: { label: "Needs Maintenance", variant: "orange" },
  "needs maintenance": { label: "Needs Maintenance", variant: "orange" },
  repaired: { label: "Repaired", variant: "green" },
};

function StatusBadge({ status }) {
  const key = typeof status === "string" ? status.toLowerCase() : status;
  const config = statusMap[key] ?? {
    label: status,
    variant: "neutral",
  };

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}

export default StatusBadge;