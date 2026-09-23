import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import PageFrame from "../common/PageFrame";
import { useCart } from "../../contexts/CartContext";
import { formatPrice } from "../../utils/helpers";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, delivery, total } =
    useCart();
  return (
    <PageFrame eyebrow="Your selection" title="Shopping cart">
      <div className="feature-grid cart-page-grid">
        <section className="feature-panel">
          {items.length ? (
            items.map((item) => (
              <div
                className="page-cart-item"
                key={`${item.id}-${item.variantKey}`}
              >
                <img src={item.image} alt={item.name} />
                <div>
                  <p>{item.brand}</p>
                  <h2>{item.name}</h2>
                  <strong>{formatPrice(item.price)}</strong>
                  <div className="quantity">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.variantKey,
                          item.quantity - 1,
                        )
                      }
                      aria-label="Decrease quantity"
                    >
                      <Minus size={13} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.variantKey,
                          item.quantity + 1,
                        )
                      }
                      aria-label="Increase quantity"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
                <button
                  className="remove-item"
                  onClick={() => removeItem(item.id, item.variantKey)}
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          ) : (
            <div className="feature-empty">
              <ShoppingCart size={32} />
              <h2>Your cart is empty</h2>
              <p>
                Find something useful for your setup and it will appear here.
              </p>
              <a className="primary" href="/">
                Continue shopping <ArrowRight size={15} />
              </a>
            </div>
          )}
        </section>
        {items.length > 0 && (
          <aside className="feature-panel order-summary">
            <p className="kicker">Order summary</p>
            <div>
              <span>Subtotal</span>
              <b>{formatPrice(subtotal)}</b>
            </div>
            <div>
              <span>Delivery</span>
              <b>{delivery ? formatPrice(delivery) : "Free"}</b>
            </div>
            <hr />
            <div className="grand-total">
              <span>Total</span>
              <b>{formatPrice(total)}</b>
            </div>
            <a className="primary" href="/checkout">
              Proceed to checkout <ArrowRight size={15} />
            </a>
          </aside>
        )}
      </div>
    </PageFrame>
  );
}
