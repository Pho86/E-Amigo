import { FaEllipsisV } from "react-icons/fa"
import Link from "next/link"
import { useState } from "react"
export default function EllipseMenu({
   onDelete,
   onEdit
}: {
   onEdit: () => void
   onDelete: any
}) {
   const [active, setActive] = useState(false);

   return (
      <div>
         <FaEllipsisV onClick={() => { setActive(!active) }} />
         {active && <div className="flex flex-col absolute p-2 border rounded bg-bg -translate-y-8 translate-x-4">
            <ul>
               <li className="cursor-pointer hover:bg-indigo-900 p-1" onClick={onEdit}>Edit Post</li>
               <li className="cursor-pointer hover:bg-indigo-900 p-1" onClick={onDelete}>Delete Post</li>
               <li className="cursor-pointer hover:bg-indigo-900 p-1" onClick={() => setActive(!active)}>Cancel</li>
            </ul>
         </div>}
      </div>
   )
}