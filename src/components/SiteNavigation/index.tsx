import NavBar from "../NavBar"
import { useRouter } from 'next/router'

import { useSession, signIn, signOut } from "next-auth/react"

export default function SiteNavigation() {

   const router = useRouter()

   const { data: session } = useSession()


   return (
      <NavBar
         //  navigation={navigation}
         user={session?.user}
         onSignIn={signIn}
         onSignOut={signOut}
      />
   )
}