import { auth } from "@/auth";
import { getNote } from "../../../lib/notes";
import { notFound } from "next/navigation";
import PageHeader from "../../../components/PageHeader";
import SlugClientPage from "./SlugClientPage";

export default async function SlugPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const session = await auth();
  const username = (session as any)?.player as string | undefined;
  if (!username) {
    notFound();
  }
  const category = resolvedParams.category;
  if (!category) {
    notFound();
  }
  const note = getNote(category, resolvedParams.slug, username);
  if (!note) {
    notFound();
  }
  return (
    <div>
      <PageHeader title={note.title} image={note.image} />
      <SlugClientPage category={resolvedParams.category} note={note} />
    </div>
  );
}
