import { auth } from "@/auth";
import { cookies } from "next/headers";
import { getCategories, getNotes } from "../lib/notes";
import PageHeader from "../components/PageHeader";
import HomeClientPage from "./HomeClientPage";

export default async function Home() {
  const session = await auth();
  const role = (session as any)?.role as string | undefined;
  const viewAs = (await cookies()).get('viewAs')?.value;
  const username = role === 'dm' && viewAs ? viewAs : ((session as any)?.player || "");
  const allCategories = getCategories();
  const filteredCategories: string[] = [];
  for (const cat of allCategories) {
    if (username === "DM") {
      filteredCategories.push(cat);
      continue;
    }
    if (cat === "post_session_notes") {
      filteredCategories.push(cat);
      continue;
    }
    if (
      getNotes(cat, username).some((n) => (n.players || []).includes(username))
    ) {
      filteredCategories.push(cat);
    }
  }

  return (
    <div>
      <PageHeader title="The Everpresent Past" />
      <HomeClientPage categories={filteredCategories} />
    </div>
  );
}
