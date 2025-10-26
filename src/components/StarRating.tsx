import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  onRatingSelect: (rating: number) => void;
}

export const StarRating = ({ onRatingSelect }: StarRatingProps) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedStar, setSelectedStar] = useState<number | null>(null);

  const handleStarClick = (rating: number) => {
    setSelectedStar(rating);
    onRatingSelect(rating);
  };

  return (
    <div className="flex gap-2 justify-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = hoveredStar ? star <= hoveredStar : selectedStar ? star <= selectedStar : false;
        
        return (
          <button
            key={star}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(null)}
            className="transition-transform hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            aria-label={`Calificar ${star} ${star === 1 ? 'estrella' : 'estrellas'}`}
          >
            <Star
              className={cn(
                "w-12 h-12 md:w-14 md:h-14 transition-all duration-200",
                isActive 
                  ? "fill-[hsl(var(--star-yellow))] stroke-[hsl(var(--star-yellow))]" 
                  : "fill-transparent stroke-[hsl(var(--star-empty))]"
              )}
              strokeWidth={2}
            />
          </button>
        );
      })}
    </div>
  );
};
