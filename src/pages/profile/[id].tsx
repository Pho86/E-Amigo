import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Post from '@/components/Post';
import Button from '@/components/Button';
export default function Profile({ userPosts, prismaUser }: {
   userPosts: any
   prismaUser: any
}) {

   return <main className='flex flex-col justify-between w-full mt-16 items-center gap-5 p-10'>
      <div className='flex self-start w-5/12'>
         <Image src={prismaUser.image} width={150} height={150} className="rounded-lg" alt={`profile picture for ${prismaUser.name}`} />
         <div className='flex flex-col p-2 justify-between'>
            <h1 className='font-bold text-xl'>{prismaUser && prismaUser.name}</h1>
            <p>{prismaUser.discord ? prismaUser.discord : "no discord"}</p>
            <p> {prismaUser.email}</p>
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


import { GetServerSidePropsContext } from "next"
import { prisma } from 'server/db/client';

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