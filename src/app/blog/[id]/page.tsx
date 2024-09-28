import allPosts from '@/data/allclean.json';
import Posts from "@/components/blog";

export default function Home({ params }: { params: { id: string } }) {

  return (
    <main className="flex min-h-screen flex-col items-center max-w-fit">
      <Posts index={params.id} allPosts={allPosts}></Posts>
    </main >
  );
}
