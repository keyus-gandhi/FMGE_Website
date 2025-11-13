import { X } from "lucide-react";

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    title: string;
    icon: React.ReactNode;
    shortDesc: string;
    fullDesc: string;
    benefits: string[];
    details: string[];
  } | null;
}

export default function FeatureModal({
  isOpen,
  onClose,
  feature,
}: FeatureModalProps) {
  if (!isOpen || !feature) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="sticky top-4 right-4 float-right z-50 p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X size={24} className="text-muted-foreground" />
          </button>

          {/* Content */}
          <div className="p-8">
            {/* Icon and Title */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white flex-shrink-0">
                {feature.icon}
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                {feature.title}
              </h2>
            </div>

            {/* Short Description */}
            <p className="text-lg text-muted-foreground mb-6">
              {feature.shortDesc}
            </p>

            {/* Full Description */}
            <div className="mb-8">
              <p className="text-foreground leading-relaxed">
                {feature.fullDesc}
              </p>
            </div>

            {/* Benefits Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Key Benefits
              </h3>
              <ul className="space-y-3">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center text-white mt-0.5 flex-shrink-0">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Details Section */}
            {feature.details.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  How It Works
                </h3>
                <div className="space-y-4">
                  {feature.details.map((detail, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="text-sm font-bold text-primary bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-muted-foreground pt-1">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Button */}
            <button
              onClick={onClose}
              className="w-full btn-primary mt-6"
            >
              Get Started with {feature.title}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
