import PostPreviews from "@/components/post-previews";
import { getAllCategories, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const allCategories = await getAllCategories();
    return allCategories.map(({ slug }) => ({ slug }))
}


export default async function Category({ params: { slug }}: { params: { slug: string }}) {
    const [categories, posts] = await Promise.all([getAllCategories(), getAllPosts()]);
    const category = categories.find(({ slug: categorySlug }) => categorySlug === slug);
    if (!category) {
        return notFound();
    }
    return <>
        <i>{category.name}</i>
        <PostPreviews posts={posts.filter(({ slug }) => category.posts.some(({ slug: postSlug }) => postSlug === slug))} />
    </>
}