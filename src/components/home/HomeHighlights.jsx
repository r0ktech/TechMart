import {
  ArrowRight,
  Compass,
  PackageCheck,
  SlidersHorizontal,
} from "lucide-react";

export default function HomeHighlights() {
  return (
    <section className="home-highlights container">
      <div>
        <Compass />
        <strong>Find your fit</strong>
        <span>Curated by how you use tech.</span>
      </div>
      <div>
        <PackageCheck />
        <strong>Shop with confidence</strong>
        <span>Verified products and sellers.</span>
      </div>
      <div>
        <SlidersHorizontal />
        <strong>Build your setup</strong>
        <span>Pair products that work together.</span>
      </div>
      <a href="#discover">
        Explore the collection <ArrowRight size={15} />
      </a>
    </section>
  );
}
