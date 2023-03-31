import Image from "next/image"
import Link from "next/link";
import { getServerSession } from 'next-auth';
import { FaPlusCircle } from "react-icons/fa";
export default function NavBar({
   user,
   onSignIn,
   onSignOut
}: {
   user: any
   onSignIn: () => void
   onSignOut: () => void
}) {
   return (
      <nav className="fixed top-0 w-screen bg-indigo-800 text-zinc-50 px-6 py-4 flex justify-between items-center">
         <div>
            <Link href="/" className="font-bold text-2xl">
               <h1>E-Amigo</h1>
            </Link>
         </div>
         <Link href="/createpost" className="hover:scale-125 transition-all">
            <FaPlusCircle size={30}/>
         </Link>
         <Link href="/profile">
            {user ?
               <Image
                  className="h-8 w-8 rounded-full"
                  src={user?.image}
                  width={50}
                  height={50}
                  quality={100}
                  alt="user image"
               />
               :
               <Image
                  className="h-8 w-8 rounded-full"
                  src={user?.image}
                  width={50}
                  height={50}
                  quality={100}
                  alt="user image"
               />
            }
         </Link>
      </nav>
   )
}