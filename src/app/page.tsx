import { getAllPosts } from "@/lib/posts";
import PostPreviews from "@/components/post-previews";

export default async function Home() {
  const allPosts = await getAllPosts();
  return <>
    <i>Latest Posts</i>
    <PostPreviews posts={allPosts.filter(({ discoverable }) => discoverable).slice(0, 3)} />
  </>
}
