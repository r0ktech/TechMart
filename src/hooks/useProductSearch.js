import { useMemo, useState } from "react";
import { products } from "../data/products";

export function useProductSearch(initialCategory = "all") {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const results = useMemo(
    () =>
      products.filter((product) => {
        const haystack =
          `${product.name} ${product.brand} ${product.category} ${(product.tags || []).join(" ")}`.toLowerCase();
        return (
          (category === "all" || product.category === category) &&
          (!query.trim() || haystack.includes(query.trim().toLowerCase()))
        );
      }),
    [category, query],
  );
  return { query, setQuery, category, setCategory, results };
}
