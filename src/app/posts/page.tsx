import PostPreviews from "@/components/post-previews";
import { getAllPosts } from "@/lib/posts";


export default async function AllPosts() {
    return <>
    <i>all posts</i>
    <PostPreviews posts={(await getAllPosts()).filter(({ discoverable }) => discoverable)} />
    </> 
}