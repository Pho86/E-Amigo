import NavBar from "../NavBar"
import { useRouter } from 'next/router'

import { useSession } from "next-auth/react"

export default function SiteNavigation() {

   const router = useRouter()
   const { data: session } = useSession()
   return (
      <NavBar
         user={session?.user}
      />
   )
}