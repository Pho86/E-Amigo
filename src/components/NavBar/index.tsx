import Image from "next/image"
import Link from "next/link";
import { FaPlusCircle, FaUser } from "react-icons/fa";
import { Link as Scroll } from "react-scroll"
export default function NavBar({
   user,
   home = false
}: {
   user: any,
   home?: boolean
}) {
   return (
      <>
         <nav className="fixed top-0 w-screen bg-primarybg text-zinc-50 px-8 md:px-16 py-2 grid grid-cols-2 md:grid-cols-3 justify-between items-center z-[1000] scroll-smooth">
            <div className="flex items-center gap-5">
               <div className="font-bold text-2xl hover:drop-shadow-primary-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all py-1">
                  <Link href="/" className="flex gap-2 items-center">
                     <Image src="/logo.svg" alt="logo of E-Amigo" width={35} height={35} />
                     <h1 className="whitespace-nowrap">E-Amigo</h1>
                  </Link>
               </div>
               <Link href={"/"} className="font-bold text-lg p-2 hover:drop-shadow-primary-sm hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all hidden md:flex">
                  <h2>Home</h2>
               </Link>
               <Link href="/#posts" className="font-bold text-lg p-2 hover:drop-shadow-primary-sm hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all hidden md:flex">
                  <h2>Posts</h2>
               </Link>
            </div>
            <Link href="/createpost" className="hover:drop-shadow-primary-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all place-self-center md:block hidden">
               <FaPlusCircle size={30} />
            </Link>
            <Link href="/profile" className="place-self-end self-center">
               {user ?
                  <Image
                     className="rounded hover:drop-shadow-primary-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all"
                     src={user?.image}
                     width={50}
                     height={50}
                     quality={100}
                     alt="user image"
                  />
                  :
                  <FaUser size={25} className="hover:drop-shadow-primary-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all" />
               }
            </Link>
         </nav>
         <div className="fixed bottom-10 right-9 z-[1000] block md:hidden">
            <Link href="/createpost" className="hover:drop-shadow-primary-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all place-self-center">
               <FaPlusCircle size={35} />
            </Link>
         </div>
      </>
   )
}