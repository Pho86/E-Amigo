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
      where: { email: session.user!.email },
   })
   if (!prismaUser) {
      res.status(401).json({ error: 'Unauthorized' })
      return
   }
   let { id, content, title } = req.body.post
   switch (method) {
      case 'POST':
         const post = await prisma.post.create({
            data: {
               title,
               content,
               userID: prismaUser.id,
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
            },
         })
         res.status(201).json(updatePost)
         break
      case 'DELETE':
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