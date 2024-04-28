import GithubLight from './github-mark.png';
import GithubDark from './github-mark-white.png';
import XLight from './x-logo-black.png';
import XDark from './x-logo-white.png';
import Image from "next/image";

export default function Footer() {
    return (
    <footer className="my-6 text-sm flex flex-row justify-end items-center">
          <span className="mx-3" >© {new Date().getFullYear()} - Christopher Pardy</span>
          <span className="mx-3 flex flex-row justify-end items-center">
            Contact: 
            <a className="mx-1" href="https://github.com/chris-pardy">
                <picture className="inline">
                    <source media="(prefers-color-scheme: dark)" srcSet={GithubDark.src} />
                    <Image alt="github" src={GithubLight} width={24} height={24} />
                </picture>
            </a>
            <a className="mx-1" href="https://twitter.com/cpardy">
                <picture className="inline">
                    <source media="(prefers-color-scheme: dark)" srcSet={XDark.src} />
                    <Image alt="X" src={XLight} width={24} height={24} />
                </picture>
            </a>
          </span>
        </footer>
        )
}