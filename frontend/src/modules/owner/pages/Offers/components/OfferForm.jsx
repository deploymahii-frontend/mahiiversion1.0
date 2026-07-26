import Button from "@/components/ui/Button";

export default function OfferForm({

  onSubmit,

}) {

  return (

    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl bg-white p-6 shadow"
    >

      <input
        placeholder="Offer Title"
      />

      <textarea
        placeholder="Description"
      />

      <select>

        <option value="percentage">
          Percentage Discount
        </option>

        <option value="flat">
          Flat Discount
        </option>

      </select>

      <input
        type="number"
        placeholder="Discount Value"
      />

      <input type="date" />

      <input type="date" />

      <Button>

        Save Offer

      </Button>

    </form>

  );

}
