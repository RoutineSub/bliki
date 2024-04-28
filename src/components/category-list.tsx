import { Category } from "@/lib/posts";
import Link from "next/link";

export default function CategoryList({ categories }: { categories: Category[] }) {
    return <ol>
        {categories.map(({slug, name, posts}) => <li key={slug}><Link href={`/categories/${slug}`}><b>{name}</b> {`(${posts.length})`}</Link></li>)}
    </ol>
}