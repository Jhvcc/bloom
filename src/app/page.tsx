import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to the words learning module by default
  redirect("/words")
}
