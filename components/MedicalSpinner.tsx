export default function MedicalSpinner({ size = "lg", className = "" }) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div className={`${sizeClasses[size as keyof typeof sizeClasses]} ${className}`}>
      <svg
        className="w-full h-full text-primary animate-spin"
        viewBox="0 0 50 50"
        fill="none"
      >
        {/* Outer circle - heartbeat line effect */}
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.2"
        />
        
        {/* ECG/Heartbeat line - animated */}
        <path
          d="M 5 25 L 10 25 L 12 20 L 14 30 L 18 25 L 25 25 L 27 22 L 29 28 L 33 25 L 45 25"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            animation: "heartbeat 1.5s ease-in-out infinite",
          }}
        />
      </svg>

      <style>{`
        @keyframes heartbeat {
          0%, 100% {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
          }
          50% {
            stroke-dasharray: 100;
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
