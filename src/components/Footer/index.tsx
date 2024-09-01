import Image from "next/image";
import Link from "next/link";
export default function Footer() {
    return (
        <footer className="w-full my-2 flex justify-center ">
            <div className="px-4 max-w-screen-2xl my-8 w-full">
                <div className="lg:flex lg:items-end lg:justify-between">
                    <div className="flex flex-col text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start">
                            <div className="font-bold text-2xl hover:drop-shadow-primary-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all py-1">
                                <Link href="/" className="flex gap-2 items-center">
                                    <Image src="/logo.svg" alt="logo of E-Amigo" width={35} height={35} />
                                    <h1 className="whitespace-nowrap">E-Amigo</h1>
                                </Link>
                            </div>
                        </div>
                        <p className="mt-6 text-pretty">E-Amigo is a community designed to connect gamers globally.</p>
                    </div>
                    <ul className="md:mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:justify-end lg:gap-12">
                        <Link href="/" className="font-bold text-lg p-2 hover:drop-shadow-primary-sm hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all hidden md:flex">
                            <h2>Home</h2>
                        </Link>
                        <Link href="/posts" className="font-bold text-lg p-2 hover:drop-shadow-primary-sm hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all hidden md:flex">
                            <h2>Posts</h2>
                        </Link>
                        <Link href="/profile" className="font-bold text-lg p-2 hover:drop-shadow-primary-sm hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all hidden md:flex">
                            <h2>Profile</h2>
                        </Link>
                    </ul>
                </div>

                <p className="mt-8 text-center text-sm text-gray-200 lg:text-right">
                    Copyright &copy; 2024
                </p>
            </div>
        </footer>

    )
}