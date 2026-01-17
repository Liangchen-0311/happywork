interface ProgressRingProps {
  completed: number;
  total: number;
  size?: number;
  strokeWidth?: number;
}

export const ProgressRing = ({
  completed,
  total,
  size = 80,
  strokeWidth = 6,
}: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = total > 0 ? (completed / total) * 100 : 0;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          className="text-muted"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-primary transition-all duration-500 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-lg font-semibold text-foreground">
          {completed}/{total}
        </span>
      </div>
    </div>
  );
};
