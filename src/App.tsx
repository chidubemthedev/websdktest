import { useEffect } from "react";

declare global {
  interface Window {
    MonnifySDK?: any;
  }
}

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.monnify.com/plugin/monnify.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePay = () => {
    if (!window.MonnifySDK) {
      alert("Monnify SDK not loaded yet");
      return;
    }

    window.MonnifySDK.initialize({
      amount: 2000,
      currency: "NGN",
      reference: `ref-${Date.now()}`,
      customerName: "Test User",
      customerEmail: "test@example.com",
      apiKey: "MK_TEST_EKRPJY638A", // Replace with test key
      contractCode: "7059707855", // Replace with test contract
      paymentDescription: "Test payment",
      isTestMode: true,
      onComplete: function (response: any) {
        console.log("✅ onComplete fired:", response);
        alert("Payment completed!");
      },
      onClose: function (data: any) {
        console.log("❌ onClose fired:", data);
        alert("Payment window closed");
      },
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Monnify Web SDK Test</h1>
      <button onClick={handlePay}>Pay with Monnify</button>
    </div>
  );
}

export default App;
