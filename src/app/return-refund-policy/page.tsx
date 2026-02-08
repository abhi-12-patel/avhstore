"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ReturnRefundPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-3xl md:text-4xl tracking-[0.4em] text-foreground">
              RETURN &amp; REFUND POLICY
            </h1>
          </div>
        </section>

        <section className="py-16 bg-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-background border border-border rounded-lg p-8 md:p-12 shadow-sm">
              <div className="font-body text-muted-foreground leading-relaxed text-sm md:text-base space-y-5">
                <p>
                  We do not have exchange/refund. However, in case of damaged products, to qualify and be accepted
                  for a return or exchange, an unboxing video is mandatory to claim any damage to the products
                  purchased.
                </p>
                <p>
                  Without providing a full video proof (from opening the seal of the package till the end without
                  any edits, cuts, or filters), the return request shall be declined immediately. Any product
                  damaging at your hands cannot be accepted for refund.
                </p>
                <p>
                  If approved for return, ensure the product is in its original condition and accompanied by all
                  original packaging, including the jewelry boxes.
                </p>
                <p>
                  Once your product for return is received, allow 2 business days for the refunds to be credited
                  back to your bank used for purchase.
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

export default ReturnRefundPolicy;
