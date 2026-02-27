import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AddressForm({
  createAddress,
  fetchAddresses,
  closeForm,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data)
      await createAddress(data);
      toast.success("Address added");
      reset();
      fetchAddresses();
      closeForm();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <input
        placeholder="Full Name"
        {...register("fullname", { required: true })}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Phone"
        {...register("phone", { required: true })}
        className="w-full border p-2 rounded"
      />

      <input
        placeholder="Address Line"
        {...register("addressLine", { required: true })}
        className="w-full border p-2 rounded"
      />

      <input
        placeholder="City"
        {...register("city", { required: true })}
        className="w-full border p-2 rounded"
      />

      <input
        placeholder="State"
        {...register("state", { required: true })}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Pincode"
        {...register("pincode", { required: true })}
        className="w-full border p-2 rounded"
      />

      <Button type="submit" className="w-full text-background">
        Save Address
      </Button>
    </form>
  );
}