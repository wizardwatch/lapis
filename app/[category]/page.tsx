import { auth } from "@/auth";
import { cookies } from "next/headers";
import { getNotes } from "../../lib/notes";
import { titleCase } from "../../lib/notes/utils";
import PageHeader from "../../components/PageHeader";
import CategoryClientPage from "./CategoryClientPage";

export default async function CategoryPage({
  params,
}: { params: { category: string } } & any) {
  const resolvedParams = await params;
  const session = await auth();
  const role = (session as any)?.role as string | undefined;
  const viewAs = (await cookies()).get('viewAs')?.value;
  const username = role === 'dm' && viewAs ? viewAs : ((session as any)?.player || "");

  const category = resolvedParams.category;

  let notes = getNotes(category, username);
  if (username !== "DM") {
    notes = notes.filter(
      (n) =>
        n.category === "post_session_notes" ||
        (n.players || []).includes(username),
    );
  }
  // Sort notes: first by session number if present, then by title with numeric awareness
  notes.sort((a, b) => {
    const sa = a.session ?? Number.POSITIVE_INFINITY;
    const sb = b.session ?? Number.POSITIVE_INFINITY;
    if (sa !== sb) return sa - sb;
    return a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' });
  });
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
