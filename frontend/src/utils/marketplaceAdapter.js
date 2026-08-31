// Normalizes a customer-created (dynamic) marketplace listing + its linked
// product into the same shape as the static demo `marketplaceProducts`
// entries, so both can render through the same public marketplace UI.

export function normalizeListing(listing, product) {
  return {
    id: listing.id,
    productId: product?.productId || listing.productId,
    name: listing.name || product?.name || listing.title,
    brand: listing.brand || product?.brand || "",
    model: listing.model || product?.model || "",
    category: listing.category || product?.category || "Other",
    condition: listing.condition || product?.condition || "Good",
    health: listing.health ?? 70,
    price: listing.price,
    location: listing.location || "Pakistan",
    verified: listing.status === "Active",
    purchaseDate: product?.purchaseDate || null,
    usage: product?.purchaseDate
      ? `${Math.max(
          1,
          Math.round(
            (Date.now() - new Date(product.purchaseDate).getTime()) /
              (1000 * 60 * 60 * 24 * 365),
          ),
        )} years`
      : "Unknown",
    repairCount: product?.repairCount ?? 0,
    partsReplaced: product?.partsReplaced ?? 0,
    image: listing.imageUrl || product?.imageUrl || "",
    story:
      product?.notes ||
      `A ReLoop-registered ${listing.category || "product"} listed directly by its owner, with its digital lifecycle history connected.`,
    highlights: [
      "Digital Product Passport connected",
      "Listed by verified ReLoop owner",
      product?.repairCount ? "Repair history available" : "No repairs on record",
    ],
    seller: {
      name: "ReLoop Member",
      rating: 4.8,
      listings: 1,
    },
    lifecycle: [
      {
        date: product?.purchaseDate || "—",
        title: "Product Registered",
        description: "Added to ReLoop with a full digital passport.",
      },
      {
        date: new Date().toISOString().slice(0, 10),
        title: "Listed on Marketplace",
        description: "Owner submitted this product for resale.",
      },
    ],
    _dynamic: true,
  };
}

// Combines static demo listings with active customer-created listings.
export function getPublicMarketplaceItems(marketplaceProducts, marketplaceListings, products) {
  const activeDynamic = marketplaceListings
    .filter((listing) => listing.status === "Active")
    .map((listing) =>
      normalizeListing(
        listing,
        products.find((p) => p.id === listing.productId),
      ),
    );

  return [...activeDynamic, ...marketplaceProducts];
}
