import { Star } from "lucide-react";

export const StarRating = ({ value, size = 14 }: { value: number; size?: number }) => (
  <span className="inline-flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => {
      const filled = i < Math.round(value);
      return (
        <Star key={i} size={size} strokeWidth={1.5} className="transition-all"
          style={{
            color: filled ? "#C9A84C" : "rgba(201,168,76,0.55)",
            fill: filled ? "#C9A84C" : "transparent",
            filter: filled ? "drop-shadow(0 0 4px rgba(201,168,76,0.6))" : "none",
          }} />
      );
    })}
  </span>
);
