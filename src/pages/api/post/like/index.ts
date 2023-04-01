import { prisma } from "server/db/client";
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  let postId = Number(req.body.postId)
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
  switch (method) {
    case 'GET':
      const SelectedPost = await prisma.like.findMany({
        where: { id: postId },
      })
      res.status(201).json(SelectedPost);
      break

    case 'POST':
      const IncrementLike = await prisma.like.create({
        data: {
          userId: prismaUser.id,
          postId
        },
        include: {
          user: true,
        },
      })
      const updatePostLikes = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          totalLikes: { increment: 1 }
        }
      })
      res.status(201).json(IncrementLike);
      break
    case 'DELETE':
      const deleteLike = await prisma.like.deleteMany({
        where: {
          postId: postId,
          userId: prismaUser.id
        },
      })
      const update = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          totalLikes: { decrement: 1 }
        }
      })
      res.status(200).json(deleteLike)
      break;
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}