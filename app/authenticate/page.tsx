import { redirect } from "next/navigation";

export default function AuthenticatePage() {
  redirect("/checkout?step=category");
}
