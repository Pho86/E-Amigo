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
      <div className={twMerge("p-1 px-3 text-center rounded hover:drop-shadow-primary-sm hover:-translate-x-[2px] hover:-translate-y-[2px] cursor-pointer transition-all " + (active ? "bg-primary hover:bg-primarydark" : "bg-slate-900 hover:bg-slate-700"))} onClick={onClick}>
         <p>{text}</p>
      </div>
   )
}