import { redirect } from "next/navigation";

export default function BrandsPage() {
  redirect("/checkout?step=brand");
}
