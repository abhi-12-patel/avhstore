import Link from "next/link";
import { Gem, HeartHandshake, Leaf, Sparkles, Target, Telescope } from "lucide-react";

export const metadata = {
  title: "About Us | AVH STORE",
  description: "Discover AVH STORE's story, mission, vision, and values.",
};

const values = [
  {
    title: "Design With Purpose",
    text: "Every collection balances trend and timelessness, so your jewellery stays relevant season after season.",
    icon: Sparkles,
  },
  {
    title: "Quality You Can Feel",
    text: "From finish to fit, we focus on durable craftsmanship and comfort for long daily wear.",
    icon: Gem,
  },
  {
    title: "Trust In Every Order",
    text: "Clear communication, honest pricing, and responsive service are part of every purchase.",
    icon: HeartHandshake,
  },
  {
    title: "Responsible Thinking",
    text: "We keep improving our sourcing and packaging with a mindful, low-waste approach.",
    icon: Leaf,
  },
];

const highlights = [
  "Curated festive and daily-wear collections",
  "Comfort-first lightweight designs",
  "Fast support and smooth order communication",
  "Secure checkout with transparent pricing",
];

const trustStats = [
  { label: "Happy Customers", value: "568" },
  { label: "Products Listed", value: "50+" },
  { label: "Cities Served", value: "50+" },
  { label: "Support Response", value: "<24 hrs" },
];

const timeline = [
  {
    year: "2025",
    title: "Brand Started",
    text: "AVH STORE started in 2025 with a focused jewellery collection and customer-first selling approach.",
  },
  {
    year: "July 2025",
    title: "Meesho Store Added",
    text: "Expanded reach by launching AVH STORE on Meesho in July 2025.",
  },
  {
    year: "2026",
    title: "Website Launch",
    text: "Launched the AVH STORE website in 2026 to deliver a direct and premium shopping experience.",
  },
];

const faqs = [
  {
    q: "How do I choose the right product?",
    a: "You can browse by category and check product descriptions for details, finish, and styling.",
  },
  {
    q: "Do you provide support after order placement?",
    a: "Yes. Our team helps with order status, delivery concerns, and post-order assistance.",
  },
  {
    q: "Can I gift products from AVH STORE?",
    a: "Absolutely. Most products are suitable for gifting and festive occasions.",
  },
  {
    q: "Where can I contact your team?",
    a: "Use the Contact page and we will respond as quickly as possible.",
  },
];

export default function OurStory() {
  return (
    <div className="bg-[#fcfbf8] text-gray-900 mainCatgeroryContainer">
      <section className="relative overflow-hidden px-5 pb-16 pt-24 lg:px-[10%] lg:pt-16">
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute -right-16 top-12 h-60 w-60 rounded-full bg-orange-200/35 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.26em] text-amber-800">
              About AVH STORE
            </p>
            <h1 className="text-[clamp(2.2rem,6vw,4.6rem)] font-semibold leading-[1.05] text-[#1f1b16]">
              Jewellery That
              <br />
              Feels Personal.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-700">
              AVH STORE creates expressive jewellery for everyday confidence.
              We mix statement aesthetics with practical comfort so every piece
              looks premium and feels easy to wear.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/collections"
                className="rounded-full bg-[#1f1b16] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black"
              >
                Explore Collections
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-[#1f1b16] px-6 py-3 text-sm font-medium text-[#1f1b16] transition-colors hover:bg-[#1f1b16] hover:text-white"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80"
                  alt="AVH premium jewellery showcase"
                  className="h-56 w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80"
                  alt="Detailed jewellery work"
                  className="h-36 w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl bg-[#1f1b16] p-5 text-white shadow-lg">
                <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Our Promise</p>
                <p className="mt-2 text-lg font-semibold leading-6">
                  Premium look,
                  <br />
                  everyday wear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-8 lg:px-[10%]">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex rounded-full bg-amber-100 p-2 text-amber-700">
              <Target size={18} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
            <p className="mt-3 leading-7 text-gray-700">
              To make high-style jewellery approachable and dependable, helping
              customers express identity through pieces that feel beautiful and practical.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex rounded-full bg-slate-100 p-2 text-slate-700">
              <Telescope size={18} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Our Vision</h2>
            <p className="mt-3 leading-7 text-gray-700">
              To become one of India's most trusted fashion-jewellery brands,
              known for design quality, customer-first service, and long-term value.
            </p>
          </article>
        </div>
      </section>

      <section className="px-5 pb-8 lg:px-[10%]">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-12">
          <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-7">
            <h2 className="text-2xl font-semibold text-gray-900">Our Story</h2>
            <p className="mt-3 leading-7 text-gray-700">
              We started AVH STORE to make jewellery shopping simple, stylish,
              and reliable. What began as a small curated collection has grown
              into a brand focused on wearable designs for modern Indian women.
            </p>
            <p className="mt-3 leading-7 text-gray-700">
              Today, we continue to improve design quality, customer experience,
              and post-purchase support so every order feels worth it.
            </p>
          </article>

          <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-5">
            <h3 className="text-xl font-semibold text-gray-900">What You Get</h3>
            <ul className="mt-4 space-y-3 text-gray-700">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-amber-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="px-5 pb-20 lg:px-[10%]">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold text-[#1f1b16]">Our Values</h2>
          <p className="mt-2 text-gray-600">
            The principles that shape every product and every customer experience.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article
                  key={value.title}
                  className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-4 inline-flex rounded-full bg-gray-100 p-2 text-gray-700 transition-colors group-hover:bg-[#1f1b16] group-hover:text-white">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
                  <p className="mt-2 leading-7 text-gray-600">{value.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 lg:px-[10%]">
        <div className="mx-auto max-w-6xl rounded-2xl bg-[#1f1b16] px-6 py-8 text-white lg:px-10">
          <h2 className="text-2xl font-semibold">Why Customers Trust AVH</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {trustStats.map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/10 p-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-amber-100">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 lg:px-[10%]">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-12">
          <div className="lg:col-span-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"
              alt="Timeline journey visual"
              className="h-full min-h-[250px] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-8">
            <h2 className="text-3xl font-semibold text-[#1f1b16]">Our Journey</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {timeline.map((step) => (
                <article key={step.year} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                    {step.year}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 leading-7 text-gray-600">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 lg:px-[10%]">
        <div className="mx-auto grid max-w-6xl gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:grid-cols-12 lg:p-8">
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=700&q=80"
                alt="Owner portrait"
                className="h-56 w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="lg:col-span-9">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Founder Note</p>
            <h2 className="mt-2 text-2xl font-semibold text-gray-900">Built for Real Everyday Style</h2>
            <p className="mt-4 leading-7 text-gray-700">
              AVH STORE is built on one simple idea: jewellery should look premium, feel comfortable,
              and stay easy to style. Every update we make is guided by customer feedback and practical design.
            </p>
            <p className="mt-4 text-sm font-medium text-gray-900">- Team AVH STORE</p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 lg:px-[10%]">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold text-[#1f1b16]">FAQs</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <summary className="cursor-pointer list-none font-semibold text-gray-900">
                  {item.q}
                </summary>
                <p className="mt-2 leading-7 text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
