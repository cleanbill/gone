import allPosts from '@/data/allclean.json';
import Posts from "@/components/posts";

export default async function Home({ params }: { params: { id: string } }) {

  const { id } = await params;

  return (
    <main className="flex min-h-screen flex-col items-center max-w-fit">
      <Posts index={id} allPosts={allPosts}></Posts>
    </main >
  );
}
