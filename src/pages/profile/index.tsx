import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Post from '@/components/Post';
import { useState } from 'react';
import axios from 'axios';
import { FaEdit, FaEnvelope } from 'react-icons/fa';
import { postProps } from '@/components/Post';
import { m, AnimatePresence } from "framer-motion"
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
      if (discord.toString().match(/^.{3,32}#[0-9]{4}$/)) {
         try {
            setDisabled(true)
            const req = await axios.put('/api/discord', { discord: discord, id: prismaUser.id });
            setOldDiscord(discord)
            setEdit(false)
         }
         catch (error) {
            console.log(error)
         }
      }
      else {
         alert("not a valid discord tag")
      }
   }
   const [edit, setEdit] = useState(false)
   const { data: session } = useSession();
   if (session) {
      return <>
         <Head>
            {/* @ts-ignore */}
            <title>{`${session.user.name} Profile | E-Amigo`}</title>
         </Head>
         <main className='flex flex-col justify-between '>
            <section className='bg-topbg w-full mt-12 items-center p-4 pt-8 sm:p-8 md:p-16'>
               <div className='flex self-start justify-between w-full '>
                  <div className='flex flex-col w-full md:flex-row gap-2 md:w-1/2'>
                     {/* @ts-ignore */}
                     <Image src={session.user.image} width={250} height={250} className="rounded-lg self-center md:self-auto" alt={`profile picture for ${session.user.name}`} />
                     <div className='flex flex-col gap-6 px-4 w-full'>
                        {/* @ts-ignore */}
                        <h1 className='font-bold text-2xl'>{session && session.user.name}</h1>
                        {/* @ts-ignore */}
                        <p className='flex gap-1'> <FaEnvelope /> {session.user.email}</p>
                        <div>
                           <p className='flex justify-between gap-2'><span className='flex gap-2 items-center'> <FaDiscord />{oldDiscord ? oldDiscord : "no discord"}</span> <FaEdit onClick={() => { setEdit(!edit) }} className="cursor-pointer hover:drop-shadow-primary-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all hover:scale-110 cur" /></p>
                           <AnimatePresence>
                              {edit && <m.form onChange={handleChange} onSubmit={handleSubmit} className="absolute p-2 bg-primarybg rounded-b-xl z-50 w-48 md:w-4/12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                 <fieldset className='flex gap-2 flex-col md:flex-row'>
                                    <input value={discord ? discord.discord : ""} placeholder="discord tag" className='p-2 rounded w-full text-black border-x-[3px] outline-primary border-primary' onChange={() => { }} />
                                    <Button type="submit" className='w-full'>Submit</Button>
                                 </fieldset>
                              </m.form>}
                           </AnimatePresence>
                        </div>
                        <Button onClick={() => { signOut() }}>Signout </Button>
                     </div>
                  </div>
               </div>
            </section>
            <section className='p-4 sm:p-8 md:p-16 md:pt-8'>
               <h2 className="font-bold text-xl self-start">Recent Posts</h2>
               <div className="grid grid-flow-row gap-6 w-full grid-cols-home">
                  {userPosts && userPosts.map((post: postProps, i: number) => (
                     <Post id={`post${post.id}`} post={post} key={i} />
                  ))}
               </div>
            </section>
         </main>
      </>
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
import Head from 'next/head';
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
         comments: true,
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