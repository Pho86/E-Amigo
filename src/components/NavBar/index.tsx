import Image from "next/image"
import Link from "next/link";
import { FaPlusCircle, FaUser } from "react-icons/fa";
export default function NavBar({
   user,
}: {
   user: any
}) {
   return (
      <nav className="fixed top-0 w-screen bg-indigo-800 text-zinc-50 px-16 py-2 flex justify-between items-center">
         <div>
            <Link href="/" className="font-bold text-2xl hover:drop-shadow-primary-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all hover:scale-110 py-1">
               <h1>E-Amigo</h1>
            </Link>
         </div>
         <Link href="/createpost" className="hover:drop-shadow-primary-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
            <FaPlusCircle size={30}/>
         </Link>
         <Link href="/profile" className="">
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
               <FaUser className="hover:drop-shadow-primary-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all"/>
            }
         </Link>
      </nav>
   )
}