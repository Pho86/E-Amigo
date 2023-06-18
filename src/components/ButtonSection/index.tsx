import Link from "next/link"
import Button from "../Button"
export default function ButtonSection() {

   return <section className=" flex flex-col gap-5 mt-4 mb-28">
      <h2 className="font-bold text-xl">Login or check your E-Amigo profile</h2>
      <div className="flex">
         <Link href="/profile" className="w-full px-4">
            <Button>Login/Profile</Button>
         </Link>
      </div>
   </section>
}