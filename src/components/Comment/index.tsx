import Image from "next/image";
import { useState } from "react";
import formatTimeAgo from "utils/formatTimeAgo"
import EllipseMenu from "../Menu";
import axios from "axios";
import { postProps } from "../Post";
import Button from "../Button";
export interface commentProps {
   id: number,
   createdAt: string,
   updatedAt: string,
   content: string,
   user: any,
   post: postProps,
}
export default function Comment({
   comment,
   onChange = (comment: commentProps) => { return comment },
   owner = false
}: {
   comment: commentProps,
   onChange: any,
   owner: boolean
}) {
   const [disabled, setDisabled] = useState(false)

   const [edit, setEdit] = useState(false)
   const [editedComment, setEditedComment] = useState(comment)
   const [activeComment, setActiveComment] = useState(comment)
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
         setDisabled(true)
         const req = await axios.put('/api/post/comment', { comment: editedComment, id: comment.post.id });
         setDisabled(false)
         setActiveComment(req.data)
         setEdit(false)
      }
      catch (error) {
         console.log(error)
      }
   }
   const handleChange = (event: any) => {
      setEditedComment({ ...editedComment, [event.target.name]: event.target.value });
   };
   const handleDelete = async (e: React.MouseEvent<HTMLElement>) => {
      const req = await axios.delete('/api/post/comment', { data: { comment } });
   }

   return (
      <div className="flex flex-col">
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
            <div className="flex flex-col items-end gap-2">

               {activeComment.updatedAt === activeComment.createdAt ? <p>Created {formatTimeAgo(activeComment.createdAt)} </p>: <><p>Created {formatTimeAgo(activeComment.createdAt)} </p><p>Updated {formatTimeAgo(activeComment.updatedAt)}... </p> </>}
               {owner && <EllipseMenu onEdit={() => { setEdit(!edit) }} onDelete={(e: React.MouseEvent<HTMLElement>) => { handleDelete(e); onChange(comment); }} /> }
            </div>
         </div>
         <hr className="mt-4 mb-2 p-1 border-primary " />
         <p className="px-2 border-l-2 border-primary">{activeComment.content}</p>
         {edit && <form onSubmit={handleSubmit} >
            <fieldset disabled={disabled} className="flex gap-2 flex-col">

               <input className="p-2 rounded w-full text-black border-x-[3px] outline-primary border-primary mt-2" name="content" value={editedComment.content} onChange={handleChange}></input>
               <Button type="submit">Submit</Button>
            </fieldset>
         </form>}

      </div>
   )
}