import { redirect } from "next/navigation";

export default function PaymentPage() {
  redirect("/checkout?step=payment");
}
