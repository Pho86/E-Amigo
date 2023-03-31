import Image from "next/image"
import Link from "next/link"
import formatTimeAgo from "utils/formatTimeAgo"
import { FaCommentDots, FaHeart } from "react-icons/fa"

export interface postProps {
   id: number,
   title: string,
   game: string,
   content: string,
   createdAt: string,
   totalComments: number,
   totalLikes: number,
   user: any,
   updatedAt: string,
}

export default function Post({
   post
}: {
   post: postProps
}) {
   return (
      <div className="flex flex-col p-4 bg-primarybg text-slate-50 rounded-xl transition-all duration-150 drop-shadow-small hover:drop-shadow-primary hover:-translate-x-[5px] hover:-translate-y-[5px]">
         <Link href={`/post/${post.id}`}>
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
               <div className="flex flex-col gap-1 items-end">
                  <p className="whitespace-nowrap">{formatTimeAgo(post.createdAt)} </p>
                  <p className="p-1 m-1 rounded bg-primary">{post.game}</p>
                  <div className="flex gap-4">
                     <p className="flex gap-1"><FaHeart /> {post.totalLikes}</p>
                     <p className="flex gap-1"><FaCommentDots /> {post.totalComments}</p>
                  </div>
               </div>
            </div>
            <hr className="my-3 border-1 border-primary" />
            <p>{post.content}</p>
         </Link>
      </div>
   )
}