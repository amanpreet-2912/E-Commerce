import { useState } from "react";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";

export default function AddressSection({
  addresses,
  selectedAddress,
  setSelectedAddress,
  createAddress,
  fetchAddresses,
}) {
  const [showForm, setShowForm] = useState(false);
  console.log(addresses);
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Select Address</h3>

      <div className="space-y-3 mb-4">
        {addresses?.map((addr) => (
          <AddressCard
            key={addr._id}
            addr={addr}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        ))}
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="text-primary text-sm font-medium hover:underline"
      >
        + Add New Address
      </button>

      {showForm && (
        <AddressForm
          createAddress={createAddress}
          fetchAddresses={fetchAddresses}
          closeForm={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
