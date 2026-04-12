import axios from "axios";

export default function Razorpay() {
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    // Step 1: Create order from backend
    const { data: order } = await axios.post(
      "http://localhost:5000/api/payment/test",
      { amount: 500 },
    );

    // Step 2: Open Razorpay
    const options = {
      key: "rzp_test_SQCOoKLMQioM0W",
      amount: order.amount,
      currency: "INR",
      name: "My Store",
      description: "Order Payment",
      order_id: order.id,

      handler: async function (response) {
        // Step 3: Verify payment
        const verifyRes = await axios.post(
          "http://localhost:5000/api/payment/test",
          response,
        );
        console.log("verifyREs");
        console.log(verifyRes); 
        if (verifyRes.data.success) {
          alert("Payment successful 🎉");
        } else {
          alert("Payment verification failed");
        }
      },

      prefill: {
        name: "Amanpreet",
        email: "test@example.com",
      },

      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <h1>This is for razorpay</h1>
      <button onClick={handlePayment}>CLick Me</button>
    </>
  );
}
