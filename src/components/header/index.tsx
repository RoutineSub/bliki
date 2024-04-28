import Image from "next/image";
import Link from "next/link";
import { Pixelify_Sans } from "next/font/google";
import Logo from './logo.png';

const pixelify = Pixelify_Sans({ subsets: ['latin'], weight: '700' });

export default function Header() {
    return <header className="w-full bg-base2 dark:bg-base02 border-b border-base1 dark:border-base01">
          <Link className="flex flex-row items-end" href="/">
          <Image alt="A Sandwich" src={Logo}  width={128} height={128}/>
          <div>
            <h1 className={`${pixelify.className} text-cyan text-7xl md:text-8xl font-bold`}>Routine Sub</h1>
            <span className="text-xs">Just a normal sandwich</span>
          </div>
          </Link>
        </header>
}

