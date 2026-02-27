import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

export default function Demo() {
  const { fetchAddresses, addresses } = useUser();
  useEffect(() => {
    (async () => {
      await fetchAddresses();
    })();
  }, []);
  console.log(addresses);

  return (
    <>
      <h1>this is a demo page</h1>
    </>
  );
}
