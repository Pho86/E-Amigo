
import { twMerge } from "tailwind-merge"

export default function Button({
   children,
   type,
   disabled,
   onClick,
   className = "",
}: {
   children: React.ReactNode;
   type?: "submit" | "button" | undefined,
   disabled?: boolean,
   onClick?: () => void,
   className?: string,

}) {
   return (
      <button type={type} onClick={onClick} disabled={disabled} className={twMerge(`p-3 w-full bg-secondary text-white transition-all duration-150 rounded-xl text-xl font-bold hover:drop-shadow-primary hover:-translate-x-[5px] hover:-translate-y-[5px] `, className)}>
         {children}
      </button>
   )
}