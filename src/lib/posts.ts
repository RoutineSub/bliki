import { readdir, stat, readFile } from 'node:fs/promises'
import { resolve, extname, basename } from 'node:path';
import { cache } from 'react';
import matter from 'gray-matter';
import { z } from 'zod'; 
import { timeStamp } from 'node:console';
import { Tomorrow } from 'next/font/google';

export type Category = {
    slug: string,
    name: string,
    posts: Omit<Post, 'body' | 'categories'>[];
}

export type Post = {
    slug: string;
    name: string;
    body: string;
    discoverable: boolean;
    categories: Omit<Category, 'posts'>[];
    timestamp: Date;
}

const postsDir = resolve(new URL(import.meta.url).pathname, '../../posts');
const postData = z.object({
    name: z.string(),
    categories: z.array(z.string().transform(name => ({ name, slug: name.replaceAll(/[^\w\s]/g,'').replaceAll(/\s+/g, '-').toLowerCase()}))).default([]),
    discoverable: z.boolean().default(true)
})

export const getAllPosts = cache(async (): Promise<Post[]> => {
    const files = await readdir(postsDir);
    const results = await Promise.allSettled(files.filter(name => extname(name) === '.mdx')
        .map(async (name): Promise<Post> => {
            const postFile = resolve(postsDir, name)
            const [
                fileContent,
                { mtime }
            ] = await Promise.all([
                readFile(postFile),
                stat(postFile)
            ])
            const { data, content } = matter(fileContent);
            const parsedData = postData.parse(data)
            return {
                ...parsedData,
                slug: basename(postFile, '.mdx'),
                body: content,
                timestamp: mtime
            }
        }));
    results.forEach(r => {
        if (r.status === 'rejected') {
            console.error(r.reason);
        }
    })
    return results.filter((r): r is PromiseFulfilledResult<Post> => r.status === 'fulfilled').map(r => r.value).sort(({ timestamp: timestampA }, { timestamp: timestampB }) => timestampB.getTime() - timestampA.getTime());
})

export const getAllCategories = cache(async (): Promise<Category[]> => {
    const allPosts = await getAllPosts();
    return Array.from(allPosts.reduce((categoryMap: Map<string, Category>, { body: _, categories, ...partialPost }: Post): Map<string, Category> => {
        categories.forEach(({ slug, name }) => {
            if(!categoryMap.has(slug)) {
                categoryMap.set(slug, { slug, name, posts: [] });
            }
            if(partialPost.discoverable) {
                categoryMap.get(slug)!.posts.push(partialPost);
            }
        });
        return categoryMap;
    }, new Map()).values()).sort(({ posts: postsA }, { posts: postsB }) => postsB.length - postsA.length);
})
