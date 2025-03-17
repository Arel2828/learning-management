"use client";
import { useState } from "react";
import axios from "axios";

import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";
import { useCreatePaymentWallPaymentIntentMutation } from "@/state/api";

interface PaymentProps {
  userId: string;
  price: number;
  currency: string;
  productName: string;
}

const PaymentButton: React.FC<PaymentProps> = ({
  userId,
  price,
  currency,
  productName,
}) => {
  const [createTransactionPaymentWall] =
    useCreatePaymentWallPaymentIntentMutation();

  const [loading, setLoading] = useState(false);
  const { navigateToStep } = useCheckoutNavigation();

  const handlePayment = async () => {
    console.log("Payment details", userId, price, currency, productName);
    setLoading(true);
    try {
      //   const response = await axios.post(
      //     "http://localhost:8001/paymentwall/payment-intent/",
      //     {
      //       userId,
      //       price,
      //       currency,
      //       productName,
      //     }
      //   );

      const transactionDataPaymentWall: Partial<TransactionPaymentWall> = {
        userId,
        productName,
        currency: "usd",
        // paymentProvider: "stripe",
        price,
        // amount: price || 0,
      };

      // @ts-ignore
      // const response =
      //   (await createTransactionPaymentWall(transactionDataPaymentWall),
      //   navigateToStep(3));

      const response = await createTransactionPaymentWall(
        // @ts-ignore
        transactionDataPaymentWall
      );

      if (response.data?.payment_url) {
        window.location.href = response.data.payment_url;
      }

      console.log("Payment response", response.data);
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
};

export default PaymentButton;
