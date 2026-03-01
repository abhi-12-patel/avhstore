export const metadata = {
  title: "Shipping Policy | AVH STORE",
  description:
    "Read AVH STORE shipping policy, dispatch timelines, delivery estimates, and shipping support details.",
};

const shippingSections = [
  {
    title: "1. Processing Time",
    points: [
      "Readymade items are usually processed within 2-3 working days.",
      "Made-to-order items may require additional processing time.",
      "If delays occur, our team will notify you through available contact details.",
    ],
  },
  {
    title: "2. Delivery Timeline",
    points: [
      "Estimated delivery usually takes 4-7 working days after dispatch.",
      "Delivery time may vary based on location, courier network, and local service conditions.",
      "During peak periods, delivery may take longer than usual.",
    ],
  },
  {
    title: "3. Shipping Charges",
    points: [
      "Shipping charges (if applicable) are displayed during checkout.",
      "Free shipping offers, if active, are applied as per current offer rules.",
    ],
  },
  {
    title: "4. Address Accuracy",
    points: [
      "Please provide complete and correct address, pin code, and phone number.",
      "Incorrect or incomplete details may cause delays or failed delivery attempts.",
    ],
  },
  {
    title: "5. Delays & Exceptions",
    points: [
      "Unexpected delays can occur due to weather, strikes, regional restrictions, or courier issues.",
      "AVH STORE is not liable for delays caused by circumstances beyond reasonable control.",
    ],
  },
  {
    title: "6. Delivery Confirmation",
    points: [
      "Once marked delivered by courier, customers should check with family/security if parcel is not immediately visible.",
      "If still unresolved, contact support with order ID for investigation.",
    ],
  },
];

export default function ShippingPolicyPage() {
  return (
    <div className="bg-[#fcfbf8] text-gray-900 mainCatgeroryContainer">
      <section className="px-5 pb-10 pt-24 lg:px-[10%] lg:pt-16">
        <div className="mx-auto max-w-6xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
            AVH STORE LEGAL
          </p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-tight text-[#1f1b16]">
            Shipping Policy
          </h1>
          <p className="mt-3 text-sm text-gray-500">Last updated: March 2, 2026</p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200">
            <img
              src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1400&q=80"
              alt="Shipping and delivery visual"
              className="h-56 w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 lg:px-[10%]">
        <div className="mx-auto grid max-w-6xl gap-4">
          {shippingSections.map((section) => (
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
          <h2 className="text-2xl font-semibold">Shipping Support</h2>
          <p className="mt-3 text-sm leading-7 text-amber-100">
            For delivery issues, share your order ID and registered phone number
            for faster support.
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
          </div>
        </div>
      </section>
    </div>
  );
}
