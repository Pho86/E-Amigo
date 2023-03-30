import Head from 'next/head'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
export default function Profile() {
  
  const { data: session } = useSession();
  if (session) {
    return <>
      Signed in as {session.user.email} <br />
      <img src={session.user.image} />  <br />
      Signed in as {session.user.name} <br />
      <button onClick={() => { signOut() }}>Signout </button>
    </>
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => { signIn() }}>Signin </button>
    </>
  )
}


import { GetServerSidePropsContext} from "next"
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false
      }
    }
  }
  return {
    props: {
      session,
    }
  }
}