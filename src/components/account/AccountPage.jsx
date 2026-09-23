import { Heart, Package, Settings, Star, Truck } from "lucide-react";
import PageFrame from "../common/PageFrame";
import { useWishlist } from "../../contexts/WishlistContext";
import { orders } from "../../data/orders";
import { formatPrice } from "../../utils/helpers";

export default function AccountPage() {
  const { items: wishlistItems } = useWishlist();
  return (
    <PageFrame eyebrow="Your TechMart" title="Welcome back, Raphael">
      <div className="account-stats">
        <div>
          <Package />
          <strong>{orders.length}</strong>
          <span>Orders</span>
        </div>
        <div>
          <Heart />
          <strong>{wishlistItems.length}</strong>
          <span>Wishlist items</span>
        </div>
        <div>
          <Star />
          <strong>12</strong>
          <span>Reviews</span>
        </div>
        <div>
          <Truck />
          <strong>1</strong>
          <span>On the way</span>
        </div>
      </div>
      <div className="feature-grid account-grid">
        <section className="feature-panel">
          <div className="panel-heading">
            <div>
              <p className="kicker">Recent activity</p>
              <h2>Your orders</h2>
            </div>
            <a href="/account">View all</a>
          </div>
          {orders.slice(0, 3).map((order) => (
            <div className="order-row" key={order.id}>
              <div>
                <strong>#{order.id}</strong>
                <span>{order.items.map((item) => item.name).join(", ")}</span>
              </div>
              <div>
                <b>{formatPrice(order.total)}</b>
                <em className={`status ${order.status}`}>{order.status}</em>
              </div>
            </div>
          ))}
        </section>
        <aside className="feature-panel account-menu">
          <a className="active" href="/account">
            <Package size={17} /> Overview
          </a>
          <a href="/account">
            <Heart size={17} /> Wishlist
          </a>
          <a href="/account">
            <Truck size={17} /> Track delivery
          </a>
          <a href="/account">
            <Settings size={17} /> Settings
          </a>
        </aside>
      </div>
    </PageFrame>
  );
}
