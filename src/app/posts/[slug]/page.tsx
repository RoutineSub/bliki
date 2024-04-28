import { getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import PostComponent from '@/components/post';
import { Metadata, ResolvingMetadata } from "next";

export async function generateStaticParams() {
    const allPosts = await getAllPosts();
    return allPosts.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }, parent: ResolvingMetadata): Promise<Metadata> {
    const post = (await getAllPosts()).find(({ slug: postSlug }) => postSlug === slug);
    if(post) {
        return { title: post.name };
    }
    return {};
}

export default async function PostPage({ params: { slug } }: { params: { slug: string } }) {
    const post = (await getAllPosts()).find(({ slug: postSlug }) => postSlug === slug);
    if (!post) {
        return notFound();
    }
    return <PostComponent post={post} />
}