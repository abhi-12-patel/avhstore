export const metadata = {
  title: "Terms of Service | AVH STORE",
  description:
    "Read AVH STORE terms of service covering website usage, orders, payments, and customer responsibilities.",
};

const serviceSections = [
  {
    title: "1. Service Usage",
    points: [
      "By using AVH STORE website, you agree to these Terms of Service.",
      "You must use our website only for lawful purposes.",
      "Any misuse, abuse, or unauthorized activity may result in restricted access.",
    ],
  },
  {
    title: "2. Orders & Account Information",
    points: [
      "You agree to provide accurate and up-to-date information during checkout.",
      "We reserve the right to reject or cancel suspicious or invalid orders.",
      "In case of cancellation after payment, refund will be processed as per payment rules.",
    ],
  },
  {
    title: "3. Product & Pricing",
    points: [
      "Product details are presented to be as accurate as possible.",
      "Minor color/visual variations may occur due to photography and screen differences.",
      "Prices may be updated without prior notice.",
    ],
  },
  {
    title: "4. Third-Party Services",
    points: [
      "Payments, logistics, and other services may involve third-party providers.",
      "We are not responsible for third-party platform downtime or policy changes.",
    ],
  },
  {
    title: "5. Intellectual Property",
    points: [
      "All AVH STORE content, branding, and design are protected.",
      "Copying or reusing content without permission is prohibited.",
    ],
  },
  {
    title: "6. Limitation of Liability",
    points: [
      "AVH STORE is not liable for indirect losses caused by delays, network issues, or external disruptions.",
      "Maximum liability is limited to order value for the relevant transaction where legally applicable.",
    ],
  },
  {
    title: "7. Policy Updates",
    points: [
      "We may revise these Terms of Service when needed.",
      "Continued use of the website after updates indicates acceptance of revised terms.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="bg-[#fcfbf8] text-gray-900 mainCatgeroryContainer">
      <section className="px-5 pb-10 pt-24 lg:px-[10%] lg:pt-16">
        <div className="mx-auto max-w-6xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
            AVH STORE LEGAL
          </p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-tight text-[#1f1b16]">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-gray-500">Last updated: March 2, 2026</p>
         
        </div>
      </section>

      <section className="px-5 pb-10 lg:px-[10%]">
        <div className="mx-auto grid max-w-6xl gap-4">
          {serviceSections.map((section) => (
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
          </div>
        </div>
      </section>
    </div>
  );
}
