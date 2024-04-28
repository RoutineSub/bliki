import { getAllCategories, getAllPosts } from "@/lib/posts";
import { MDXRemoteProps } from "next-mdx-remote/rsc"
import { Code } from "bright";
import Link from "next/link"
import Image from "next/image";

export const mdxComponents: MDXRemoteProps['components'] = {
    pre: (props) => <>
                <Code className="block dark:hidden" theme="solarized-dark" { ...props} />
                <Code className="hidden dark:block" theme="solarized-light" {...props} />
            </>
     ,
    h1: ({ children }) => {
        const id = children?.toString().replaceAll(/\W/g,'');
        return <Link href={`#${id}`}><h3 className="text-xl md:text-2xl text-base01 dark:text-base1" id={id}>{children}</h3></Link>
    },
    h2: ({ children }) => <h4 className="text-lg md:text-xl text-base01 dark:test-base1">{children}</h4>,
    a: async ({ children, href, className, ...props }) => {
        const url = new URL(href ?? '');
        if (url.protocol === 'post:') {
            const allPosts = await getAllPosts();
            if (allPosts.some(post => post.slug === url.pathname)) {
                return <Link className={`${className} underline`} href={`/posts/${url.pathname}`} {...props}>{children}</Link>
            } else {
                return <>{children}</>
            }
        }
        if(url.protocol === 'category:') {
            const allCategories = await getAllCategories();
            if (allCategories.some(category => category.slug === url.pathname)) {
                return <Link className={`${className} underline`} href={`/categories/${url.pathname}`} {...props}>{children}</Link>
            } else {
                return <>{children}</>
            }
        }
        return <Link className={`${className} underline`} href={href ?? ''} {...props}>{children}</Link>
    },
    p: ({ children, className, ...params }) => <p className={`${className} my-3`} {...params}>{children}</p>,
    'preview-break': () => null,
    img: ({ src, alt }) => <img className="block mx-auto" src={src!} alt={alt!} />,
    ol: ({ className, ...props }) => <ol className={`${className} list-decimal`} {...props} />,
    ul: ({ className, ...props }) => <ul className={`${className} list-disc`} {...props} />
  }