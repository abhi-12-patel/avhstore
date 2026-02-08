"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-16">
            {/* Our Location */}
            <section>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6 italic">
                Our Location
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                Baithul Thahoor, H18, Paradise colony, near MSS health centre, AWH college road, p.o Kallai, Calicut,<br />
                Kerala Pin- 673003
              </p>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6 italic">
                Contact Us
              </h2>
              <div className="space-y-2">
                <p className="font-body text-muted-foreground">
                  (+91) 6238695004
                </p>
                <p className="font-body text-muted-foreground">
                  thauya9@gmail.com
                </p>
              </div>
            </section>

            {/* Inquiries */}
            <section>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6 italic">
                Inquiries
              </h2>
              <p className="font-body text-muted-foreground">
                For any inquiries about orders, please whatsapp us to (+91) 6238695004
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
