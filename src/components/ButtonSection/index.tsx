import Link from "next/link"
import Button from "../Button"
import { m } from "framer-motion"
export default function ButtonSection(
   { className }:
      { className?: string }) {
   return <m.section className={`flex flex-col gap-5 my-12 ${className}`} initial={{ opacity: 0, y: 20 }} whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: .5, ease: "easeInOut" }}>
      <h2 className="font-bold text-xl">Login or check your E-Amigo profile</h2>
      <div className="flex">
         <Link href="/profile" className="w-full px-4">
            <Button>Login/Profile</Button>
         </Link>
      </div>
   </m.section>
}