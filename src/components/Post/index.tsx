import Image from "next/image"
import Link from "next/link"
import formatTimeAgo from "utils/formatTimeAgo"
import { FaCommentDots, FaHeart } from "react-icons/fa"
import { commentProps } from "../Comment"
import Tag from "../Tag"
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
   comments: any,
   tags: any,
   map: (children: any) => React.ReactNode | JSX.Element
}

export default function Post({
   post
}: {
   post: postProps
}) {
   return (
      <div className="flex flex-col p-4 bg-primarybg h-max text-slate-50 rounded transition-all duration-150 drop-shadow-small hover:drop-shadow-primary hover:-translate-x-[5px] hover:-translate-y-[5px]">
         <Link href={`/post/${post.id}`}>
            <div className="flex flex-col">
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
                        <h2 className="font-semibold">{post.user?.name}</h2>
                        <h1 className="font-bold text-xl ">{post.title}</h1>
                     </div>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                     <p className="whitespace-nowrap">{formatTimeAgo(post.createdAt)} </p>
                     <p className="p-1 px-2 my-1 rounded bg-primary whitespace-nowrap">{post.game}</p>
                     <div className="flex gap-4">
                        <p className="flex gap-1"><FaHeart /> {post.totalLikes}</p>
                        <p className="flex gap-1"><FaCommentDots /> {post.comments.length}</p>
                     </div>
                  </div>
               </div>
               <div className="flex gap-2 flex-wrap mt-3 mx-2">
                  {post.tags.length > 0 ?
                     <> {
                        post.tags.length >= 4 ?
                           <>
                              <Tag active={true} text={"chill"} onClick={() => { }} />
                              <Tag active={true} text={"fun"} onClick={() => { }} />
                              <Tag active={true} text={"sweaty"} onClick={() => { }} />
                              <Tag active={true} text={"cringe"} onClick={() => { }} />
                           </> :
                           <>
                              {post.tags.map((tag: any, index: number) => (
                                 <Tag active={true} key={index} text={tag} onClick={() => { }} />
                              ))}
                           </>
                     }
                     </> :
                     <>
                        <Tag active={true} text={"chill"} onClick={() => { }} />
                        <Tag active={true} text={"fun"} onClick={() => { }} />
                        <Tag active={true} text={"sweaty"} onClick={() => { }} />
                        <Tag active={true} text={"cringe"} onClick={() => { }} />
                     </>
                  }
               </div>
            </div>
            <hr className="my-3 border-1 border-primary" />
            <p>{post.content}</p>
         </Link>
      </div>
   )
}