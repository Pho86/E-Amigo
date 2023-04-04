import Image from 'next/image'
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Post from '@/components/Post';
import Button from '@/components/Button';
import { FaDiscord, FaCopy } from 'react-icons/fa';

export default function Profile({ userPosts, prismaUser }: {
   userPosts: any
   prismaUser: any
}) {
   const [copied, setCopied] = useState(false)
   const CopyDiscord = async () => {
      navigator.clipboard.writeText(prismaUser.discord)
      setCopied(true)
      setTimeout(() => {
         setCopied(false)
      }, 1500)
   }
   return <>
      <Head>
         <title>{`${prismaUser.name}'s Profile | E-Amigo`}</title>
      </Head>
      <main className='flex flex-col justify-between w-full mt-12 items-center gap-5 p-4 pt-8 sm:p-8 md:p-16'>
         <div className='flex self-start w-5/12'>
            <Image src={prismaUser.image} width={200} height={200} className="rounded-lg" alt={`profile picture for ${prismaUser.name}`} />
            <div className='flex flex-col px-4 gap-6'>
               <h1 className='font-bold text-2xl'>{prismaUser && prismaUser.name}</h1>
               {copied ? <p className='flex justify-between gap-6 cursor-pointer' onClick={CopyDiscord}><span className='flex gap-2 items-center'> <FaDiscord />copied</span> <FaCopy /></p> : <p className='flex justify-between gap-6 cursor-pointer' onClick={CopyDiscord}><span className='flex gap-2 items-center'> <FaDiscord />{prismaUser.discord ? prismaUser.discord : "no discord"}</span> <FaCopy /></p>}

            </div>
         </div>
         <h2 className="font-bold text-xl self-start">Recent Posts</h2>
         <div className="grid grid-flow-row gap-6 w-full grid-cols-home">
            {userPosts && userPosts.map((post: any, i: number) => (
               <Post post={post} key={i} />
            ))}
         </div>
      </main>

   </>
}


import { GetServerSidePropsContext } from "next"
import { prisma } from 'server/db/client';
import { useState } from 'react';
import Head from 'next/head';

export async function getServerSideProps(context: GetServerSidePropsContext) {
   const { id } = context.query
   const session = await getServerSession(context.req, context.res, authOptions);
   const prismaUser = await prisma.user.findUnique({
      // @ts-ignore
      where: { id: id },
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