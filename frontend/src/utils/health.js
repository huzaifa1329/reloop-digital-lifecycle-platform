// ReLoop — Product Health & Recommendation Engine
// Implements the weighting model from the project's Part 17 & Part 18 spec.
// This is a transparent, rule-based (non-AI) scoring system so every
// number shown to the user can be explained.

const CONDITION_SCORES = {
  Excellent: 100,
  Good: 85,
  Fair: 65,
  Poor: 40,
  Critical: 20,
};

export function conditionScore(condition) {
  return CONDITION_SCORES[condition] ?? 65;
}

export function ageScore(purchaseDate) {
  if (!purchaseDate) return 80;
  const years =
    (Date.now() - new Date(purchaseDate).getTime()) /
    (1000 * 60 * 60 * 24 * 365);

  if (years <= 1) return 100;
  if (years <= 2.5) return 80;
  if (years <= 4) return 60;
  if (years <= 6) return 40;
  return 20;
}

export function repairFrequencyScore(repairCount = 0) {
  if (repairCount <= 0) return 100;
  if (repairCount === 1) return 90;
  if (repairCount === 2) return 75;
  if (repairCount === 3) return 60;
  return 40;
}

export function maintenanceScore(level = "occasional") {
  const map = {
    recent: 100,
    consistent: 100,
    occasional: 70,
    rare: 45,
    none: 25,
  };
  return map[level] ?? 70;
}

export function warrantyScore(warranty) {
  if (!warranty || !warranty.endDate) return 35;
  const daysLeft =
    (new Date(warranty.endDate).getTime() - Date.now()) /
    (1000 * 60 * 60 * 24);

  if (daysLeft > 60) return 100;
  if (daysLeft > 0) return 80;
  if (daysLeft > -180) return 55;
  return 35;
}

export function partsScore(partsReplaced = 0) {
  if (partsReplaced <= 0) return 90;
  if (partsReplaced <= 2) return 80;
  return 55;
}

const WEIGHTS = {
  condition: 0.3,
  age: 0.2,
  repair: 0.15,
  maintenance: 0.15,
  warranty: 0.1,
  parts: 0.1,
};

export function calculateHealthScore(product) {
  const factors = {
    condition: conditionScore(product.condition),
    age: ageScore(product.purchaseDate),
    repair: repairFrequencyScore(product.repairCount),
    maintenance: maintenanceScore(product.maintenanceLevel),
    warranty: warrantyScore(product.warranty),
    parts: partsScore(product.partsReplaced),
  };

  const score = Object.entries(WEIGHTS).reduce(
    (total, [key, weight]) => total + factors[key] * weight,
    0,
  );

  return {
    score: Math.round(score),
    factors,
  };
}

export function healthLabel(score) {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Healthy";
  if (score >= 60) return "Fair";
  if (score >= 40) return "Needs Attention";
  return "Critical";
}

// ---------------------------------------------------------------
// Recommendation Engine (Part 18) — priority order when several
// rules match: Repair > Maintain > Upgrade > Resell > Donate > Recycle
// ---------------------------------------------------------------

export function getRecommendation(product, { score } = {}) {
  const health = score ?? calculateHealthScore(product).score;
  const repairCost = product.estimatedRepairCost ?? 0;
  const replacementCost =
    product.estimatedReplacementCost ?? (product.estimatedValue * 2 || 1);

  if (
    health < 40 ||
    (repairCost >= replacementCost && replacementCost > 0)
  ) {
    return {
      action: "Recycle",
      reason:
        "The product's health is low and repair is no longer economically worthwhile, so responsible recycling is the best next step.",
    };
  }

  if (health >= 55 && repairCost > 0 && repairCost < replacementCost * 0.6) {
    return {
      action: "Repair",
      reason:
        "The estimated repair cost is significantly lower than replacement cost, and the product remains in good enough condition to justify the repair.",
    };
  }

  if (health >= 70 && product.maintenanceOverdue) {
    return {
      action: "Maintain",
      reason:
        "Routine maintenance is overdue. Completing it now will keep the product in its current healthy range.",
    };
  }

  if (health >= 65 && product.upgradeable) {
    return {
      action: "Upgrade",
      reason:
        "Core hardware is still usable — a targeted upgrade could meaningfully extend the product's useful life without full replacement.",
    };
  }

  if (health >= 60 && product.estimatedValue > 0) {
    return {
      action: "Resell",
      reason:
        "The product still holds reasonable market value and is in good enough condition to find another owner.",
    };
  }

  if (health >= 50) {
    return {
      action: "Donate",
      reason:
        "Resale value is low, but the product is still functional — donating gives it another life instead of becoming waste.",
    };
  }

  return {
    action: "Recycle",
    reason:
      "The product is no longer economically recoverable. Recycling ensures it is disposed of responsibly.",
  };
}
