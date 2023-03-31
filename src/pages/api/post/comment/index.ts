import { prisma } from 'server/db/client'

import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]"
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
   let { id, content } = req.body.comment
   let postId = Number(req.body.postId)
   console.log(req.body)
   switch (method) {
      case 'POST':
         const comment = await prisma.comment.create({
            data: {
               content,
               userId: prismaUser.id,
               postId
            },
            include: {
               user: true,
            },
         })
         const updatePost = await prisma.post.update({
            where: {
               id: postId,
            },
            data: {
               totalComments: { increment: 1 }
            }
         })
         res.status(201).json(comment)
         break
      case 'PUT':
         const updateComment = await prisma.comment.update({
            where: {
               id: id,
            },
            data: {
               content,
            },
         })
         res.status(201).json(updateComment)
         break
      case 'DELETE':
         const deleteComment = await prisma.comment.delete({
            where: {
               id: id
            },
         })
         res.status(200).json(deleteComment)
         break;
   }
}