import React from 'react';

const ContactForm = () => {
  return (<div className="min-h-screen flex flex-col mainProductDitailsContainer">
      <main className="flex-1 py-16 ">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-16">
            {/* Our Location */}
            <section>
              <h2 className="font-display text-3xl md:text-4xl text-black mb-6 italic">
                Our Location
              </h2>
          <p className="font-body text-black leading-relaxed">
  C/O 133, <strong>Laxmi Palace</strong>, Street No. 5, Radha Nagar,
  Radha Nagar Society, Chandreshnagar, Rajkot, Gujarat
  pin-<strong className="text-primary">360004</strong>
</p>

            </section>

            {/* Contact Us */}
            <section>
              <h2 className="font-display text-3xl md:text-4xl text-black mb-6 italic">
                Contact Us
              </h2>
              <div className="space-y-2">
                <p className="font-body  text-black">
                  (+91) 9016457163
                </p>
                <p className="font-body  text-black">
                  abhihothi524@gmail.com
                </p>
              </div>
            </section>

            {/* Inquiries */}
            <section>
              <h2 className="font-display text-3xl md:text-4xl text-black mb-6 italic">
                Inquiries
              </h2>
              <p className="font-body  text-black">
                For any inquiries about orders, please whatsapp us to (+91) 9016457163
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactForm;
