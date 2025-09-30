import UserForm from "@/components/UserForm";
import { redirect } from "next/navigation";
export default function Home() {
  redirect("/users");
}
