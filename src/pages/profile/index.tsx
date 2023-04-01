import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Post from '@/components/Post';
import { useState } from 'react';
import axios from 'axios';
import { FaEdit, FaEnvelope } from 'react-icons/fa';
import { postProps } from '@/components/Post';
import {m, AnimatePresence} from "framer-motion"
import { FaDiscord } from 'react-icons/fa';
export default function Profile({ userPosts, prismaUser }: {
   userPosts: postProps
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
               {/* @ts-ignore */}
               <Image src={session.user.image} width={250} height={250} className="rounded-lg" alt={`profile picture for ${session.user.name}`} />
               <div className='flex flex-col gap-2 px-4 justify-between w-full'>
                  {/* @ts-ignore */}
                  <h1 className='font-bold text-xl'>{session && session.user.name}</h1>
                  {/* @ts-ignore */}
                  <p className='flex gap-2'> <FaEnvelope/> {session.user.email}</p>
                  <div>
                     <p className='flex justify-between gap-2'><span className='flex gap-2 items-center'> <FaDiscord/>{oldDiscord ? oldDiscord : "no discord"}</span> <FaEdit onClick={() => { setEdit(!edit) }} className="hover:drop-shadow-primary-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all hover:scale-110 cur" /></p>
                     <AnimatePresence>
                     {edit && <m.form onChange={handleChange} onSubmit={handleSubmit} className="absolute p-2 bg-primarybg rounded-b-xl" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                        <fieldset className='flex gap-2 flex-col md:flex-row'>
                           <input value={discord.discord} placeholder="discord tag" className='p-2 rounded text-black border-x-[3px] outline-primary border-primary' onChange={() => { }} />
                           <Button type="submit" className='w-full'>Submit</Button>
                        </fieldset>
                     </m.form>}
                     </AnimatePresence>
                  </div>
                  <Button onClick={() => { signOut() }}>Signout </Button>
               </div>
            </div>
         </div>
         <h2 className="font-bold text-xl self-start">Recent Posts</h2>
         <div className="grid grid-flow-row gap-6 w-full grid-cols-home">
            {userPosts && userPosts.map((post: postProps, i: number) => (
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