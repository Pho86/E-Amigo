import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Post from '@/components/Post';
import { useState } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
export default function Profile({ userPosts, prismaUser }: {
   userPosts: any
   prismaUser: any
}) {
   const [discord, setDiscord] = useState(prismaUser.discord)
   const [oldDiscord, setOldDiscord] = useState(prismaUser.discord)
   const [disabled, setDisabled] = useState(false)
   const handleChange = (event: any) => {
      setDiscord(event.target.value);
   };
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
         setDisabled(true)
         const req = await axios.put('/api/discord', { discord: discord, id: prismaUser.id });
         setOldDiscord(discord)
      }
      catch (error) {
         console.log(error)
      }
   }
   const [edit, setEdit] = useState(false)
   const { data: session } = useSession();
   if (session) {
      return <main className='flex flex-col justify-between w-full mt-16 items-center gap-5 p-10'>
         <div className='flex self-start justify-between w-full'>
            <div className='flex w-5/12'>
               <Image src={session.user.image} width={250} height={250} className="rounded-lg" alt={`profile picture for ${session.user.name}`} />
               <div className='flex flex-col gap-2 px-4 justify-between w-full'>
                  <h1 className='font-bold text-xl'>{session && session.user.name}</h1>
                  <p> {session.user.email}</p>
                  <p className='flex justify-between gap-2'> {oldDiscord ? oldDiscord : "no discord"} <FaEdit onClick={() => { setEdit(!edit) }} /></p>
                  {edit && <form onChange={handleChange} onSubmit={handleSubmit} className="">
                     <fieldset className='flex gap-2'>
                        <input value={discord.discord} placeholder="discord tag" className='p-2 rounded text-black border-x-[3px] outline-primary border-primary' onChange={() => { }} />
                        <Button type="submit" className='w-full'>Submit</Button>
                     </fieldset>
                  </form>}
                  <Button onClick={() => { signOut() }}>Signout </Button>
               </div>
            </div>
            <div className='grid grid-cols-4'>
               <div className='p-2 bg-primary text-white'>
                  <p>hello</p>
               </div>
            </div>
         </div>
         <h2 className="font-bold text-xl self-start">Recent Posts</h2>
         <div className="grid grid-flow-row gap-6 w-full grid-cols-home">
            {userPosts && userPosts.map((post: any, i: number) => (
               <Post post={post} key={i} />
            ))}
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
import { prisma } from 'server/db/client';
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
   const prismaUser = await prisma.user.findUnique({
      // @ts-ignore
      where: { email: session.user!.email },
   })
   const userPosts = await prisma.post.findMany({
      where: {
         userID: prismaUser!.id
      },
      orderBy: {
         createdAt: "desc"
      },
      include: {
         user: true,
      }
   })
   return {
      props: {
         session,
         prismaUser: JSON.parse(JSON.stringify(prismaUser)),
         userPosts: JSON.parse(JSON.stringify(userPosts))
      }
   }
}