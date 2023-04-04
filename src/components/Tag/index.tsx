import axios from "axios"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
export default function Tag({
   active,
   text,
   onClick
}:{
   active: boolean
   text: string
   onClick: () => void
}) {
   return (
      <div className={twMerge("p-2 px-4 rounded cursor-pointer " + (active ? "bg-primary" : "bg-slate-900"))} onClick={onClick}>
         <p>{text}</p>
      </div>
   )
}