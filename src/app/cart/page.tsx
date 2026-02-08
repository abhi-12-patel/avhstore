"use client";

import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';
import { useState } from 'react';
import ImageWithFallback from "@/components/ui/ImageWithFallback";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useStore();
  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const WHATSAPP_NUMBER = '916351359801';
  const GST_RATE = 0.03;
  const STORE_INFO = {
    name: 'AVH STORE',
    address: 'RAJOT',
    gstin: 'RTOUFGV56790',
    phone: '9016457163',
    bank: 'HDFC68965',
  };

  const total = getCartTotal();
  const shipping = total >= 1000 ? 0 : 50;
  const gst = total * GST_RATE;
  const finalTotal = total + shipping + gst;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    toast.success('Removed from cart');
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      toast.success('Removed from cart');
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const buildInvoiceMessage = () => {
    const date = new Date().toLocaleDateString('en-IN');
    const lines = cart.length
      ? cart.map(
          (item) =>
            `- ${item.product.name} (${item.product.id}) (x${item.quantity}) - ₹${(
              item.product.price * item.quantity
            ).toLocaleString('en-IN')}`,
        )
      : ['- (No items)'];
    return [
      `INVOICE: ${STORE_INFO.name}`,
      `Customer: ${form.fullName}`,
      `Date: ${date}`,
      '',
      'Items:',
      ...lines,
      '------------------------',
      `Subtotal: ₹${total.toLocaleString('en-IN')}`,
      `GST (3%): ₹${gst.toLocaleString('en-IN')}`,
      `Shipping: ₹${shipping.toLocaleString('en-IN')}`,
      `GRAND TOTAL: ₹${finalTotal.toLocaleString('en-IN')}`,
      '------------------------',
      `Store GSTIN: ${STORE_INFO.gstin}`,
      `Phone: ${form.phone}`,
      `Address: ${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
      '',
      `Thank you for shopping with ${STORE_INFO.name}!`,
    ].join('\n');
  };

  const openInvoicePrint = () => {
    const date = new Date().toLocaleDateString('en-IN');
    const itemsHtml = cart
      .map(
        (item) => `
          <tr>
            <td>${item.product.name}</td>
            <td>${item.product.id}</td>
            <td>${item.quantity}</td>
            <td>${formatPrice(item.product.price)}</td>
            <td>${formatPrice(item.product.price * item.quantity)}</td>
          </tr>
        `,
      )
      .join('');

    const html = `
      <html>
        <head>
          <title>Invoice - ${STORE_INFO.name}</title>
          <style>
            * { box-sizing: border-box; }
            body { font-family: "Segoe UI", Arial, sans-serif; padding: 32px; color: #0b1f24; background: #eef3f6; }
            h1, h2, h3 { margin: 0; }
            .invoice-wrap { max-width: 920px; margin: 0 auto; border-radius: 18px; overflow: hidden; background: #fff; box-shadow: 0 16px 40px rgba(10, 31, 36, 0.14); }
            .header {
              display: grid;
              grid-template-columns: 1fr auto;
              gap: 16px;
              padding: 22px 26px;
              background: linear-gradient(135deg, #0b2d3a 0%, #0f4b5a 55%, #0f766e 100%);
              color: #fff;
            }
            .title { font-size: 28px; font-weight: 700; margin-bottom: 8px; letter-spacing: 0.5px; }
            .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 24px; font-size: 12px; color: #e0f2f1; }
            .brand { display: flex; align-items: center; gap: 12px; justify-content: flex-end; }
            .logo {
              width: 52px;
              height: 52px;
              border-radius: 12px;
              background: #f6c453;
              color: #0b2d3a;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 800;
              letter-spacing: 1px;
              box-shadow: inset 0 0 0 2px rgba(11, 45, 58, 0.2);
            }
            .brand-name { font-size: 16px; font-weight: 700; text-align: right; color: #fef3c7; }
            .section { padding: 18px 26px; }
            .section-title { font-size: 12px; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; color: #0f4b5a; letter-spacing: 0.6px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 12px; }
            .info-box { border: 1px solid #dbe7ec; padding: 12px; border-radius: 10px; background: #f7fbfc; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 12px; }
            thead th { background: #0f4b5a; color: #fff; padding: 9px; text-align: left; }
            tbody td { border: 1px solid #e1ecf0; padding: 8px; }
            tbody tr:nth-child(even) td { background: #f6fafb; }
            .totals {
              margin-top: 12px;
              margin-left: auto;
              width: 260px;
              border: 1px solid #dbe7ec;
              font-size: 12px;
              border-radius: 10px;
              overflow: hidden;
              background: #fff;
            }
            .totals div { display: flex; justify-content: space-between; padding: 9px 12px; border-bottom: 1px solid #e1ecf0; }
            .totals div:last-child { border-bottom: none; font-weight: 700; background: #fef3c7; color: #0b2d3a; }
            .footer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 11px; }
            .footer-box { border: 1px solid #dbe7ec; padding: 12px; border-radius: 10px; background: #f9fcfd; }
            .signature { text-align: right; margin-top: 16px; }
            .signature-line { width: 180px; height: 2px; background: #0f4b5a; margin: 24px 0 6px auto; border-radius: 999px; }
            .footer-bar {
              margin-top: 18px;
              background: #0b2d3a;
              color: #e0f2f1;
              padding: 10px 16px;
              display: flex;
              justify-content: space-between;
              font-size: 11px;
            }
          </style>
        </head>
        <body>
          <div class="invoice-wrap">
            <div class="header">
              <div>
                <div class="title">Invoice Service</div>
                <div class="meta-grid">
                  <div>Invoice Number: INV-${Date.now().toString().slice(-6)}</div>
                  <div>Invoice Date: ${date}</div>
                  <div>GSTIN: ${STORE_INFO.gstin}</div>
                  <div>Phone: ${STORE_INFO.phone}</div>
                </div>
              </div>
              <div class="brand">
                <div class="logo">AVH</div>
                <div class="brand-name">${STORE_INFO.name}</div>
              </div>
            </div>

            <div class="section">
              <div class="info-grid">
                <div class="info-box">
                  <div class="section-title">Billing Information</div>
                  <div>Company Name: ${STORE_INFO.name}</div>
                  <div>Address: ${STORE_INFO.address}</div>
                  <div>Phone: ${STORE_INFO.phone}</div>
                  <div>Bank: ${STORE_INFO.bank}</div>
                </div>
                <div class="info-box">
                  <div class="section-title">Bill To</div>
                  <div>Customer Name: ${form.fullName}</div>
                  <div>Address: ${form.address}, ${form.city}</div>
                  <div>State: ${form.state} - ${form.pincode}</div>
                  <div>Phone: ${form.phone}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Service Details</div>
              <table>
                <thead>
                  <tr>
                    <th>Item Description</th>
                    <th>SKU</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
              <div class="totals">
                <div><span>Subtotal</span><span>${formatPrice(total)}</span></div>
                <div><span>GST (3%)</span><span>${formatPrice(gst)}</span></div>
                <div><span>Shipping</span><span>${formatPrice(shipping)}</span></div>
                <div><span>Grand Total</span><span>${formatPrice(finalTotal)}</span></div>
              </div>
            </div>

            <div class="section">
              <div class="footer-grid">
                <div class="footer-box">
                  <div class="section-title">Billing Information</div>
                  <div>Payment Method: Cash/UPI</div>
                  <div>Due Date: ${date}</div>
                  <div>Account: ${STORE_INFO.bank}</div>
                </div>
                <div class="footer-box">
                  <div class="section-title">Terms and Conditions</div>
                  <div>• Payment is due on receipt of this invoice.</div>
                  <div>• Please contact for any questions.</div>
                  <div>• Thank you for your business.</div>
                </div>
              </div>
              <div class="signature">
                <div class="signature-line"></div>
                <div>${STORE_INFO.name}</div>
              </div>
            </div>

            <div class="footer-bar">
              <div>${STORE_INFO.phone}</div>
              <div>${STORE_INFO.name}</div>
              <div>${STORE_INFO.address}</div>
            </div>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.fullName || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
      toast.error('Please fill in all address fields.');
      return;
    }

    const message = buildInvoiceMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    openInvoicePrint();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl text-foreground text-center mb-12">
            Shopping Cart
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-20 max-w-md mx-auto">
              <ShoppingBag size={64} className="mx-auto mb-6 text-muted-foreground/30" />
              <h2 className="font-display text-2xl text-foreground mb-4">
                Your cart is empty
              </h2>
              <p className="font-body text-muted-foreground mb-8">
                Discover our exquisite collection of fine jewelry and find pieces that speak to your soul.
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="border-b border-border pb-4 mb-6 hidden md:grid grid-cols-12 gap-4">
                  <div className="col-span-6 font-body text-sm text-muted-foreground uppercase tracking-wider">
                    Product
                  </div>
                  <div className="col-span-2 font-body text-sm text-muted-foreground uppercase tracking-wider text-center">
                    Quantity
                  </div>
                  <div className="col-span-2 font-body text-sm text-muted-foreground uppercase tracking-wider text-right">
                    Price
                  </div>
                  <div className="col-span-2 font-body text-sm text-muted-foreground uppercase tracking-wider text-right">
                    Total
                  </div>
                </div>

                <div className="space-y-6">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="border-b border-border pb-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                    >
                      {/* Product */}
                      <div className="md:col-span-6 flex gap-4">
                        <Link href={`/product/${item.product.id}`} className="shrink-0">
                          <div className="w-24 h-24 bg-cream overflow-hidden">
                            <ImageWithFallback
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>
                        <div className="flex-1">
                          <Link href={`/product/${item.product.id}`}>
                            <h3 className="font-display text-lg text-foreground hover:text-primary transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="font-body text-sm text-muted-foreground">
                            {item.product.material.charAt(0).toUpperCase() + item.product.material.slice(1).replace('-', ' ')}
                          </p>
                          {item.size && (
                            <p className="font-body text-sm text-muted-foreground">
                              Size: {item.size}
                            </p>
                          )}
                          <button
                            onClick={() => handleRemove(item.product.id)}
                            className="md:hidden mt-2 font-body text-sm text-destructive hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex justify-center">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="p-2 hover:bg-secondary transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center font-body text-sm">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="p-2 hover:bg-secondary transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="hidden md:block md:col-span-2 text-right font-body text-foreground">
                        {formatPrice(item.product.price)}
                      </div>

                      {/* Total */}
                      <div className="hidden md:flex md:col-span-2 items-center justify-end gap-4">
                        <span className="font-body text-foreground">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => handleRemove(item.product.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      {/* Mobile price */}
                      <div className="md:hidden flex justify-between font-body text-foreground">
                        <span className="text-muted-foreground">Total:</span>
                        <span>{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <Link
                    href="/collections"
                    className="font-body text-sm text-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <ArrowRight size={16} className="rotate-180" />
                    Continue Shopping
                  </Link>
                  <button
                    onClick={() => {
                      clearCart();
                      toast.success('Cart cleared');
                    }}
                    className="font-body text-sm text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card p-8 luxury-shadow">
                  <h2 className="font-display text-xl text-foreground mb-6">Order Summary</h2>

                  <div className="space-y-4 pb-6 border-b border-border">
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-muted-foreground">GST (3%)</span>
                      <span className="text-foreground">{formatPrice(gst)}</span>
                    </div>
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-foreground">
                        {shipping === 0 ? 'Free' : formatPrice(shipping)}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="font-body text-xs text-primary">
                        Add {formatPrice(1000 - total)} more for free shipping
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between py-6 border-b border-border">
                    <span className="font-display text-lg text-foreground">Total</span>
                    <span className="font-display text-xl text-foreground">{formatPrice(finalTotal)}</span>
                  </div>

                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full mt-6 py-4 bg-primary text-primary-foreground font-body text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
                  >
                    Proceed to Checkout
                  </button>

                  {showCheckout && (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <div>
                        <label className="font-body text-xs text-foreground">Full Name</label>
                        <input
                          type="text"
                          className="w-full mt-2 px-3 py-2 bg-secondary rounded-sm text-sm"
                          value={form.fullName}
                          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="font-body text-xs text-foreground">Phone</label>
                        <input
                          type="tel"
                          className="w-full mt-2 px-3 py-2 bg-secondary rounded-sm text-sm"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="font-body text-xs text-foreground">Address</label>
                        <input
                          type="text"
                          className="w-full mt-2 px-3 py-2 bg-secondary rounded-sm text-sm"
                          value={form.address}
                          onChange={(e) => setForm({ ...form, address: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-body text-xs text-foreground">City</label>
                          <input
                            type="text"
                            className="w-full mt-2 px-3 py-2 bg-secondary rounded-sm text-sm"
                            value={form.city}
                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="font-body text-xs text-foreground">State</label>
                          <input
                            type="text"
                            className="w-full mt-2 px-3 py-2 bg-secondary rounded-sm text-sm"
                            value={form.state}
                            onChange={(e) => setForm({ ...form, state: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="font-body text-xs text-foreground">Pincode</label>
                        <input
                          type="text"
                          className="w-full mt-2 px-3 py-2 bg-secondary rounded-sm text-sm"
                          value={form.pincode}
                          onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 bg-foreground text-background font-body text-sm uppercase tracking-wider hover:bg-foreground/90 transition-colors"
                      >
                        Send Invoice on WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!form.fullName || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
                            toast.error('Please fill in all address fields.');
                            return;
                          }
                          openInvoicePrint();
                        }}
                        className="w-full py-3 border border-border font-body text-sm uppercase tracking-wider hover:bg-secondary transition-colors"
                      >
                        Download Invoice PDF
                      </button>
                    </form>
                  )}

                  {/* Trust Badges */}
                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="flex justify-center gap-4 opacity-60">
                      <img src="/placeholder.svg" alt="Visa" className="h-6" />
                      <img src="/placeholder.svg" alt="Mastercard" className="h-6" />
                      <img src="/placeholder.svg" alt="Amex" className="h-6" />
                      <img src="/placeholder.svg" alt="PayPal" className="h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
