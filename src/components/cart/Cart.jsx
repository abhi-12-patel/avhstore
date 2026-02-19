"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Download, Send } from "lucide-react";
import ImageWithFallback from "../ImageWithFallback";

const WHATSAPP_NUMBER = "919016457163";
const CHECKOUT_FIELDS = [
  { key: "fullName", label: "Full Name", type: "text", autoComplete: "name" },
  { key: "phone", label: "Phone Number", type: "tel", autoComplete: "tel" },
  { key: "address", label: "Address", type: "text", autoComplete: "street-address" },
  { key: "city", label: "City", type: "text", autoComplete: "address-level2" },
  { key: "state", label: "State", type: "text", autoComplete: "address-level1" },
  { key: "pincode", label: "Pincode", type: "text", autoComplete: "postal-code" },
];

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useStore();
console.log(cart,"cartcart")
  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const STORE_INFO = {
    name: "AVH STORE",
    address: "RAJOT",
    gstin: "RTOUFGV56790",
    phone: "9016457163",
    email: "avhstore@example.com",
  };

  /* ---------------- SAFE CART ---------------- */
  const safeCart = Array.isArray(cart) ? cart : [];

  const normalizedCart = safeCart.map((item) => {
    const product = item?.product ?? item;
    return {
      id: product?.id ?? item?.id,
      title: product?.title ?? product?.name ?? item?.title ?? "Product",
      image:
        product?.image ??
        product?.imageUrl ??
        product?.images?.[0] ??
        item?.image,
      price: parseFloat(product?.price ?? item?.price) || 0,
      quantity: Math.max(1, parseInt(item?.quantity) || 1),
      size: item?.size,
    };
  });

  /* ---------------- CALCULATIONS ---------------- */
  const subtotal = normalizedCart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.03;
  const shipping = subtotal > 0 && subtotal < 1000 ? 50 : 0;
  const finalTotal = subtotal + gst + shipping;

  const round = (num) => Math.round(num);
  const subtotalRounded = round(subtotal);
  const gstRounded = round(gst);
  const finalTotalRounded = round(finalTotal);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  /* ---------------- GENERATE INVOICE HTML ---------------- */
  const generateInvoiceHTML = () => {
    const invoiceNumber = `INV-${Date.now().toString().slice(-8)}`;
    const date = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const itemsHTML = normalizedCart
      .map((item, index) => {
        const itemTotal = item.price * item.quantity;
        return `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">${index + 1}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">
              <div style="font-weight: 600; color: #1a202c;">${item.title}</div>
              ${item.size ? `<div style="font-size: 13px; color: #718096;">Size: ${item.size}</div>` : ''}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.quantity}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right;">₹${Math.round(item.price)}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 600;">₹${Math.round(itemTotal)}</td>
          </tr>
        `;
      })
      .join("");

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Invoice - ${STORE_INFO.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f7fafc;
            padding: 40px 20px;
            color: #1a202c;
          }
          
          .invoice-container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          
          .invoice-header {
            background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
            color: white;
            padding: 32px 40px;
          }
          
          .header-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
          }
          
          .store-name {
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
          }
          
          .invoice-badge {
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 16px;
            border-radius: 40px;
            font-size: 14px;
            font-weight: 500;
            backdrop-filter: blur(5px);
          }
          
          .store-details {
            display: flex;
            gap: 32px;
            font-size: 14px;
            color: #e2e8f0;
          }
          
          .invoice-meta {
            display: flex;
            justify-content: space-between;
            margin-top: 24px;
            padding-top: 24px;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .meta-box {
            background: rgba(255, 255, 255, 0.1);
            padding: 12px 20px;
            border-radius: 8px;
          }
          
          .meta-label {
            font-size: 12px;
            color: #a0aec0;
            margin-bottom: 4px;
          }
          
          .meta-value {
            font-size: 16px;
            font-weight: 600;
          }
          
          .customer-section {
            padding: 32px 40px;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .section-title {
            font-size: 16px;
            font-weight: 600;
            color: #4a5568;
            margin-bottom: 16px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .customer-details {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          
          .detail-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          
          .detail-label {
            font-size: 12px;
            color: #718096;
            font-weight: 500;
          }
          
          .detail-value {
            font-size: 15px;
            font-weight: 500;
            color: #1a202c;
          }
          
          .items-section {
            padding: 32px 40px;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
          }
          
          th {
            background: #f7fafc;
            padding: 12px;
            font-size: 14px;
            font-weight: 600;
            color: #4a5568;
            text-align: left;
            border-bottom: 2px solid #e2e8f0;
          }
          
          th:first-child { border-radius: 8px 0 0 0; }
          th:last-child { border-radius: 0 8px 0 0; }
          
          .summary-section {
            padding: 32px 40px;
            background: #f8fafc;
            border-top: 2px solid #e2e8f0;
          }
          
          .summary-grid {
            max-width: 400px;
            margin-left: auto;
          }
          
          .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px dashed #cbd5e0;
          }
          
          .summary-row.total {
            border-bottom: none;
            padding-top: 16px;
            margin-top: 8px;
            border-top: 2px solid #1a202c;
            font-size: 18px;
            font-weight: 700;
            color: #1a202c;
          }
          
          .summary-label {
            color: #4a5568;
            font-weight: 500;
          }
          
          .summary-amount {
            font-weight: 600;
          }
          
          .invoice-footer {
            padding: 24px 40px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
            color: #718096;
            font-size: 13px;
          }
          
          @media print {
            body { background: white; padding: 0; }
            .invoice-container { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="invoice-header">
            <div class="header-top">
              <span class="store-name">${STORE_INFO.name}</span>
              <span class="invoice-badge">TAX INVOICE</span>
            </div>
            
            <div class="store-details">
              <span>📍 ${STORE_INFO.address}</span>
              <span>📞 ${STORE_INFO.phone}</span>
              <span>📧 ${STORE_INFO.email}</span>
              <span>🔖 GSTIN: ${STORE_INFO.gstin}</span>
            </div>
            
            <div class="invoice-meta">
              <div class="meta-box">
                <div class="meta-label">Invoice Number</div>
                <div class="meta-value">${invoiceNumber}</div>
              </div>
              <div class="meta-box">
                <div class="meta-label">Invoice Date</div>
                <div class="meta-value">${date}</div>
              </div>
              <div class="meta-box">
                <div class="meta-label">Payment Terms</div>
                <div class="meta-value">Due on Receipt</div>
              </div>
            </div>
          </div>
          
          <div class="customer-section">
            <div class="section-title">Bill To:</div>
            <div class="customer-details">
              <div class="detail-item">
                <span class="detail-label">Customer Name</span>
                <span class="detail-value">${form.fullName || "N/A"}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Phone Number</span>
                <span class="detail-value">${form.phone || "N/A"}</span>
              </div>
              <div class="detail-item" style="grid-column: span 2;">
                <span class="detail-label">Shipping Address</span>
                <span class="detail-value">${form.address || "N/A"}, ${form.city || "N/A"}, ${form.state || "N/A"} - ${form.pincode || "N/A"}</span>
              </div>
            </div>
          </div>
          
          <div class="items-section">
            <div class="section-title">Order Details</div>
            <table>
              <thead>
                <tr>
                  <th style="width: 50px;">#</th>
                  <th>Product</th>
                  <th style="width: 80px; text-align: center;">Qty</th>
                  <th style="width: 100px; text-align: right;">Unit Price</th>
                  <th style="width: 120px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>
          </div>
          
          <div class="summary-section">
            <div class="summary-grid">
              <div class="summary-row">
                <span class="summary-label">Subtotal:</span>
                <span class="summary-amount">₹${subtotalRounded}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">GST (3%):</span>
                <span class="summary-amount">₹${gstRounded}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">Shipping:</span>
                <span class="summary-amount">${shipping === 0 ? 'Free' : '₹' + shipping}</span>
              </div>
              <div class="summary-row total">
                <span class="summary-label">Grand Total:</span>
                <span class="summary-amount">₹${finalTotalRounded}</span>
              </div>
            </div>
          </div>
          
          <div class="invoice-footer">
            <p>Thank you for shopping with ${STORE_INFO.name}!</p>
            <p style="margin-top: 8px;">This is a computer generated invoice - no signature required.</p>
          </div>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;
  };

  /* ---------------- DOWNLOAD INVOICE PDF ---------------- */
  const downloadInvoicePDF = () => {
    if (normalizedCart.length === 0) return;
    
    const invoiceHTML = generateInvoiceHTML();
    
    // Create a blob with the HTML content
    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    
    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-avhstore-${Date.now()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    // Optional: Open in new window for printing
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (printWindow) {
      printWindow.document.write(invoiceHTML);
      printWindow.document.close();
      printWindow.focus();
    }
  };

  /* ---------------- WHATSAPP MESSAGE ---------------- */
  const buildInvoiceMessage = () => {
    let message = `🧾 *New Order - ${STORE_INFO.name}*\n\n`;

    normalizedCart.forEach((item, index) => {
      message += `${index + 1}. ${item.title}\n`;
      message += `Qty: ${item.quantity} × ₹${item.price}\n`;
      message += `Total: ₹${item.price * item.quantity}\n\n`;
    });

    message += `Subtotal: ₹${subtotalRounded}\n`;
    message += `GST (3%): ₹${gstRounded}\n`;
    message += `Shipping: ${shipping === 0 ? "Free" : "₹" + shipping}\n`;
    message += `*Grand Total: ₹${finalTotalRounded}*\n\n`;

    message += `👤 Customer Details:\n`;
    message += `Name: ${form.fullName}\n`;
    message += `Phone: ${form.phone}\n`;
    message += `Address: ${form.address}, ${form.city}, ${form.state} - ${form.pincode}\n`;

    return message;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill in all fields");
      return;
    }

    const message = buildInvoiceMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
    downloadInvoicePDF(); // Download invoice instead of print
  };

  /* ---------------- QUANTITY ---------------- */
  const handleQuantityChange = (productId, nextQuantity) => {
    if (nextQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    updateQuantity(productId, nextQuantity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-10 text-black mainProductDitailsContainer">
      <div className="container mx-auto max-w-7xl">
        <h1 className="pb-6 text-[clamp(1.5rem,5vw,3rem)] font-semibold text-gray-900 text-center ">
          Shopping Cart
        </h1>

        {normalizedCart.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl bg-white py-20 px-8 text-center shadow-sm">
            <ShoppingBag size={80} className="mx-auto mb-6 text-gray-300" />
            <h2 className="mb-4 text-2xl font-medium text-gray-900">
              Your cart is empty
            </h2>
            <p className="mb-8 text-gray-500">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center justify-center gap-2 bg-black px-8 py-4 text-sm font-medium uppercase tracking-wider text-white transition-all hover:bg-gray-800"
            >
              Continue Shopping <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {normalizedCart.map((item, index) => {
                const itemTotal = item.price * item.quantity;
                const cartItemKey = `${item.id}-${item.size || "nosize"}-${index}`;

                return (
                  <div 
                    key={cartItemKey} 
                    className="group relative rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="grid gap-6 md:grid-cols-12 items-center">
                      
                      {/* Product Info */}
                      <div className="flex gap-4 md:col-span-5">
                        <Link href={`/product/${item.id}`} className="shrink-0">
                          <div className="h-24 w-24 overflow-hidden rounded-lg bg-gray-100">
                            <ImageWithFallback
                              src={item.image || "https://placehold.co/300x300"}
                              alt={item.title}
                              className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                        </Link>

                        <div className="flex flex-col justify-center">
                          <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                          {item.size && (
                            <p className="text-sm text-gray-500">
                              Size: {item.size}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex justify-start md:col-span-3">
                        <div className="flex items-center rounded-lg border border-gray-200">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)} 
                            className="p-2 hover:bg-gray-50 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)} 
                            className="p-2 hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="hidden md:block md:col-span-2">
                        <p className="text-sm text-gray-500">Unit Price</p>
                        <p className="font-medium">{formatPrice(item.price)}</p>
                      </div>

                      {/* Total & Remove */}
                      <div className="flex justify-between items-center md:col-span-2">
                        <div>
                          <p className="text-sm text-gray-500 md:hidden">Total</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {formatPrice(itemTotal)}
                          </p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Clear Cart Option */}
              {normalizedCart.length > 0 && (
                <div className="flex justify-end pt-4">
                  <button
                    onClick={clearCart}
                    className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </div>

            {/* ORDER SUMMARY */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 rounded-xl bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-2xl font-medium">Order Summary</h2>

                <div className="space-y-4 border-b border-gray-100 pb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotalRounded)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>GST (3%)</span>
                    <span className="font-medium">{formatPrice(gstRounded)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                </div>

                <div className="flex justify-between py-6 text-xl font-semibold">
                  <span>Total</span>
                  <span className="text-black">{formatPrice(finalTotalRounded)}</span>
                </div>

                <button
                  onClick={() => setShowCheckout(!showCheckout)}
                  className="w-full bg-black py-4 text-sm font-medium uppercase tracking-wider text-white transition-all hover:bg-gray-800"
                >
                  {showCheckout ? "Hide Checkout" : "Proceed to Checkout"}
                </button>

                {showCheckout && (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <h3 className="text-lg font-medium mb-4">Shipping Details</h3>
                    
                    {CHECKOUT_FIELDS.map((field) => (
                      <div key={field.key} className="space-y-1">
                        <label
                          htmlFor={field.key}
                          className="block text-sm font-medium text-gray-700"
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.key}
                          name={field.key}
                          type={field.type}
                          autoComplete={field.autoComplete}
                          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                          value={form[field.key]}
                          onChange={(e) =>
                            setForm({ ...form, [field.key]: e.target.value })
                          }
                          required
                        />
                      </div>
                    ))}

                    <div className="space-y-3 pt-4">
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 bg-green-600 py-3 text-sm font-medium uppercase tracking-wider text-white transition-all hover:bg-green-700 rounded-lg"
                      >
                        <Send size={16} />
                        Send Invoice on WhatsApp
                      </button>

                      <button
                        type="button"
                        onClick={downloadInvoicePDF}
                        className="flex w-full items-center justify-center gap-2 border-2 border-black py-3 text-sm font-medium uppercase tracking-wider text-black transition-all hover:bg-black hover:text-white rounded-lg"
                      >
                        <Download size={16} />
                        Download Invoice
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
