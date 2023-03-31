import Image from "next/image"
import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import formatTimeAgo from "utils/formatTimeAgo"
import { FaCommentDots, FaEllipsisV } from "react-icons/fa"

export default function Post({
   post,
   comments: initialcomments,
   user
}: {
   post: any,
   comments: any,
   user: any
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
         setComment({ content: "" });
         post.totalComments += 1
         setDisabled(false)
      }
      catch (error) {
         console.log(error)
      }
   }
   const handleDelete = async (e: React.MouseEvent<HTMLElement>) => {
      try {
         const req = await axios.delete('/api/post', { data: { post } });
         await router.push('/')
      }
      catch (error) {
         console.log(error)
      }
   }
   const deleteComment = async (commentEvent: any) => {
      let newComments = await comments.filter((comment: any, i: number) => {
         if (comment.id != commentEvent.id) {
            return comment
         }
      })
      setComments(newComments)
   }
   const handleLike = async (e: React.MouseEvent<HTMLElement>) => {
      const req = await axios.post('/api/post/like', { postId: id });
   }

   const [expand, setExpand] = useState(false)
   return (
      <div className="flex flex-col mt-20 gap-5 justify-between items-center">
         <div className="w-1/2">
            <div className="flex justify-between">
               <div className="flex">
                  <Image
                     className="h-20 w-20 rounded"
                     src={post.user.image}
                     width={150}
                     height={150}
                     alt={`${post.user.name} profile picture`}
                  />
                  <div className="flex flex-col p-2 h-full justify-between">
                     <h2 className="">{post.user?.name}</h2>
                     <h1 className="font-bold text-xl">{post.title}</h1>
                  </div>
               </div>
               <div className="flex flex-col items-end justify-between gap-1 h-auto p-2">
                  <p>{formatTimeAgo(post.createdAt)}</p>
                  {post.user.id === user.id && <FaEllipsisV onClick={() => { setExpand(!expand) }} />}
                  {expand &&
                     <div className="flex flex-col absolute p-2 border rounded bg-bg -translate-y-8">
                        <ul>
                           <Link href={`/post/${id}/edit`}>
                              <li className="cursor-pointer hover:bg-indigo-900 p-1">Edit Post</li>
                           </Link>
                           <li className="cursor-pointer hover:bg-indigo-900 p-1" onClick={handleDelete}>Delete Post</li>
                        </ul>
                     </div>
                  }
               </div>
            </div>
            <hr className="my-2 p-[.5px] bg-indigo-900" />
            <p>{post.game}</p>
            <hr className="my-2 p-[.5px] bg-indigo-900" />
            <p>{post.content}</p>
         </div>
         <div className="w-1/2 flex flex-col gap-5">
            {user.id ? <form onSubmit={handleSubmit} onChange={handleChange}>
               <fieldset disabled={disabled}>
                  <div className='flex gap-2 justify-center flex-col'>
                     <div className="flex w-full justify-between">
                        <label htmlFor="content">post a comment</label>
                        <div className="flex gap-1">
                           <FaCommentDots /> <p>{post.totalComments}</p>
                        </div>
                     </div>
                     <textarea
                        className='p-2 rounded w-full text-black border-x-[3px] outline-primary border-primary'
                        name="content"
                        required
                        placeholder="hi i msged you on discord"
                        value={comment.content}
                        onChange={() => { }}
                        rows={5}
                     ></textarea>
                  </div>
                  <div className='flex justify-center items-center my-4'>
                     <Button type="submit" >SUBMIT</Button>
                  </div>
               </fieldset>
            </form> :
               <form onSubmit={handleSubmit} onChange={handleChange}>
                  <fieldset disabled={true}>
                     <div className='flex gap-2 justify-center flex-col'>
                        <div className="flex w-full justify-between">
                           <label htmlFor="content">post a comment</label>
                           <div className="flex gap-1">
                              <FaCommentDots /> <p>{post.totalComments}</p>
                           </div>
                        </div>
                        <textarea
                           className='p-2 rounded w-full text-black border-x-[3px] outline-primary border-primary'
                           name="content"
                           required
                           placeholder="PLEASE LOGIN"
                           rows={5}
                        ></textarea>
                     </div>
                     <div className='flex justify-center items-center my-4'>
                        <Button type="submit" >SUBMIT</Button>
                     </div>
                  </fieldset>
               </form>}
            <div className="flex flex-col gap-10">
               {comments?.map((comment: any) => (
                  <Comment comment={comment} key={comment.id} onChange={(e: any) => { deleteComment(e); post.totalComments -= 1 }} owner={comment.user.id === user.id} />
               ))}
            </div>
         </div>
      </div>
   )
}

import { prisma } from "server/db/client"
import Button from "@/components/Button"
import Comment from "@/components/Comment"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import Link from "next/link"
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
   let user;
   const session = await getServerSession(context.req, context.res, authOptions);
   if (session) {
      user = await prisma.user.findUnique({
         // @ts-ignore
         where: { email: session.user!.email },
      })
   } else {
      user = {};
   }
   return {
      props: {
         post: JSON.parse(JSON.stringify(prismapost)),
         comments: JSON.parse(JSON.stringify(comments)),
         user: JSON.parse(JSON.stringify(user))
      }
   }
}