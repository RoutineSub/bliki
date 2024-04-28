import { getAllPosts } from "@/lib/posts";
import Post from '@/components/post';
import Link from "next/link";

function PostExcerpt({ post }: { post: Parameters<typeof Post>[0]['post']}) {
  return <div className="my-2">
    <Post post={{
        ...post,
        body: post.body.split('<preview-break />')[0] + '...'
    }} />
    <div className="flex items-center justify-center mt-[-.5em]"><Link className="bg-base2 dark:bg-base02 rounded border-base1 dark:border-base01 border p-1" href={`/posts/${post.slug}`}>Read More</Link></div>
  </div>
}

export default function PostPreviews({ posts }: { posts: Parameters<typeof Post>[0]['post'][] }) {
  return <>
    {posts.map((post) => <PostExcerpt key={post.slug} post={post} />)}
  </>
}
