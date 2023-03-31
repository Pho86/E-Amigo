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
   let { id, discord } = req.body
   console.log(id, discord)
   switch (method) {
      case 'PUT':
         const updateDiscord = await prisma.user.update({
            where: {
               id: id,
            },
            data: {
               discord
            },
         })
         res.status(201).json(updateDiscord)
         break
      default:
         res.setHeader('Allow', ['POST'])
         res.status(405).end(`Method ${method} Not Allowed`)
   }
}