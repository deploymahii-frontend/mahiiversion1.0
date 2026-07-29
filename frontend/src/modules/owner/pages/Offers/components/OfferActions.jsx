import Button from "@/components/ui/Button";

export default function OfferActions({

  offer,

  onEdit,

  onDelete,

}) {

  return (

    <div className="flex gap-2">

      <Button
        size="sm"
        onClick={() => onEdit(offer)}
      >
        Edit
      </Button>

      <Button
        size="sm"
        variant="destructive"
        onClick={() => onDelete(offer)}
      >
        Delete
      </Button>

    </div>

  );

}
