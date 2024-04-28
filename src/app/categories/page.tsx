import CategoryList from "@/components/category-list";
import { getAllCategories } from "@/lib/posts";


export default async function AllCategories() {
    return <>
    <i>all categories</i>
    <CategoryList categories={(await getAllCategories()).filter(({ posts }) => posts.length > 0)} />
    </> 
}