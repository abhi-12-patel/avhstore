"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import {
  Minus,
  Plus,
  X,
  ShoppingBag,
  ArrowRight,
  Download,
  Send,
  QrCode,
  Smartphone,
} from "lucide-react";
import ImageWithFallback from "../ImageWithFallback";
import { FREE_SHIPPING_MIN, OFFER_RULES, products as catalogProducts } from "@/data";
import ProductCard from "../common/productCart/ProductCart";

const WHATSAPP_NUMBER = "916351359801";
const UPI_ID = "vjashoda738-2@oksbi";
const UPI_PAYEE_NAME = "AVH STORE";
const CHECKOUT_FIELDS = [
  { key: "fullName", label: "Full Name", type: "text", autoComplete: "name" },
  { key: "phone", label: "Phone Number", type: "tel", autoComplete: "tel" },
  { key: "address", label: "Address", type: "text", autoComplete: "street-address" },
  { key: "city", label: "City", type: "text", autoComplete: "address-level2" },
  { key: "state", label: "State", type: "text", autoComplete: "address-level1" },
  { key: "pincode", label: "Pincode", type: "text", autoComplete: "postal-code" },
];

const buildUPIURL = (amount, orderNumber) => {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: UPI_PAYEE_NAME,
    am: Number(amount || 0).toFixed(2),
    cu: "INR",
    tn: `Order ID ${orderNumber || "N/A"}`,
  });

  return `upi://pay?${params.toString()}`;
};

const getQRCodeURL = (upiURL, size = 220) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    upiURL
  )}`;

const fetchImageAsDataURL = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Unable to load QR image");
  }

  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const Cart = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useStore();
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
    address: "C/O 133, Laxmi Palace, Street No. 5, Radha Nagar, Radha Nagar Society, Chandreshnagar, Rajkot, Gujarat pin-360004",
    // gstin: "RTOUFGV56790",
    phone: "91 6351359801",
    email: "avhstore@example.com",
  };

  /* ---------------- SAFE CART ---------------- */
  const safeCart = Array.isArray(cart) ? cart : [];

  const normalizedCart = safeCart.map((item) => {
    const product = item?.product ?? item;
    return {
      id: product?.id ?? item?.id,
      sku:
        product?.SKU_id ??
        product?.sku_id ??
        product?.sku ??
        product?.skuId ??
        item?.SKU_id ??
        item?.sku_id ??
        item?.sku ??
        item?.skuId ??
        "N/A",
      title: product?.title ?? product?.name ?? item?.title ?? "Product",
      image:
        product?.image ??
        product?.imageUrl ??
        product?.images?.[0] ??
        item?.image,
      price: parseFloat(product?.price ?? item?.price) || 0,
      qty: Math.max(1, parseInt(item?.qty) || 1),
      size: item?.size,
    };
  });

  /* ---------------- CALCULATIONS ---------------- */
  const subtotal = normalizedCart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const round = (num) => Math.round(num);

  const sortedOffers = Array.isArray(OFFER_RULES)
    ? [...OFFER_RULES].sort((a, b) => b.min - a.min)
    : [];
  const applicableOffer = sortedOffers.find((offer) => subtotal >= offer.min);
  const discountPercent = applicableOffer?.discount || 0;
  const discountAmount = (subtotal * discountPercent) / 100;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const shipping = subtotal > 0 && subtotal < FREE_SHIPPING_MIN ? 50 : 0;
  const finalTotal = subtotalAfterDiscount + shipping;

  const subtotalRounded = round(subtotal);
  const discountRounded = round(discountAmount);
  const finalTotalRounded = round(finalTotal);


  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  const peopleAlsoBuy = useMemo(() => {
    const cartIds = new Set(
      normalizedCart.map((item) => String(item?.id ?? ""))
    );

    const pool = (Array.isArray(catalogProducts) ? catalogProducts : [])
      .filter((item) => item && !cartIds.has(String(item.id)))
      .filter((item) => item.inStock !== false);

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, [normalizedCart]);

  const previewOrderNumber = useMemo(
    () => `ORD-${Date.now().toString().slice(-8)}`,
    []
  );
  const previewUpiURL = useMemo(
    () => buildUPIURL(finalTotalRounded, previewOrderNumber),
    [finalTotalRounded, previewOrderNumber]
  );
  const previewQRCodeURL = useMemo(
    () => getQRCodeURL(previewUpiURL),
    [previewUpiURL]
  );

  const handleQuickAddToCart = (product) => {
    if (!product) return;
    addToCart(product, 1, "Free Size");
  };

  const createInvoiceMeta = () => {
    const now = new Date();
    return {
      invoiceNumber: `INV-${Date.now().toString().slice(-8)}`,
      date: now.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
  };

  /* ---------------- GENERATE INVOICE HTML ---------------- */
  const generateInvoiceHTML = (options = {}) => {
    const compact = Boolean(options.compact);
    const invoiceMeta = options.invoiceMeta || createInvoiceMeta();
    const { invoiceNumber, date } = invoiceMeta;
    const invoiceUpiURL = buildUPIURL(finalTotalRounded, invoiceNumber);
    const invoiceQRCodeURL = getQRCodeURL(invoiceUpiURL, 180);

    const itemsHTML = normalizedCart
      .map((item, index) => {
        const itemTotal = item.price * item.qty;
        return `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">${index + 1}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">
              <div style="font-weight: 600; color: #1a202c;">${item.title}</div>
              <div style="font-size: 12px; color: #718096;">SKU: ${item.sku}</div>
              ${item.size ? `<div style="font-size: 13px; color: #718096;">Size: ${item.size}</div>` : ''}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.qty}</td>
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
            padding: ${compact ? "16px 12px" : "40px 20px"};
            color: #1a202c;
          }
          
          .invoice-container {
            max-width: ${compact ? "900px" : "1000px"};
            margin: 0 auto;
            background: white;
            border-radius: ${compact ? "12px" : "16px"};
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          
          .invoice-header {
            background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
            color: white;
            padding: ${compact ? "20px 24px" : "32px 40px"};
          }
          
          .header-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
          }
          
          .store-name {
            font-size: ${compact ? "22px" : "28px"};
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
            font-size: ${compact ? "12px" : "14px"};
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
            padding: ${compact ? "20px 24px" : "32px 40px"};
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

          .billing-grid {
            display: grid;
            grid-template-columns: 1fr 1px 1fr;
            gap: 20px;
            align-items: stretch;
          }

          .center-divider {
            background: #cbd5e0;
            width: 1px;
          }

          .billing-column {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .billing-title {
            font-size: 14px;
            font-weight: 700;
            color: #2d3748;
            text-transform: uppercase;
            letter-spacing: 0.4px;
          }

          .billing-row {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .billing-label {
            font-size: 12px;
            color: #718096;
            font-weight: 500;
          }

          .billing-value {
            font-size: 14px;
            color: #1a202c;
            font-weight: 600;
            line-height: 1.45;
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
            padding: ${compact ? "20px 24px" : "32px 40px"};
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
          }
          
          th {
            background: #f7fafc;
            padding: 12px;
            font-size: ${compact ? "12px" : "14px"};
            font-weight: 600;
            color: #4a5568;
            text-align: left;
            border-bottom: 2px solid #e2e8f0;
          }
          
          th:first-child { border-radius: 8px 0 0 0; }
          th:last-child { border-radius: 0 8px 0 0; }
          
          .summary-section {
            padding: ${compact ? "20px 24px" : "32px 40px"};
            background: #f8fafc;
            border-top: 2px solid #e2e8f0;
            page-break-inside: avoid;
          }
          
          .summary-grid {
            max-width: 400px;
            margin-left: auto;
          }
          
          .summary-row {
            display: flex;
            justify-content: space-between;
            padding: ${compact ? "8px 0" : "12px 0"};
            border-bottom: 1px dashed #cbd5e0;
          }
          
          .summary-row.total {
            border-bottom: none;
            padding-top: ${compact ? "10px" : "16px"};
            margin-top: 8px;
            border-top: 2px solid #1a202c;
            font-size: ${compact ? "16px" : "18px"};
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
            padding: ${compact ? "16px 24px" : "24px 40px"};
            text-align: center;
            border-top: 1px solid #e2e8f0;
            color: #718096;
            font-size: ${compact ? "12px" : "13px"};
            page-break-inside: avoid;
          }

          @media (max-width: 680px) {
            .billing-grid {
              grid-template-columns: 1fr;
              gap: 14px;
            }

            .center-divider {
              width: 100%;
              height: 1px;
            }
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
            <div class="section-title">Billing Details</div>
            <div class="billing-grid">
              <div class="billing-column">
                <div class="billing-title">Customer</div>
                <div class="billing-row">
                  <span class="billing-label">Name</span>
                  <span class="billing-value">${form.fullName || "N/A"} </span>
                </div>
                <div class="billing-row">
                  <span class="billing-label">Address</span>
                  <span class="billing-value">${form.address || "N/A"}, ${form.city || "N/A"}, ${form.state || "N/A"} - ${form.pincode || "N/A"}</span>
                </div>
                <div class="billing-row">
                  <span class="billing-label">Phone Number</span>
                  <span class="billing-value">${form.phone || "N/A"}</span>
                </div>
              </div>
              <div class="center-divider"></div>
              <div class="billing-column">
                <div class="billing-title">Store Address</div>
                <div class="billing-row">
                  <span class="billing-label">Store Name</span>
                  <span class="billing-value">${STORE_INFO.name}</span>
                </div>
                <div class="billing-row">
                  <span class="billing-label">Address</span>
                  <span class="billing-value">${STORE_INFO.address}</span>
                </div>
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
              ${discountRounded > 0 ? `
              <div class="summary-row">
                <span class="summary-label">Discount (${discountPercent}%):</span>
                <span class="summary-amount">-₹${discountRounded}</span>
              </div>
              ` : ""}
          
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
            <div style="margin-bottom: 14px;">
              <div style="font-weight: 700; color: #1a202c; margin-bottom: 8px;">Pay Now (UPI)</div>
              <div style="display: inline-flex; align-items: center; gap: 12px; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 10px;">
                <img src="${invoiceQRCodeURL}" alt="UPI Payment QR" width="90" height="90" style="border-radius: 8px; border: 1px solid #edf2f7;" />
                <div style="text-align: left;">

                </div>
              </div>
            </div>
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
    // <div class="summary-row">
              //   <span class="summary-label">GST (3%):</span>
              //   <span class="summary-amount">₹${gstRounded}</span>
              // </div>
  /* ---------------- DOWNLOAD INVOICE PDF ---------------- */
  const downloadInvoicePDF = async (invoiceMeta) => {
    if (normalizedCart.length === 0) return;
    const resolvedInvoiceMeta =
      invoiceMeta?.invoiceNumber && invoiceMeta?.date
        ? invoiceMeta
        : createInvoiceMeta();

    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const left = 12;
    const right = 12;
    const top = 12;
    const bottom = 12;
    const contentWidth = pageWidth - left - right;
    const money = (value) => `Rs. ${Math.round(value)}`;
    const safe = (value) => String(value ?? "").trim() || "N/A";
    const upiURL = buildUPIURL(finalTotalRounded, resolvedInvoiceMeta.invoiceNumber);
    const qrCodeURL = getQRCodeURL(upiURL);

    const columns = {
      index: left + 2,
      product: left + 12,
      qty: pageWidth - right - 58,
      price: pageWidth - right - 30,
      total: pageWidth - right - 2,
      qtySep: pageWidth - right - 64,
      priceSep: pageWidth - right - 36,
      totalSep: pageWidth - right - 24,
    };
    const productColWidth = columns.qtySep - columns.product - 4;

    let y = top;

    const billToWidth = Math.min(78, contentWidth * 0.42);
    const billToX = pageWidth - right - billToWidth;
    const companyWidth = contentWidth - billToWidth - 8;
    const companyX = left + 4;
    const customerText = [
      `Name: ${safe(form.fullName)}`,
      `Address: ${safe(form.address)}, ${safe(form.city)}, ${safe(form.state)} - ${safe(form.pincode)}`,
      `Phone: ${safe(form.phone)}`,
    ].join("\n");
    const companyText = [
      `Address: ${safe(STORE_INFO.address)}`,
      `Phone: ${safe(STORE_INFO.phone)}`,
      `Email: ${safe(STORE_INFO.email)}`,
    ].join("\n");
    const customerLines = pdf.splitTextToSize(customerText, billToWidth);
    const companyLines = pdf.splitTextToSize(companyText, companyWidth);
    const headerHeight = Math.max(
      34,
      12 + Math.max(customerLines.length * 4.2, companyLines.length * 4.2)
    );

    pdf.setFillColor(20, 20, 20);
    pdf.rect(left, y, contentWidth, headerHeight, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text(STORE_INFO.name, companyX, y + 8);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.8);
    pdf.text(companyLines, companyX, y + 13);

    pdf.setDrawColor(255, 255, 255);
    pdf.setLineWidth(0.2);
    pdf.line(billToX - 4, y + 4, billToX - 4, y + headerHeight - 4);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("BILL TO", billToX, y + 8);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.text(customerLines, billToX, y + 13);

    y += headerHeight + 8;
    pdf.setTextColor(0, 0, 0);

    pdf.setDrawColor(220, 220, 220);
    pdf.setFillColor(248, 248, 248);
    pdf.rect(left, y, contentWidth, 8, "FD");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.text(`Invoice: ${resolvedInvoiceMeta.invoiceNumber}`, left + 3, y + 5.4);
    pdf.text(`Date: ${resolvedInvoiceMeta.date}`, pageWidth - right - 3, y + 5.4, {
      align: "right",
    });
    y += 11;

    const drawTableHeader = () => {
      pdf.setDrawColor(200, 200, 200);
      pdf.setFillColor(245, 245, 245);
      pdf.rect(left, y, contentWidth, 8, "FD");
      pdf.setTextColor(0, 0, 0);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.text("#", columns.index, y + 5.5);
      pdf.text("Product", columns.product, y + 5.5);
      pdf.text("Qty", columns.qty - 2, y + 5.5, { align: "right" });
      pdf.text("Price", columns.price, y + 5.5, { align: "right" });
      pdf.text("Total", columns.total, y + 5.5, { align: "right" });
      y += 8;
    };

    const ensureRowSpace = (heightNeeded) => {
      if (y + heightNeeded > pageHeight - bottom - 32) {
        pdf.addPage();
        y = top;
        drawTableHeader();
      }
    };

    drawTableHeader();

    normalizedCart.forEach((item, index) => {
      const productTitle = safe(item.title || item.name || "Product");
      const metaText = `SKU: ${safe(item.sku)}${item.size ? ` | Size: ${item.size}` : ""}`;
      const rawTitleLines = pdf.splitTextToSize(productTitle, productColWidth);
      const titleLines = rawTitleLines.slice(0, 2);
      if (rawTitleLines.length > 2 && titleLines[1]) {
        titleLines[1] = `${String(titleLines[1]).replace(/\s+$/, "")}...`;
      }
      const metaLines = pdf.splitTextToSize(metaText, productColWidth).slice(0, 1);
      const rowHeight = Math.max(11, titleLines.length * 3.9 + metaLines.length * 3.4 + 4.8);

      ensureRowSpace(rowHeight);

      const rowTop = y;
      const rowBottom = y + rowHeight;
      const valueY = rowTop + rowHeight / 2 + 1.2;
      const itemTotal = item.price * item.qty;

      pdf.setDrawColor(230, 230, 230);
      if (index % 2 === 0) {
        pdf.setFillColor(252, 252, 252);
        pdf.rect(left, rowTop, contentWidth, rowHeight, "F");
      }
      pdf.line(left, rowBottom, pageWidth - right, rowBottom);
      pdf.line(columns.qtySep, rowTop, columns.qtySep, rowBottom);
      pdf.line(columns.priceSep, rowTop, columns.priceSep, rowBottom);
      pdf.line(columns.totalSep, rowTop, columns.totalSep, rowBottom);

      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(0, 0, 0);
      pdf.text(String(index + 1), columns.index, rowTop + 5);
      pdf.setFont("helvetica", "bold");
      pdf.text(titleLines, columns.product, rowTop + 4.8);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(95, 95, 95);
      pdf.setFontSize(8.5);
      pdf.text(metaLines, columns.product, rowTop + 4.8 + titleLines.length * 4);
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(9);
      pdf.text(String(item.qty), columns.qty - 2, valueY, { align: "right" });
      pdf.text(money(item.price), columns.price, valueY, { align: "right" });
      pdf.text(money(itemTotal), columns.total, valueY, { align: "right" });

      y += rowHeight;
    });

    const summaryHeight = discountRounded > 0 ? 28 : 22;
    if (y + summaryHeight > pageHeight - bottom) {
      pdf.addPage();
      y = top;
    }

    const boxWidth = 80;
    const boxX = pageWidth - right - boxWidth;
    pdf.setDrawColor(210, 210, 210);
    pdf.setFillColor(250, 250, 250);
    pdf.rect(boxX, y + 3, boxWidth, summaryHeight, "FD");
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);

    let lineY = y + 9;
    pdf.text("Subtotal", boxX + 4, lineY);
    pdf.text(money(subtotalRounded), boxX + boxWidth - 4, lineY, { align: "right" });

    if (discountRounded > 0) {
      lineY += 6;
      pdf.text(`Discount (${discountPercent}%)`, boxX + 4, lineY);
      pdf.text(`-${money(discountRounded)}`, boxX + boxWidth - 4, lineY, { align: "right" });
    }

    lineY += 6;
    pdf.text("Shipping", boxX + 4, lineY);
    pdf.text(shipping === 0 ? "Free" : money(shipping), boxX + boxWidth - 4, lineY, {
      align: "right",
    });

    lineY += 7;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("Grand Total", boxX + 4, lineY);
    pdf.text(money(finalTotalRounded), boxX + boxWidth - 4, lineY, { align: "right" });

    let paymentTop = y + summaryHeight + 8;
    const paymentSectionHeight = 44;
    if (paymentTop + paymentSectionHeight > pageHeight - bottom) {
      pdf.addPage();
      paymentTop = top + 6;
    }

    pdf.setDrawColor(215, 215, 215);
    pdf.setFillColor(250, 250, 250);
    pdf.roundedRect(left, paymentTop, contentWidth, paymentSectionHeight, 2, 2, "FD");
    pdf.setTextColor(20, 20, 20);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("Pay Now (UPI)", left + 4, paymentTop + 7);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    pdf.text(`UPI ID: ${UPI_ID}`, left + 4, paymentTop + 13);

    try {
      const qrDataURL = await fetchImageAsDataURL(qrCodeURL);
      pdf.addImage(qrDataURL, "PNG", left + 4, paymentTop + 16, 24, 24);
    } catch (error) {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.text("QR unavailable while generating PDF.", left + 4, paymentTop + 24);
    }

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.2);
    const upiLinkText = "Pay using any UPI app";
    const linkX = left + 32;
    const linkY = paymentTop + 24;
    pdf.text(upiLinkText, linkX, linkY);
    pdf.textWithLink(upiLinkText, linkX, linkY, { url: upiURL });
    const upiPreview = upiURL.length > 70 ? `${upiURL.slice(0, 70)}...` : upiURL;
    pdf.setTextColor(90, 90, 90);
    pdf.text(upiPreview, linkX, linkY + 6);

    const pages = pdf.getNumberOfPages();
    for (let i = 1; i <= pages; i += 1) {
      pdf.setPage(i);
      pdf.setTextColor(110, 110, 110);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.text(`Thank you for shopping with ${STORE_INFO.name}`, left, pageHeight - 6);
      pdf.text(`Page ${i} of ${pages}`, pageWidth - right, pageHeight - 6, { align: "right" });
    }

    const safeInvoiceRef = (resolvedInvoiceMeta.invoiceNumber || `INV-${Date.now()}`)
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "");
    pdf.save(`invoice-${safeInvoiceRef}.pdf`);
  };

  /* ---------------- WHATSAPP MESSAGE ---------------- */
  const buildInvoiceMessage = (invoiceMeta) => {
    let message = `🧾 *New Order - ${STORE_INFO.name}*\n`;
    message += `Invoice No: ${invoiceMeta?.invoiceNumber || "N/A"}\n`;
    message += `Date: ${invoiceMeta?.date || "N/A"}\n\n`;

    normalizedCart.forEach((item, index) => {
      message += `${index + 1}. ${item.title}\n`;
      message += `SKU: ${item.sku}\n`;
      message += `Qty: ${item.qty} × ₹${item.price}\n`;
      message += `Total: ₹${item.price * item.qty}\n\n`;
    });

    message += `Subtotal: ₹${subtotalRounded}\n`;
    if (discountRounded > 0) {
      message += `Discount (${discountPercent}%): -₹${discountRounded}\n`;
    }
    // message += `GST (3%): ₹${gstRounded}\n`;
    message += `Shipping: ${shipping === 0 ? "Free" : "₹" + shipping}\n`;
    message += `*Grand Total: ₹${finalTotalRounded}*\n\n`;

    message += `👤 Customer Details:\n`;
    message += `Name & Address: ${form.fullName}, ${form.address}, ${form.city}, ${form.state} - ${form.pincode}\n`;
    message += `Phone: ${form.phone}\n`;

    return message;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
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

    const invoiceMeta = createInvoiceMeta();
    await downloadInvoicePDF(invoiceMeta);

    const message = buildInvoiceMessage(invoiceMeta);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
    clearCart()
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-6 sm:py-10 text-black mainProductDitailsContainer">
      <div className="container mx-auto max-w-7xl">

            {/* OFFERS BAR */}
        <div className="mb-6 flex flex-wrap justify-center gap-4 text-sm bg-black text-white p-3 rounded-lg">
          <span>🚚 Free Shipping above ₹2999</span>
          <span>🎉 3% OFF above ₹2999</span>
          <span>🔥 5% OFF above ₹5999</span>
          <span>🔥 7% OFF above ₹8999</span>
        </div>
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
          <>
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
            
            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {normalizedCart.map((item, index) => {
                const itemTotal = item.price * item.qty;
                const cartItemKey = `${item.id}-${item.size || "nosize"}-${index}`;

                return (
                  <div 
                    key={cartItemKey} 
                    className="group relative rounded-xl bg-white p-4 sm:p-6 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="grid gap-4 sm:gap-6 sm:grid-cols-12 items-center">
                      
                      {/* Product Info */}
                      <div className="flex gap-4 sm:col-span-5 min-w-0">
                        <Link href={`/product/${item.id}`} className="shrink-0">
                          <div className="h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-lg bg-gray-100">
                            <ImageWithFallback
                              src={item.image || "https://placehold.co/300x300"}
                              alt={item.title}
                              className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                        </Link>

                        <div className="flex flex-col justify-center">
                          <h3 className="text-base text-wrap sm:text-lg font-medium text-gray-900 truncate line-clamp-1">{item.title}</h3>
                          <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                          {item.size && (
                            <p className="text-xs sm:text-sm text-gray-500">
                              Size: {item.size}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex justify-start sm:col-span-3">
                        <div className="flex items-center rounded-lg border border-gray-200">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.qty - 1)} 
                            className="p-2 hover:bg-gray-50 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center font-medium">{item.qty}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.qty + 1)} 
                            className="p-2 hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="hidden sm:block sm:col-span-2">
                        <p className="text-sm text-gray-500">Unit Price</p>
                        <p className="font-medium">{formatPrice(item.price)}</p>
                      </div>

                      {/* Total & Remove */}
                      <div className="flex justify-between items-center sm:col-span-2">
                        <div>
                          <p className="text-xs text-gray-500 sm:hidden">Total</p>
                          <p className="text-base sm:text-lg font-semibold text-gray-900">
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
                <div className="flex justify-end gap-5 pt-4">
                  <Link
                    href="/collections"
                    className="text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    Shop More
                  </Link>
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
              <div className="lg:sticky lg:top-8 rounded-xl bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="mb-6 text-xl sm:text-2xl font-medium">Order Summary</h2>

                <div className="space-y-4 border-b border-gray-100 pb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotalRounded)}</span>
                  </div>
                  {discountRounded > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount ({discountPercent}%)</span>
                      <span className="font-medium">-{formatPrice(discountRounded)}</span>
                    </div>
                  )}
                  {/* <div className="flex justify-between text-gray-600">
                    <span>GST (3%)</span>
                    <span className="font-medium">{formatPrice(gstRounded)}</span>
                  </div> */}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                </div>

                <div className="flex justify-between py-6 text-lg sm:text-xl font-semibold">
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
                        Pay First, Then Send WhatsApp
                      </button>

                      {/* <button
                        type="button"
                        onClick={downloadInvoicePDF}
                        className="flex w-full items-center justify-center gap-2 border-2 border-black py-3 text-sm font-medium uppercase tracking-wider text-black transition-all hover:bg-black hover:text-white rounded-lg"
                      >
                        <Download size={16} />
                        Download Invoice
                      </button> */}
                    </div>

                    <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <QrCode size={16} />
                        Pay Now (UPI)
                      </div>
                      <div className="grid grid-cols-[90px_1fr] gap-3">
                        <img
                          src={previewQRCodeURL}
                          alt="UPI QR Code"
                          className="h-[90px] w-[90px] rounded-md border border-gray-200 bg-white p-1"
                        />
                        <div className="flex flex-col justify-between gap-2">
                          <p className="text-xs text-gray-600 break-all">
                            UPI ID: <span className="font-medium text-gray-800">{UPI_ID}</span>
                          </p>
                          <a
                            href={previewUpiURL}
                            className="inline-flex w-fit items-center gap-2 rounded-md bg-black px-3 py-2 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-gray-800"
                          >
                            <Smartphone size={14} />
                            Pay Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {peopleAlsoBuy.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-5 text-2xl sm:text-3xl font-semibold text-gray-900">
                People Also Buy
              </h2>
             <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          {peopleAlsoBuy.map((item) => (
                            <ProductCard key={item.id} product={item} />
                          ))}
                        </div>

            </section>
          )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
