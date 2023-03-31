import Head from 'next/head'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
export default function Profile() {

  const { data: session } = useSession();
  if (session) {
    return <main className='flex flex-col justify-between w-full mt-20 items-center gap-5'>
      <div className='flex w-1/2'>
        <Image src={session.user.image} width={150} height={150} className="rounded-lg" alt={`profile picture for ${session.user.name}`} />
        <div className='flex flex-col p-2 justify-between'>
          <h1 className='font-bold text-xl'>{session && session.user.name}</h1>
          <p> {session.user.email}</p>
          <Button onClick={() => { signOut() }}>Signout </Button>
        </div>
      </div>
    </main>
  }
  else {
    return (
      <>
        Not signed in <br />
        <button onClick={() => { signIn() }}>Signin </button>
      </>
    )
  }
}


import { GetServerSidePropsContext } from "next"
import Button from '@/components/Button';
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