import { useState } from "react";
import { ArrowRight, Check, CreditCard, MapPin, Truck } from "lucide-react";
import PageFrame from "../common/PageFrame";
import { useCart } from "../../contexts/CartContext";
import { formatPrice, generateOrderId } from "../../utils/helpers";

export default function CheckoutPage() {
  const { items, subtotal, delivery, total, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [method, setMethod] = useState("Card");
  if (placed)
    return (
      <PageFrame eyebrow="Order confirmed" title="You’re all set.">
        <div className="feature-panel success-panel">
          <div className="success-icon">
            <Check />
          </div>
          <h2>Thanks for shopping with TechMart.</h2>
          <p>
            Your order <strong>{generateOrderId()}</strong> is confirmed. We’ll
            send delivery updates to your email and phone.
          </p>
          <a className="primary" href="/">
            Continue shopping <ArrowRight size={15} />
          </a>
        </div>
      </PageFrame>
    );
  if (!items.length)
    return (
      <PageFrame eyebrow="Checkout" title="Nothing to check out yet.">
        <div className="feature-empty feature-panel">
          <p>Add a product to your cart before starting checkout.</p>
          <a className="primary" href="/">
            Browse products <ArrowRight size={15} />
          </a>
        </div>
      </PageFrame>
    );
  return (
    <PageFrame eyebrow="Secure checkout" title="Complete your order">
      <div className="feature-grid checkout-grid">
        <form
          className="feature-panel checkout-form"
          onSubmit={(event) => {
            event.preventDefault();
            clearCart();
            setPlaced(true);
          }}
        >
          <div className="form-section">
            <h2>
              <MapPin size={18} /> Delivery details
            </h2>
            <div className="form-row">
              <label>
                Full name
                <input required placeholder="Raphael Okoro" />
              </label>
              <label>
                Phone number
                <input required type="tel" placeholder="080 0000 0000" />
              </label>
            </div>
            <label>
              Email address
              <input required type="email" placeholder="you@example.com" />
            </label>
            <label>
              Address
              <input required placeholder="15 Admiralty Way, Lekki" />
            </label>
            <div className="form-row">
              <label>
                State
                <input required placeholder="Lagos" />
              </label>
              <label>
                City
                <input required placeholder="Lekki" />
              </label>
            </div>
          </div>
          <div className="form-section">
            <h2>
              <CreditCard size={18} /> Payment method
            </h2>
            <div className="payment-options">
              {["Card", "Bank Transfer", "Cash on Delivery"].map((option) => (
                <label
                  className={method === option ? "selected" : ""}
                  key={option}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={option}
                    checked={method === option}
                    onChange={() => setMethod(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          <button className="primary place-order" type="submit">
            Place order <ArrowRight size={16} />
          </button>
        </form>
        <aside className="feature-panel order-summary">
          <p className="kicker">Your order</p>
          {items.map((item) => (
            <div className="summary-product" key={item.id}>
              <span>
                {item.quantity} × {item.name}
              </span>
              <b>{formatPrice(item.price * item.quantity)}</b>
            </div>
          ))}
          <hr />
          <div>
            <span>Subtotal</span>
            <b>{formatPrice(subtotal)}</b>
          </div>
          <div>
            <span>
              <Truck size={14} /> Delivery
            </span>
            <b>{delivery ? formatPrice(delivery) : "Free"}</b>
          </div>
          <div className="grand-total">
            <span>Total</span>
            <b>{formatPrice(total)}</b>
          </div>
        </aside>
      </div>
    </PageFrame>
  );
}
