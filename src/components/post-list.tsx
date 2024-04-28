import { Post } from "@/lib/posts";
import Link from "next/link";

export default function PostList({ posts }: { posts: Pick<Post, 'timestamp'|'slug'|'name'>[] }) {
    return <ol>
        {posts.map(({slug, name, timestamp}) => <li key={slug}><Link href={`/posts/${slug}`}><b>{name}</b> on {timestamp.toLocaleDateString('en-us')}</Link></li>)}
    </ol>
}