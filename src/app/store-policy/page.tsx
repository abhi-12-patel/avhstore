"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const StorePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-3xl md:text-4xl tracking-[0.4em] text-foreground">
              STORE POLICY
            </h1>
          </div>
        </section>

        <section className="py-16 bg-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-background border border-border rounded-lg p-8 md:p-12 shadow-sm">
              <h2 className="font-display text-xl md:text-2xl text-foreground mb-6">
                Terms &amp; Conditions of Service
              </h2>
              <div className="space-y-5 font-body text-muted-foreground leading-relaxed text-sm md:text-base">
                <p>
                  This website is operated by Thauya. Throughout the site, the terms “we”, “us”, and “our”
                  refer to Thauya. Thauya offers this website, including all information, tools, and services
                  available from this site to you, the user, conditioned upon your acceptance of all terms,
                  policies, and conditions stated here.
                </p>
                <p>
                  By visiting our site and/or purchasing from us, you engage in our service and agree to be
                  bound by the terms and conditions referenced herein and/or available by hyperlink. These
                  Terms apply to all users of the site, including without limitation users who are browsers,
                  customers, vendors, merchants, or contributors of content.
                </p>
                <p>
                  You may not use our products for any illegal or unauthorized purpose nor may you, in the use
                  of the service, violate any laws in your jurisdiction (including but not limited to copyright
                  laws). A breach or violation of any of the terms will result in an immediate termination of
                  your services.
                </p>
                <p>
                  Prices and product accessibility are subject to change without notice. We reserve the right to
                  refuse service to anyone for any reason at any time and to modify or discontinue the service
                  without notice. You agree not to duplicate, sell, resell, or exploit any portion of the service,
                  use of the service, or access to the service without express written permission by us.
                </p>
                <p>
                  Certain products may be available exclusively online and in limited quantities and are subject
                  to return or exchange only according to our Return Policy. We strive to display the images and
                  their colors that appear at this site as accurately as possible. We are not responsible for your
                  computer monitor’s display of any color’s accuracy.
                </p>
                <p>
                  You agree that your comments will not violate any right of any third-party, including copyright,
                  trademark, privacy, personality right. Your submission of personal information through the store
                  is governed by our Privacy Policy.
                </p>
                <p>
                  We do not guarantee or warrant that your use of our service will be timely, secure, error-free,
                  and uninterrupted and are not responsible for any damages arising from your use of our products.
                </p>
                <p>
                  You agree to indemnify, defend, and hold harmless Thauya and its affiliates from any claims or
                  demand arising out of your breach of these terms of services.
                </p>
                <p>
                  These terms are governed by the laws of India and may be updated periodically. Continued use of
                  this site constitutes acceptance of any changes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default StorePolicy;
