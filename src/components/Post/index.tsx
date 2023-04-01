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
   map: (children : any) => React.ReactNode | JSX.Element
}

export default function Post({
   post
}: {
   post: postProps
}) {
   return (
      <div className="flex flex-col p-4 bg-primarybg h-max text-slate-50 rounded-xl transition-all duration-150 drop-shadow-small hover:drop-shadow-primary hover:-translate-x-[5px] hover:-translate-y-[5px]">
         <Link href={`/post/${post.id}`}>
            <div className="flex justify-between">
               <div className="flex">
                  <Image
                     className="h-24 w-24 rounded"
                     src={post.user.image}
                     width={100}
                     height={100}
                     alt={`${post.user.name} profile picture`}
                  />
                  <div className="flex flex-col h-full px-2 justify-between">
                     <h2 className="">{post.user?.name}</h2>
                     <h1 className="font-bold text-xl ">{post.title}</h1>
                  </div>
               </div>
               <div className="flex flex-col gap-1 items-end">
                  <p className="whitespace-nowrap">{formatTimeAgo(post.createdAt)} </p>
                  <p className="p-1 my-1 rounded bg-primary whitespace-nowrap">{post.game}</p>
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