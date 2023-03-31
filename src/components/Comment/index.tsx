import Image from "next/image";
import formatTimeAgo from "utils/formatTimeAgo"

export default function Comment({
   comment
}: {
   comment: any
}) {
   return (
      <div key={comment.id} className="flex flex-col">
         <div className="flex items-center w-full justify-between">
            <div className="flex">
               <Image
                  className="h-12 w-12 rounded-full"
                  src={comment.user.image}
                  width={50}
                  height={50}
                  alt=""
               />
               <h3 className="p-2 font-semibold text-lg">{comment.user.name}</h3>
            </div>
            <p>Created {formatTimeAgo(comment.createdAt)}</p>
         </div>
         <hr className="mt-4 mb-2 p-1 border-primary "/>
         <p className="px-2 border-l-2 border-primary">{comment.content}</p>

      </div>
   )
}