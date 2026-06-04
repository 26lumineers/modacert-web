import { redirect } from "next/navigation";

export default function UploadPage() {
  redirect("/checkout?step=upload");
}
