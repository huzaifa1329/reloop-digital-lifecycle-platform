import { motion } from "framer-motion";

function ProductHealthScore({
  score = 82,
  size = 140,
}) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (score / 100) * circumference;

  const status =
    score >= 80
      ? "Healthy"
      : score >= 60
        ? "Fair"
        : score >= 40
          ? "Needs Attention"
          : "Critical";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="-rotate-90"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          className="text-reloop-neutral"
        />

        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: progress,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="text-reloop-orange"
        />
      </svg>

      <div className="absolute text-center">
        <p className="font-mono text-2xl font-semibold text-reloop-espresso">
          {score}
        </p>

        <p className="text-[10px] font-semibold uppercase tracking-wider text-reloop-espresso/50">
          {status}
        </p>
      </div>
    </div>
  );
}

export default ProductHealthScore;