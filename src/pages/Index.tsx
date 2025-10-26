import { useState } from "react";
import { StarRating } from "@/components/StarRating";
import { PrivateFeedback } from "@/components/PrivateFeedback";
import { Card } from "@/components/ui/card";
import fatboyLogo from "@/assets/fatboy-logo.png";

const GOOGLE_PLACE_ID = "ChIJi0vnrExx14ARCFbYG3xvPqo";

const Index = () => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);

    if (rating >= 4) {
      // Redirect to Google Reviews for 4-5 stars
      const googleReviewUrl = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;
      window.location.href = googleReviewUrl;
    } else {
      // Show private feedback form for 1-3 stars
      setShowFeedback(true);
    }
  };

  const handleCloseFeedback = () => {
    setShowFeedback(false);
    setSelectedRating(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-2xl mx-auto text-center shadow-2xl border-2 border-border p-8 md:p-12 bg-card">
        <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <img 
            src={fatboyLogo} 
            alt="Fatboy Restaurant Logo" 
            className="w-64 md:w-80 mx-auto mb-6"
          />
          <p className="text-sm md:text-base text-muted-foreground">
            Gracias por tu calificación
          </p>
        </div>

        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <StarRating onRatingSelect={handleRatingSelect} />
        </div>

        {showFeedback && selectedRating && (
          <PrivateFeedback rating={selectedRating} onClose={handleCloseFeedback} />
        )}
      </Card>
    </div>
  );
};

export default Index;
