import Image from "next/image"
import Link from "next/link";
import { getServerSession } from 'next-auth';

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
      <nav className="fixed top-0 w-screen bg-red-50 p-4 flex justify-between items-center">
         <div>
            <Link href="/">
               <h1>E-Amigo</h1>
            </Link>
         </div>
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