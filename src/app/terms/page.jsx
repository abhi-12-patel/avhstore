export const metadata = {
  title: "Terms and Conditions | AVH STORE",
  description:
    "Read AVH STORE terms and conditions for orders, pricing, shipping, returns, and use of services.",
};

const termsSections = [
  {
    title: "1. Acceptance of Terms",
    points: [
      "By accessing AVH STORE and placing an order, you agree to these Terms and Conditions.",
      "If you do not agree, please do not use the website or services.",
    ],
  },
  {
    title: "2. Product Information",
    points: [
      "We aim to keep product descriptions, prices, and images accurate.",
      "Color/finish may vary slightly due to lighting, display settings, and photography.",
      "Availability may change without prior notice.",
    ],
  },
  {
    title: "3. Pricing & Payments",
    points: [
      "All prices are listed in INR unless specified otherwise.",
      "Prices and offers may change at any time without prior notice.",
      "Payments are processed through secure third-party payment providers.",
    ],
  },
  {
    title: "4. Orders & Fulfillment",
    points: [
      "Order confirmation is sent after successful placement.",
      "AVH STORE reserves the right to cancel orders in case of stock issues, pricing errors, or suspected fraud.",
      "If an order is cancelled after payment, eligible amount will be refunded as per payment provider timelines.",
    ],
  },
  {
    title: "5. Shipping & Delivery",
    points: [
      "Delivery timelines are estimates and may vary by location/courier conditions.",
      "Delays due to weather, logistics, or unforeseen events are beyond direct control.",
      "Customers must provide complete and accurate delivery details.",
    ],
  },
  {
    title: "6. Returns & Refunds",
    points: [
      "Returns/refunds are governed by the Return & Refund Policy page.",
      "Please review policy terms before placing an order.",
      "For claims, valid proof such as unboxing video may be required.",
    ],
  },
  {
    title: "7. User Responsibilities",
    points: [
      "You agree not to misuse the website, attempt unauthorized access, or disrupt service.",
      "Any false, abusive, or fraudulent activity may lead to blocked access and legal action if required.",
    ],
  },
  {
    title: "8. Intellectual Property",
    points: [
      "All website content including logo, text, images, and design is owned or licensed by AVH STORE.",
      "You may not copy, reproduce, or distribute content without written permission.",
    ],
  },
  {
    title: "9. Limitation of Liability",
    points: [
      "AVH STORE is not liable for indirect or consequential losses arising from website use or delayed delivery.",
      "Total liability, if any, is limited to the amount paid for the related order.",
    ],
  },
  {
    title: "10. Changes to Terms",
    points: [
      "We may update these Terms from time to time.",
      "Updated terms become effective when published on this page.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="bg-[#fcfbf8] text-gray-900 mainCatgeroryContainer">
      <section className="px-5 pb-10 pt-24 lg:px-[10%] lg:pt-16">
        <div className="mx-auto max-w-6xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
            AVH STORE LEGAL
          </p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-tight text-[#1f1b16]">
            Terms and Conditions
          </h1>
          <p className="mt-3 text-sm text-gray-500">Last updated: March 2, 2026</p>
          <p className="mt-6 max-w-4xl leading-7 text-gray-700">
            These Terms and Conditions govern your use of AVH STORE website and
            services. By using this site, you acknowledge and agree to the terms
            below.
          </p>
        </div>
      </section>

      <section className="px-5 pb-10 lg:px-[10%]">
        <div className="mx-auto grid max-w-6xl gap-4">
          {termsSections.map((section) => (
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
          <h2 className="text-2xl font-semibold">Contact</h2>
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
