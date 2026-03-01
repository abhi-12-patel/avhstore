export const metadata = {
  title: "Privacy Policy | AVH STORE",
  description:
    "Read AVH STORE's privacy policy for data collection, usage, security, and customer rights.",
};

const sections = [
  {
    title: "1. Information We Collect",
    points: [
      "Personal details: name, phone number, email address, shipping address, city, state, and pincode.",
      "Order details: products purchased, quantity, order value, and transaction references.",
      "Device and usage details: browser type, IP address, pages viewed, and site activity for analytics.",
      "Support communication: messages shared through WhatsApp, email, and contact forms.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    points: [
      "To process and fulfill your orders, including shipping and delivery updates.",
      "To provide customer support, resolve complaints, and respond to service requests.",
      "To send order confirmations, invoices, and important account-related communication.",
      "To improve product recommendations, website performance, and shopping experience.",
    ],
  },
  {
    title: "3. Payment & Order Processing",
    points: [
      "Payments are handled through secure third-party payment providers.",
      "AVH STORE does not store full debit/credit card details on its servers.",
      "Order information may be shared with logistics partners only for delivery fulfillment.",
    ],
  },
  {
    title: "4. Cookies & Analytics",
    points: [
      "We use cookies to keep cart/session functionality working properly.",
      "Cookies may also be used for analytics, performance tracking, and user experience improvements.",
      "You can disable cookies in browser settings, but some site features may not work correctly.",
    ],
  },
  {
    title: "5. Data Sharing",
    points: [
      "We do not sell personal data to third parties.",
      "Data is shared only with service providers needed for payment processing, shipping, and website operations.",
      "Data may be disclosed if required by law, regulation, or legal process.",
    ],
  },
  {
    title: "6. Data Security & Retention",
    points: [
      "We apply reasonable security controls to protect customer information.",
      "No internet-based system is 100% secure; customers should also safeguard their own account details.",
      "We retain data only as long as needed for order, legal, tax, or support purposes.",
    ],
  },
  {
    title: "7. Your Rights",
    points: [
      "You may request access, correction, or deletion of your personal data, subject to applicable law.",
      "You may request to stop promotional communications at any time.",
      "For privacy requests, contact us using the details below.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#fcfbf8] text-gray-900 mainCatgeroryContainer">
      <section className="px-5 pb-10 pt-24 lg:px-[10%] lg:pt-16">
        <div className="mx-auto max-w-6xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
            AVH STORE LEGAL
          </p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-tight text-[#1f1b16]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-gray-500">Last updated: March 2, 2026</p>
          <p className="mt-6 max-w-4xl leading-7 text-gray-700">
            This Privacy Policy explains how AVH STORE collects, uses, stores, and
            protects your information when you visit our website, place orders, or
            contact us. By using our services, you agree to this policy.
          </p>
        </div>
      </section>

      <section className="px-5 pb-10 lg:px-[10%]">
        <div className="mx-auto grid max-w-6xl gap-4">
          {sections.map((section) => (
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
          <h2 className="text-2xl font-semibold">Contact For Privacy Requests</h2>
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
