import Image from "next/image"
import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
export default function Post({
   post,
   comments: initialcomments,
}: {
   post: any,
   comments: any
}) {
   const [comment, setComment] = useState({
      content: "",
   })
   const [disabled, setDisabled] = useState(false)
   const handleChange = (event: any) => {
      setComment({ ...comment, [event.target.name]: event.target.value });
   };
   const [comments, setComments] = useState(initialcomments)
   const router = useRouter()
   const id = router.query.id
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
         setDisabled(true)
         const req = await axios.post('/api/post/comment', { comment, postId: id });
         setComments([req.data, ...comments])
         setDisabled(false)
      }
      catch (error) {
         console.log(error)
      }
   }
   const handleLike = async (e :React.MouseEvent<HTMLElement>) => {
      const req = await axios.post('/api/post/like', { postId: id });
      
   }
   return (
      <div className="mt-16">
         <div>

            <div className="flex">
               <Image
                  className="h-12 w-12 rounded-full"
                  src={post.user.image}
                  width={50}
                  height={50}
                  alt=""
               />
               {post.user?.name}
            </div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>{new Date(post.createdAt).toLocaleDateString('en-GB')}</p>
         </div>
      <button onClick={handleLike}>Like</button>
         <div>
            <form onSubmit={handleSubmit} onChange={handleChange}>
               <fieldset disabled={disabled}>
                  <div className='flex gap-2 justify-center flex-col'>
                     <label htmlFor="content">comment</label>
                     <textarea
                        className='p-2 rounded w-full text-black border-x-[3px] outline-primary border-primary'
                        name="content"
                        required
                        placeholder="content"
                        rows={5}
                     ></textarea>
                  </div>
                  <div className='flex justify-center items-center my-4'>
                     <button type="submit" >SUBMIT</button>
                  </div>
               </fieldset>
            </form>
            {comments?.map((comment: any) => (
               <div key={comment.id}>
                  <div className="flex items-center">
                     <Image
                        className="h-12 w-12 rounded-full"
                        src={post.user.image}
                        width={50}
                        height={50}
                        alt=""
                     />
                     <p>{comment.user.name}</p>
                  </div>
                  <p>{comment.content}</p>
               </div>
            ))}
         </div>
      </div>
   )
}

import { prisma } from "server/db/client"
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
   const comments = await prisma.comment.findMany({
      where: {
         postId: Number(id)
      },
      include: {
         post: id,
         user: true,
      },
      orderBy: {
         createdAt: "desc"
      }
   })
   return {
      props: {
         post: JSON.parse(JSON.stringify(prismapost)),
         comments: JSON.parse(JSON.stringify(comments))
      }
   }
}