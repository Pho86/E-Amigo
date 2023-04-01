import Image from "next/image"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
export default function Post({
   post: initialPost,
}: {
   post: any,
}) {
   const [disabled, setDisabled] = useState(false)
   const [post, setPost] = useState(initialPost)
   const handleChange = (event: any) => {
      setPost({ ...post, [event.target.name]: event.target.value });
   };
   const router = useRouter();
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
         setDisabled(true)
         const req = await axios.put('/api/post/', { post });
         router.push('/')
      }
      catch (error) {
         console.log(error)
      }
   }
   return (
      <>
         <Head>
            <title>{`Editing: ${post.title} | E-Amigo`}</title>
         </Head>
         <div className="mt-20 w-full flex flex-col justify-between items-center p-10 ">
            <h1 className="font-bold text-2xl mb-4">Edit Your Posting</h1>
            <form onSubmit={handleSubmit} onChange={handleChange} className="w-full md:w-8/12">
               <fieldset disabled={disabled} className="flex flex-col gap-2">
                  <div className='flex gap-2 justify-center flex-col'>
                     <label htmlFor="title">enter title</label>
                     <input
                        type="title"
                        name="title"
                        required
                        placeholder="Need someone for VALORANT 5 stack..."
                        value={post.title}
                        className='p-2 rounded w-full text-black border-x-[3px] outline-primary border-primary'
                        onChange={() => { }}
                     />
                  </div>
                  <div className='flex gap-2 justify-center flex-col'>
                     <label htmlFor="game">enter game</label>
                     <input
                        type="game"
                        name="game"
                        required
                        placeholder="VALORANT, League of Legends, Other..."
                        value={post.game}
                        className='p-2 rounded w-full text-black border-x-[3px] outline-primary border-primary'
                        onChange={() => { }}
                     />
                  </div>
                  <div className='flex gap-2 justify-center flex-col'>
                     <label htmlFor="content">enter description</label>
                     <textarea
                        className='p-2 rounded w-full text-black border-x-[3px] outline-primary border-primary'
                        name="content"
                        required
                        value={post.content}
                        placeholder="need a 5th for VALORANT, contact me at joe#1234, below iron only please"
                        rows={5}
                        onChange={() => { }}
                     ></textarea>
                  </div>
                  <div className='flex justify-center items-center my-4'>
                     <Button type="submit">SUBMIT</Button>
                  </div>
               </fieldset>
            </form>
         </div>
      </>
   )
}

import { prisma } from "server/db/client"
import Button from "@/components/Button"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import Head from "next/head"
export async function getServerSideProps(context: any) {
   const { id } = context.query
   const session = await getServerSession(context.req, context.res, authOptions);
   if (!session) {
      return {
         redirect: {
            destination: "/api/auth/signin",
            permanent: false
         }
      }
   }
   const prismaPost = await prisma.post.findFirstOrThrow({
      where: {
         id: Number(id)
      },
      include: {
         user: true,
      }
   })
   // @ts-ignore
   if (session.user.email != prismaPost.user.email) {
      return {
         redirect: {
            destination: `/post/${id}/`,
            permanent: false
         }
      }
   }
   return {
      props: {
         post: JSON.parse(JSON.stringify(prismaPost)),
      }
   }
}