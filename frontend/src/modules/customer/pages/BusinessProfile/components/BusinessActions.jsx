import { Heart, Share2, Phone, Navigation } from "lucide-react";
import Button from "@/components/ui/Button";

export default function BusinessActions({ business, onFavorite, onShare }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={onFavorite}>
        <Heart size={18} />
        Save
      </Button>
      <Button variant="outline" onClick={onShare}>
        <Share2 size={18} />
        Share
      </Button>
      <Button variant="outline" as="a" href={`tel:${business.phone}`}>
        <Phone size={18} />
        Call
      </Button>
      <Button
        variant="outline"
        as="a"
        target="_blank"
        href={`https://www.google.com/maps/search/?api=1&query=${business.location.coordinates[1]},${business.location.coordinates[0]}`}
      >
        <Navigation size={18} />
        Directions
      </Button>
    </div>
  );
}
