"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-3xl md:text-4xl tracking-[0.4em] text-foreground">
              SHIPPING &amp; DELIVERY POLICY
            </h1>
          </div>
        </section>

        <section className="py-16 bg-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-background border border-border rounded-lg p-8 md:p-12 shadow-sm">
              <div className="font-body text-muted-foreground leading-relaxed text-sm md:text-base space-y-6">
                <ul className="list-disc list-inside space-y-2">
                  <li>All products are shipped through India Post, both domestic and international couriers.</li>
                  <li>
                    All domestic orders placed are expected to deliver in 3 to 10 days approximately, depending on
                    the distance.
                  </li>
                </ul>

                <p>
                  Make sure you give your proper and full address with correct number and after placing your order,
                  stay alert on phone calls because the delivery boy might call you any time.
                </p>
                <p>
                  In case the package gets returned back to us, you will have to pay the shipping charges again
                  (49 rs.). So make sure you give your correct address and number and pick up the call when the
                  postman tries to deliver it to you. There will be no refund or such.
                </p>
                <p>
                  And if you are from north, west or east of India, please keep in mind, sometimes the delivery
                  might take a little bit long for you as we are sending it all the way from Kerala.
                </p>

                <div className="space-y-3">
                  <p>💕 We will be using DTDC for Kerala &amp; India Post for every other state.</p>
                  <p>
                    💕 Once the order is dispatched from our side, you will get an email with your tracking ID along
                    with the tracking link. Please keep tracking your order, not to miss your order during delivery.
                    It will be your responsibility to track your order, because that’s why we send you email the
                    tracking ID along with the tracking link.
                  </p>
                  <p>
                    And please keep in mind that we don’t have logistics of our own like Amazon and Flipkart, so we
                    use third-party courier services. So it will be your responsibility to keep a track on your
                    parcel once we dispatch it from our side (like I said that’s why we provide you with the tracking
                    ID).
                  </p>
                </div>

                <div className="space-y-3">
                  <p>
                    💕 If there is no unboxing video, ANY KIND OF COMPLAINTS WILL BE STRAIGHTLY DECLINED (no excuse
                    on that). So make sure you take an unboxing video to avoid any inconvenience.
                  </p>
                  <p>
                    The unboxing videos should start with showing the Parcel 360° and then the video should be with
                    no edits &amp; trim in between. Any of these acts will lead straightly to declining of the
                    complaint.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ShippingPolicy;
