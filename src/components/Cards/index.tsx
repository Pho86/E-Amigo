import { twMerge } from "tailwind-merge"
export default function Card({
    text,
    active = true,
    onClick = () => { },

}: {
    text: string,
    active: boolean,
    onClick: () => void
}) {
    return (
        <div className={twMerge("p-2 w-full font-bold text-xl px-4 rounded cursor-pointer bg-primary hover:bg-primarydark transition-all " + (active ? "bg-primarydark hover:bg-primary drop-shadow-primary-sm -translate-x-[2px] -translate-y-[2px] " : ""))} onClick={onClick}>
            {text} 
        </div>
    )
}