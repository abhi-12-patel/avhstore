export const metadata = {
  title: "Return & Refund Policy | AVH STORE",
  description:
    "Read AVH STORE's return, replacement, and refund policy for damaged, incorrect, and eligible orders.",
};

const policySections = [
  {
    title: "1. Order Cancellation",
    points: [
      "Orders once confirmed are generally not cancellable.",
      "If you need urgent help, contact support immediately and we will try to assist before dispatch.",
    ],
  },
  {
    title: "2. Return Eligibility",
    points: [
      "Returns are accepted only for damaged, defective, or wrong products.",
      "A complete unboxing video is mandatory to process any damage/wrong-item claim.",
      "Claims without unboxing video proof may not be approved.",
    ],
  },
  {
    title: "3. Wrong Product Received",
    points: [
      "If you receive a wrong item, share package photos/video and invoice details.",
      "After verification, we will arrange replacement or refund as applicable.",
      "The incorrect product must be returned in original condition.",
    ],
  },
  {
    title: "4. Damaged Product",
    points: [
      "Report damage within 24 hours of delivery.",
      "Share clear video/photos of product and packaging for verification.",
      "After confirmation, eligible orders are replaced or refunded.",
    ],
  },
  {
    title: "5. Refund Processing",
    points: [
      "Approved refunds are initiated after quality verification and return confirmation (if required).",
      "Refund processing time: typically 2-3 working days from approval.",
      "Bank/UPI credit may take additional working days depending on payment provider.",
    ],
  },
  {
    title: "6. Non-Returnable Cases",
    points: [
      "Used, damaged-by-customer, or altered products are not eligible.",
      "Claims raised after the allowed reporting window may be declined.",
      "Minor visual variation due to lighting/photography is not considered damage.",
    ],
  },
];

export default function ReturnRefundPolicyPage() {
  return (
    <div className="bg-[#fcfbf8] text-gray-900 mainCatgeroryContainer">
      <section className="px-5 pb-10 pt-24 lg:px-[10%] lg:pt-16">
        <div className="mx-auto max-w-6xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
            AVH STORE LEGAL
          </p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-tight text-[#1f1b16]">
            Return & Refund Policy
          </h1>
          <p className="mt-3 text-sm text-gray-500">Last updated: March 2, 2026</p>
          <p className="mt-6 max-w-4xl leading-7 text-gray-700">
            At AVH STORE, we aim to provide a smooth shopping experience. Please
            read the policy below carefully before placing your order. This policy
            applies to all purchases made through our official channels.
          </p>
        </div>
      </section>

      <section className="px-5 pb-10 lg:px-[10%]">
        <div className="mx-auto grid max-w-6xl gap-4">
          {policySections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
              <ul className="mt-3 space-y-2 text-gray-700">
                {section.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-amber-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20 lg:px-[10%]">
        <div className="mx-auto max-w-6xl rounded-2xl bg-[#1f1b16] px-6 py-8 text-white lg:px-10">
          <h2 className="text-2xl font-semibold">Return/Refund Support</h2>
          <p className="mt-3 text-sm leading-7 text-amber-100">
            For faster resolution, share order ID, unboxing video, and issue details
            in one message/email.
          </p>
          <div className="mt-4 grid gap-2 text-sm text-amber-100">
            <p>
              Email:{" "}
              <a
                href="mailto:abhihothi524@gmail.com"
                className="underline underline-offset-2"
              >
                abhihothi524@gmail.com
              </a>
            </p>
            <p>Phone: +91 9016457163</p>
            <p>
              Address: C/O 133, Laxmi Palace, Street No. 5, Radha Nagar,
              Chandreshnagar, Rajkot, Gujarat - 360004, India
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
