import {
  AlertCircle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";

const config = {
  success: {
    icon: CheckCircle2,
    title: "Success",
    className: "border-reloop-chartreuse/60",
  },

  error: {
    icon: AlertCircle,
    title: "Something went wrong",
    className: "border-red-300",
  },

  info: {
    icon: Info,
    title: "Information",
    className: "border-reloop-orange/30",
  },
};

function Toast({
  type = "success",
  message,
  onClose,
}) {
  const current = config[type] ?? config.info;
  const Icon = current.icon;

  return (
    <div
      className={`flex w-full max-w-sm items-start gap-3 rounded-2xl border bg-reloop-ivory p-4 shadow-xl ${current.className}`}
    >
      <Icon
        size={20}
        className="mt-0.5 shrink-0 text-reloop-orange"
      />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-reloop-espresso">
          {current.title}
        </p>

        <p className="mt-1 text-sm leading-5 text-reloop-espresso/55">
          {message}
        </p>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 text-reloop-espresso/40 hover:bg-reloop-neutral"
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default Toast;