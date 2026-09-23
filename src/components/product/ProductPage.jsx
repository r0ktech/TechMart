import {
  ArrowLeft,
  Check,
  Heart,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { products } from "../../data/products";
import { reviews } from "../../data/reviews";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { formatPrice } from "../../utils/helpers";
import PageFrame from "../common/PageFrame";

export default function ProductPage({ productId }) {
  const product = products.find((item) => item.id === productId) || products[0];
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const productReviews = reviews[product.id] || [];
  return (
    <PageFrame
      eyebrow={`${product.brand} / ${product.category}`}
      title={product.name}
    >
      <div className="product-detail">
        <div className="detail-image">
          <img src={product.images?.[0]} alt={product.name} />
        </div>
        <div className="detail-copy">
          <p className="brand-line">
            {product.brand}{" "}
            <span>
              <Check size={11} /> Verified seller
            </span>
          </p>
          <div className="rating">
            <Star size={14} fill="currentColor" /> <b>{product.rating}</b>{" "}
            <span>({product.reviewCount} reviews)</span>
          </div>
          <h2>{formatPrice(product.price)}</h2>
          <p className="detail-description">{product.description}</p>
          <div className="detail-meta">
            <span>
              <Truck size={16} /> Delivery across Nigeria
            </span>
            <span>
              <Check size={16} /> In stock · {product.stock} left
            </span>
          </div>
          <div className="detail-actions">
            <button className="primary" onClick={() => addItem(product)}>
              <ShoppingCart size={16} /> Add to cart
            </button>
            <button
              className={`save-product ${isInWishlist(product.id) ? "saved" : ""}`}
              onClick={() => toggleItem(product)}
            >
              <Heart
                size={17}
                fill={isInWishlist(product.id) ? "currentColor" : "none"}
              />{" "}
              Save
            </button>
          </div>
        </div>
      </div>
      <section className="feature-panel specifications">
        <p className="kicker">The details</p>
        <h2>What you’re getting</h2>
        <div className="spec-grid">
          {Object.entries(product.specifications || {})
            .slice(0, 8)
            .map(([key, value]) => (
              <div key={key}>
                <span>{key}</span>
                <strong>{value}</strong>
              </div>
            ))}
        </div>
      </section>
      <section className="feature-panel review-panel">
        <p className="kicker">From the community</p>
        <h2>
          Reviews <span>({productReviews.length})</span>
        </h2>
        {productReviews.slice(0, 3).map((review) => (
          <article key={review.id}>
            <div>
              <strong>{review.user}</strong>
              <span>
                {"★".repeat(review.rating)} ·{" "}
                {review.verified ? "Verified purchase" : "Customer review"}
              </span>
            </div>
            <p>{review.text}</p>
          </article>
        ))}
      </section>
      <a className="back-link detail-back" href="/">
        <ArrowLeft size={16} /> Keep browsing
      </a>
    </PageFrame>
  );
}
