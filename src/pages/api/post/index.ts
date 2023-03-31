// /pages/api/posts.js
import { prisma } from 'server/db/client'

import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const { method } = req;
   let session = await getServerSession(req, res, authOptions);
   if (!session) {
      res.status(401).json({ error: 'Unauthorized' })
      return
   };
   const prismaUser = await prisma.user.findUnique({
      // @ts-ignore
      where: { email: session.user!.email },
   })
   if (!prismaUser) {
      res.status(401).json({ error: 'Unauthorized' })
      return
   }
   let { id, content, title, game, tags } = req.body.post
   switch (method) {
      case 'POST':
         console.log(req.body.post)
         console.log(req.body.post.content.toString())
         const post = await prisma.post.create({
            data: {
               title,
               content,
               userID: prismaUser.id,
               // @ts-ignore
               game,
               tags
            },
         })
         res.status(201).json(post)
         break
         case 'PUT':
            const updatePost = await prisma.post.update({
            where: {
               id: id,
            },
            data: {
               title,
               content,
               // @ts-ignore
               game
            },
         })
         res.status(201).json(updatePost)
         break
      case 'DELETE':
         const deleteComments = await prisma.comment.deleteMany({
            where: {
               postId: id
            }
         })
         const deletePost = await prisma.post.delete({
            where: {
               id: id
            },
         })
         res.status(200).json(deletePost)
         break;
      default:
         res.setHeader('Allow', ['POST'])
         res.status(405).end(`Method ${method} Not Allowed`)
   }
}