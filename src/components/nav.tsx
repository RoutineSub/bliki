import CategoryList from "@/components/category-list"
import PostList from "@/components/post-list"
import { Category } from "@/lib/posts"
import Link from "next/link"

function SideBarContainer({ title, children }: React.PropsWithChildren<{ title: string }>) {
    return <div className="bg-base2 dark:bg-base02 m-3 w-full rounded border-base1 dark:border-base01 border p-1 text-sm">
        <h3 className="text-xl md:text-2xl text-base01 dark:text-base1">{title}</h3>
        {children}
    </div>
    
}

function RecentPosts({ posts }: { posts: Parameters<typeof PostList>[0]['posts'] }) {
    return <SideBarContainer title="Recent Posts">
        <PostList posts={posts.slice(0, 27)} />
        <Link href={"/posts"}>See All</Link>
    </SideBarContainer>
}

function PopularCategories({ categories }: { categories: Category[] }) {
    return <SideBarContainer title="Popular Categories">
        <CategoryList categories={categories.slice(0, 27)} />
        <Link href={"/categories"}>See All</Link>
    </SideBarContainer>
    
}

export default function Nav({ posts, categories }: Parameters<typeof PopularCategories>[0] & Parameters<typeof RecentPosts>[0]) {
return  <nav className="flex flex-row md:flex-col">
        <RecentPosts posts={posts} />
        <PopularCategories categories={categories} />
    </nav>
}