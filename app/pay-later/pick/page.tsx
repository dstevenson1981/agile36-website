import { redirect } from "next/navigation";

export default function PayLaterPickRedirect() {
  redirect("/account/login?next=/account");
}
