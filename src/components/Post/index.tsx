import Image from "next/image"
import Link from "next/link"
import formatTimeAgo from "utils/formatTimeAgo"
import { FaCommentDots, FaHeart, FaShare } from "react-icons/fa"
import { commentProps } from "../Comment"
import Tag from "../Tag"
import { m } from "framer-motion"
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
   map: (children: any) => React.ReactNode | JSX.Element,
}

export default function Post({
   post,
   id,
}: {
   post: postProps
   id: string
}) {
   return (
      <m.div className="flex flex-col p-4 bg-primarybg gap-5 h-max text-slate-50 rounded transition-all duration-150 drop-shadow-small hover:drop-shadow-primary hover:-translate-x-[5px] hover:-translate-y-[5px]" id={id}
         initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.2 }} viewport={{ once: true }}
      >
         <Link href={`/post/${post.id}`}>
            <div className="flex flex-col">
               <div className="flex justify-between gap-2 sm:flex-row flex-col">
                  <div className="flex">
                     <Image
                        className="h-16 w-16 rounded"
                        src={post.user.image}
                        width={100}
                        height={100}
                        alt={`${post.user.name} profile picture`}
                     />
                     <div className="flex flex-col h-full px-2">
                        <h2 className="font-semibold text-lg">{post.user?.name}</h2>
                        <p className="whitespace-nowrap text-sm">{formatTimeAgo(post.createdAt)} </p>
                     </div>
                     {/* <p className="whitespace-nowrap flex">{post.game}</p> */}
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                     <div className="gap-2 flex flex-wrap">
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
               </div>
               <div className="flex gap-2 flex-wrap mx-2">

               </div>
            </div>
            <div className="flex flex-col gap-1">
               <hr className="my-3 border-1 border-primary" />
               <h1 className="font-bold text-xl ">{post.title}</h1>
               <p>{post.content}</p>
               <div className="flex mt-2 gap-4 justify-end">
                  <p className="flex gap-1 text-xl"><FaHeart /> {post.totalLikes}</p>
                  <p className="flex gap-1 text-xl"><FaCommentDots /> {post.comments.length}</p>
                  <p className="flex gap-1 text-xl"><FaShare /></p>
               </div>
            </div>
         </Link>
      </m.div>
   )
}