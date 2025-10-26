import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface PrivateFeedbackProps {
  rating: number;
  onClose: () => void;
}

export const PrivateFeedback = ({ rating, onClose }: PrivateFeedbackProps) => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      toast.error("Por favor escribe tu comentario");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission - in a real app, this would send to a backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Private feedback:", { rating, feedback });
    
    toast.success("¡Gracias por tu feedback! Nos ayuda a mejorar.");
    setIsSubmitting(false);
    
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-foreground mb-2">
          Cuéntanos qué podemos mejorar
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Tu opinión es privada y nos ayudará a ofrecerte un mejor servicio.
        </p>
        
        <Textarea
          placeholder="Escribe aquí tu comentario..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="min-h-[120px] resize-none mb-4"
          disabled={isSubmitting}
        />
        
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-primary hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
        </div>
      </div>
    </div>
  );
};
