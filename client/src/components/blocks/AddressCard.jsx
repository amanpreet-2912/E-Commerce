import { Badge } from "../ui/badge";



export default function AddressCard({
  addr,
  selectedAddress,
  setSelectedAddress,
}) {
 
  return (
    <div
      onClick={() => setSelectedAddress(addr._id)}
      className={`relative border rounded-xl p-4 cursor-pointer transition ${
        selectedAddress === addr._id
          ? "border-primary bg-primary/5 shadow-sm"
          : "hover:border-gray-400"
      }`}
    >
      
      {addr.default && (
        
        <Badge className="absolute top-2 right-2 text-background">
          Default
        </Badge>
        
       
      )}

      <p className="font-medium">{addr.fullname}</p>

      <p className="text-sm text-gray-600">
        {addr.addressLine}, {addr.city}, {addr.state}, {addr.pincode}
      </p>
    </div>
  );
}
