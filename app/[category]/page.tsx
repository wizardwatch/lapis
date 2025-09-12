import { cookies } from "next/headers";
import { getNotes } from "../../lib/notes";
import { titleCase } from "../../lib/notes/utils";
import PageHeader from "../../components/PageHeader";
import CategoryClientPage from "./CategoryClientPage";

export default async function CategoryPage({
  params,
}: { params: { category: string } } & any) {
  const resolvedParams = await params;
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value || "";

  const category = resolvedParams.category;

  let notes = getNotes(category, username);
  if (username !== "DM") {
    notes = notes.filter(
      (n) =>
        n.category === "post_session_notes" ||
        (n.players || []).includes(username),
    );
  }
  return (
    <div>
      <PageHeader title={titleCase(resolvedParams.category)} />
      <CategoryClientPage
        category={resolvedParams.category}
        notes={notes.map(({ slug, title, players, category, content }) => ({
          slug,
          title,
          players,
          category,
          content,
        }))}
      />
    </div>
  );
}
