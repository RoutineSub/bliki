import { type Post } from "@/lib/posts";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "./markdown-components";
import { Titillium_Web } from "next/font/google";

const titillium = Titillium_Web({ subsets: ['latin'], weight: '300' });

function CategoryList({ categories }: { categories: Post['categories']}) {
    return <div className="text-sm">Filed Under: { categories.map(({ slug, name: categoryName}, i) => <>
        <Link key={slug} href={`/categories/${slug}`}>{categoryName}</Link>
        {categories.length - 1 > i ? ', ' : null}
        </>) }</div>
}

function PostHeader({ post: { name, timestamp, categories} }: { post: Post}) { 
    return <>
        <h2 className={`${titillium.className} text-5xl md:text-6xl text-base01 dark:text-base1 font-bold`}>{name}</h2>
        <div className="text-sm">Last updated on {timestamp.toLocaleDateString('en-US')}</div>
        <CategoryList categories={categories} />
    </>
}

export default async function Post({ post }: { post: Post }) {
    return <>
        <PostHeader post={post} />
        <hr className="my-3 border-base1 dark:border-base01" />
        <article className="block mt-3">
            <MDXRemote source={post.body} components={mdxComponents} />
        </article>
    </>
}