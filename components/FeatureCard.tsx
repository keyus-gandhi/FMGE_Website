interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  onClick?: () => void;
}

export default function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
  onClick,
}: FeatureCardProps) {
  return (
    <button
      onClick={onClick}
      className="card-elevated p-6 md:p-8 hover:scale-105 transition-transform duration-300 cursor-pointer text-left w-full"
      style={{
        animation: `slide-up 0.6s ease-out ${delay}ms both`,
      }}
    >
      <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-white mb-4">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">
        {title}
      </h3>
      <p className="text-muted-foreground">{description}</p>
    </button>
  );
}
