import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const SizeGuide = ({ isOpen, onClose }: SizeGuideProps) => {
  if (!isOpen) return null;

  const ringChart = [
    { us: '5', uk: 'J', eu: '49', diameter: '15.7mm' },
    { us: '5.5', uk: 'K', eu: '50', diameter: '16.1mm' },
    { us: '6', uk: 'L', eu: '51', diameter: '16.5mm' },
    { us: '6.5', uk: 'M', eu: '52', diameter: '16.9mm' },
    { us: '7', uk: 'N', eu: '54', diameter: '17.3mm' },
    { us: '7.5', uk: 'O', eu: '55', diameter: '17.7mm' },
    { us: '8', uk: 'P', eu: '57', diameter: '18.1mm' },
  ];

  const braceletChart = [
    { size: 'XS', wrist: '5.5" - 6"', length: '6.5"' },
    { size: 'S', wrist: '6" - 6.5"', length: '7"' },
    { size: 'M', wrist: '6.5" - 7"', length: '7.5"' },
    { size: 'L', wrist: '7" - 7.5"', length: '8"' },
    { size: 'XL', wrist: '7.5" - 8"', length: '8.5"' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-foreground/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-sm p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="font-display text-3xl text-foreground mb-2">Size Guide</h2>
        <p className="font-body text-muted-foreground mb-8">
          Find your perfect fit with our comprehensive sizing charts.
        </p>

        {/* Ring Sizes */}
        <div className="mb-10">
          <h3 className="font-display text-xl text-foreground mb-4">Ring Sizes</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 font-body text-sm text-muted-foreground font-medium">US</th>
                  <th className="pb-3 font-body text-sm text-muted-foreground font-medium">UK</th>
                  <th className="pb-3 font-body text-sm text-muted-foreground font-medium">EU</th>
                  <th className="pb-3 font-body text-sm text-muted-foreground font-medium">Diameter</th>
                </tr>
              </thead>
              <tbody>
                {ringChart.map((row, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="py-3 font-body text-sm text-foreground">{row.us}</td>
                    <td className="py-3 font-body text-sm text-foreground">{row.uk}</td>
                    <td className="py-3 font-body text-sm text-foreground">{row.eu}</td>
                    <td className="py-3 font-body text-sm text-foreground">{row.diameter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-cream rounded-sm">
            <h4 className="font-display text-lg text-foreground mb-2">How to Measure</h4>
            <ol className="font-body text-sm text-muted-foreground space-y-2">
              <li>1. Wrap a piece of string or paper around your finger.</li>
              <li>2. Mark where the ends meet.</li>
              <li>3. Measure the length with a ruler in millimeters.</li>
              <li>4. Compare to the diameter column above.</li>
            </ol>
          </div>
        </div>

        {/* Bracelet Sizes */}
        <div className="mb-10">
          <h3 className="font-display text-xl text-foreground mb-4">Bracelet Sizes</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 font-body text-sm text-muted-foreground font-medium">Size</th>
                  <th className="pb-3 font-body text-sm text-muted-foreground font-medium">Wrist Circumference</th>
                  <th className="pb-3 font-body text-sm text-muted-foreground font-medium">Bracelet Length</th>
                </tr>
              </thead>
              <tbody>
                {braceletChart.map((row, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="py-3 font-body text-sm text-foreground">{row.size}</td>
                    <td className="py-3 font-body text-sm text-foreground">{row.wrist}</td>
                    <td className="py-3 font-body text-sm text-foreground">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Necklace Lengths */}
        <div>
          <h3 className="font-display text-xl text-foreground mb-4">Necklace Lengths</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { length: '16"', name: 'Choker', description: 'Sits close to the neck' },
              { length: '18"', name: 'Princess', description: 'Sits on the collarbone' },
              { length: '20"', name: 'Matinee', description: 'Sits below the collarbone' },
              { length: '24"', name: 'Opera', description: 'Sits at the bust line' },
            ].map((item) => (
              <div key={item.length} className="p-4 border border-border rounded-sm">
                <span className="font-display text-lg text-primary block mb-1">{item.length}</span>
                <span className="font-body text-sm text-foreground block">{item.name}</span>
                <span className="font-body text-xs text-muted-foreground">{item.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mt-8 p-4 bg-secondary rounded-sm text-center">
          <p className="font-body text-sm text-muted-foreground">
            Still unsure about your size? <a href="/contact" className="text-primary hover:underline">Contact our specialists</a> for personalized assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
