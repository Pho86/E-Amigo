import Image from "next/image"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
export default function Post({
   post: initialPost,
}: {
   post: any,
}) {
   useEffect(() => {
      if (initialPost.user.id) {

      }
   }, [])
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
         console.log(post)
         const req = await axios.put('/api/post/', { post });
         router.push('/')
      }
      catch (error) {
         console.log(error)
      }
   }
   return (
      <div className="mt-20 w-full flex flex-col justify-between items-center">
         <form onSubmit={handleSubmit} onChange={handleChange} className="w-1/2 ">
            <fieldset disabled={disabled} className="flex flex-col gap-2"> 
               <div className='flex gap-2 justify-center flex-col'>
                  <label htmlFor="title">title</label>
                  <input
                     type="title"
                     name="title"
                     required
                     placeholder="Need a duo."
                     value={post.title}
                     className='p-2 rounded w-full text-black border-x-[3px] outline-primary border-primary'
                     onChange={() => { }}
                  />
               </div>
               <div className='flex gap-2 justify-center flex-col'>
                  <label htmlFor="game">game</label>
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
                  <label htmlFor="content">description</label>
                  <textarea
                     className='p-2 rounded w-full text-black border-x-[3px] outline-primary border-primary'
                     name="content"
                     required
                     value={post.content}
                     placeholder="need a 5th contact me at joe#1234"
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
   )
}

import { prisma } from "server/db/client"
import Button from "@/components/Button"
export async function getServerSideProps(context: any) {
   const { id } = context.query
   const prismapost = await prisma.post.findFirstOrThrow({
      where: {
         id: Number(id)
      },
      include: {
         user: true,
      }
   })
   console.log(prismapost.user.id)
   return {
      props: {
         post: JSON.parse(JSON.stringify(prismapost)),
      }
   }
}