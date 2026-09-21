import { useMemo, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Heart,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";
import { products } from "./data/products";
import { useCart } from "./contexts/CartContext";
import { useWishlist } from "./contexts/WishlistContext";
import { formatPrice } from "./utils/helpers";
import "./App.css";

const categories = [
  [
    "laptops",
    "Laptops",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80",
  ],
  [
    "smartphones",
    "Phones",
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=500&q=80",
  ],
  [
    "tablets",
    "Tablets",
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500&q=80",
  ],
  [
    "monitors",
    "Monitors",
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80",
  ],
  [
    "accessories",
    "Accessories",
    "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=500&q=80",
  ],
  [
    "gaming",
    "Gaming",
    "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=500&q=80",
  ],
];
const fallback = categories[0][2];
const productImages = {
  laptops: categories[0][2],
  smartphones: categories[1][2],
  tablets: categories[2][2],
  monitors: categories[3][2],
  accessories:
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=700&q=80",
  gaming: categories[5][2],
  keyboards:
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80",
  mice: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=700&q=80",
  headphones:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
  storage:
    "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=700&q=80",
  ram: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=700&q=80",
  "graphics-cards":
    "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=700&q=80",
  chargers:
    "https://images.unsplash.com/photo-1609592424455-0f7c4c0d8c91?auto=format&fit=crop&w=700&q=80",
};

const getProductImage = (product) =>
  product.images?.[0]?.startsWith("http")
    ? product.images[0]
    : productImages[product.category] || fallback;

const pickDiverseProducts = (source, limit) => {
  const picked = [];
  const seenCategories = new Set();
  for (const product of source) {
    if (!seenCategories.has(product.category)) {
      picked.push(product);
      seenCategories.add(product.category);
    }
    if (picked.length === limit) return picked;
  }
  return [
    ...picked,
    ...source.filter((product) => !picked.includes(product)),
  ].slice(0, limit);
};

function ProductCard({ product, onAdd }) {
  const { toggleItem, isInWishlist } = useWishlist();
  const saved = isInWishlist(product.id);
  return (
    <article className="product-card">
      <div className="product-image">
        <span className="badge">
          {product.badge || `${product.discount}% OFF`}
        </span>
        <button
          className={`heart ${saved ? "saved" : ""}`}
          onClick={() => toggleItem(product)}
          aria-label="Toggle wishlist"
        >
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
        </button>
        <img src={getProductImage(product)} alt={product.name} loading="lazy" />
      </div>
      <div className="product-body">
        <p className="brand-line">
          {product.brand}{" "}
          <span>
            <Check size={11} /> Verified
          </span>
        </p>
        <h3>{product.name}</h3>
        <p className="spec">{product.shortDescription}</p>
        <div className="rating">
          <Star size={13} fill="currentColor" /> <b>{product.rating}</b>{" "}
          <span>({product.reviewCount})</span>
        </div>
        <div className="prices">
          <b>{formatPrice(product.price)}</b>
          {product.originalPrice > product.price && (
            <del>{formatPrice(product.originalPrice)}</del>
          )}
        </div>
        <button className="add" onClick={() => onAdd(product)}>
          <ShoppingCart size={15} /> Add to cart
        </button>
      </div>
    </article>
  );
}

function App() {
  const { addItem, cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [toast, setToast] = useState("");
  const [menu, setMenu] = useState(false);
  const visible = useMemo(
    () =>
      products.filter((product) => {
        const text =
          `${product.name} ${product.brand} ${product.category} ${(product.tags || []).join(" ")}`.toLowerCase();
        return (
          (category === "all" || product.category === category) &&
          (!query || text.includes(query.toLowerCase()))
        );
      }),
    [category, query],
  );
  const trending = pickDiverseProducts(
    visible.filter((product) => product.trending),
    8,
  );
  const deals = pickDiverseProducts(
    products.filter((product) => product.deal || product.discount >= 10),
    4,
  );
  const add = (product) => {
    addItem(product);
    setToast(`${product.name} added to cart`);
    window.setTimeout(() => setToast(""), 2200);
  };
  const selectCategory = (value) => {
    setCategory(value);
    document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="announcement">
          <Zap size={13} /> Free delivery on orders over ₦500,000{" "}
          <span>
            Shop the tech you love <ArrowRight size={13} />
          </span>
        </div>
        <header>
          <div className="topbar container">
            <button
              className="menu"
              onClick={() => setMenu(!menu)}
              aria-label="Toggle menu"
            >
              {menu ? <X /> : <Menu />}
            </button>
            <Link className="logo" to="/">
              <span>
                <Sparkles size={16} />
              </span>
              tech<b>mart</b>
            </Link>
            <form
              className="search"
              onSubmit={(event) => event.preventDefault()}
            >
              <Search size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search laptops, phones, accessories..."
                aria-label="Search products"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
              <button className="search-submit">Search</button>
            </form>
            <div className="header-actions">
              <div className="delivery">
                <MapPin size={17} /> Deliver to <b>Nigeria</b>
              </div>
              <span className="account">
                Hi, <b>Sign in</b>
              </span>
              <button className="header-icon" aria-label="Wishlist">
                <Heart size={20} />
                <i>{wishlistCount}</i>
              </button>
              <button className="header-icon" aria-label="Cart">
                <ShoppingCart size={20} />
                <i>{cartCount}</i>
              </button>
            </div>
          </div>
          <nav className={menu ? "nav open" : "nav"}>
            <div className="container nav-inner">
              <button
                className={category === "all" ? "active" : ""}
                onClick={() => selectCategory("all")}
              >
                All Products
              </button>
              {categories.map(([id, name]) => (
                <button
                  key={id}
                  className={category === id ? "active" : ""}
                  onClick={() => selectCategory(id)}
                >
                  {name}
                </button>
              ))}
              <button
                className="deal-link"
                onClick={() =>
                  document
                    .getElementById("deals")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Zap size={14} /> Deals
              </button>
            </div>
          </nav>
        </header>
        <main>
          <section className="hero container">
            <div>
              <p className="kicker">
                <Sparkles size={14} /> Curated tech. Better living.
              </p>
              <h1>
                Power up your
                <br />
                <em>everyday.</em>
              </h1>
              <p className="hero-copy">
                Premium laptops, smartphones and accessories chosen for the way
                you work, play and connect.
              </p>
              <div className="hero-actions">
                <button
                  className="primary"
                  onClick={() => selectCategory("laptops")}
                >
                  Shop laptops <ArrowRight size={16} />
                </button>
                <button
                  className="text-button"
                  onClick={() =>
                    document
                      .getElementById("deals")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore deals <ArrowRight size={16} />
                </button>
              </div>
              <p className="proof">
                Trusted by <b>10,000+ tech shoppers</b> across Nigeria
              </p>
            </div>
            <div className="hero-image">
              <div className="label">
                <small>New arrival</small>
                <b>Pixel 9 Pro</b>
              </div>
              <img src={productImages.smartphones} alt="Premium smartphone" />
            </div>
          </section>
          <section className="container categories">
            <div className="section-head">
              <div>
                <p className="kicker">Find your fit</p>
                <h2>Shop by category</h2>
              </div>
              <button className="text-button">
                View all <ArrowRight size={15} />
              </button>
            </div>
            <div className="category-grid">
              {categories.map(([id, name, image]) => (
                <button
                  className="category-card"
                  key={id}
                  onClick={() => selectCategory(id)}
                >
                  <img src={image} alt="" />
                  <b>{name}</b>
                </button>
              ))}
            </div>
          </section>
          <section className="deals" id="deals">
            <div className="container">
              <div className="section-head light">
                <div>
                  <p className="kicker">Limited-time offers</p>
                  <h2>
                    Flash deals <span className="dot" />
                  </h2>
                </div>
                <strong className="timer">Ends in 04 : 32 : 18</strong>
              </div>
              <div className="product-grid">
                {deals.map((product) => (
                  <ProductCard key={product.id} product={product} onAdd={add} />
                ))}
              </div>
            </div>
          </section>
          <section className="container discover" id="discover">
            <div className="section-head">
              <div>
                <p className="kicker">Handpicked for you</p>
                <h2>
                  {query
                    ? `Results for “${query}”`
                    : category === "all"
                      ? "Trending right now"
                      : `Best ${category}`}
                </h2>
              </div>
              <button className="text-button">
                See all <ArrowRight size={15} />
              </button>
            </div>
            {trending.length ? (
              <div className="product-grid">
                {trending.map((product) => (
                  <ProductCard key={product.id} product={product} onAdd={add} />
                ))}
              </div>
            ) : (
              <div className="empty">
                <Search />
                <h3>No products found</h3>
                <p>Try another search or category.</p>
                <button
                  className="primary"
                  onClick={() => {
                    setQuery("");
                    setCategory("all");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>
          <section className="trust">
            <div className="container trust-grid">
              <div>
                <Truck />
                <b>Fast delivery</b>
                <span>Across Nigeria</span>
              </div>
              <div>
                <ShieldCheck />
                <b>Secure payments</b>
                <span>Protected checkout</span>
              </div>
              <div>
                <Check />
                <b>Verified products</b>
                <span>Quality checked</span>
              </div>
              <div>
                <Sparkles />
                <b>Human support</b>
                <span>Real help, always</span>
              </div>
            </div>
          </section>
          <section className="newsletter container">
            <div>
              <p className="kicker">The good stuff, occasionally</p>
              <h2>
                Get the best tech
                <br />
                <em>deals first.</em>
              </h2>
            </div>
            <form onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="email">Your email address</label>
              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
                <button className="primary">
                  Subscribe <ArrowRight size={15} />
                </button>
              </div>
              <small>Product drops, buying guides and offers. No noise.</small>
            </form>
          </section>
        </main>
        <footer>
          <div className="container footer">
            <Link className="logo" to="/">
              <span>
                <Sparkles size={16} />
              </span>
              tech<b>mart</b>
            </Link>
            <p>Tech that moves you forward.</p>
            <small>© 2026 TechMart Nigeria</small>
          </div>
        </footer>
        {toast && (
          <div className="toast">
            <Check size={16} /> {toast}
          </div>
        )}
        <nav className="mobile-nav">
          <button className="active">
            <Sparkles />
            <span>Home</span>
          </button>
          <button
            onClick={() =>
              document.getElementById("discover")?.scrollIntoView()
            }
          >
            <Search />
            <span>Explore</span>
          </button>
          <button>
            <Heart />
            <span>Wishlist</span>
          </button>
          <button>
            <ShoppingCart />
            <span>Cart {cartCount > 0 && `(${cartCount})`}</span>
          </button>
        </nav>
      </div>
    </BrowserRouter>
  );
}
export default App;
