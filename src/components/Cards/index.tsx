import { twMerge } from "tailwind-merge"
import Image from "next/image"
export default function Card({
    text,
    active = true,
    onClick = () => { },
    src,
    width = 75,
    height = 75

}: {
    text: string,
    active: boolean,
    onClick: () => void
    src: string
    width?: number,
    height?: number
}) {
    return (
        <div className={twMerge("p-3 flex justify-between w-full font-bold text-xl px-4 rounded cursor-pointer bg-primary hover:bg-primarydark transition-all " + (active ? "bg-primarydark hover:bg-primary drop-shadow-primary-sm -translate-x-[2px] -translate-y-[2px] " : ""))} onClick={onClick}>
            <p>{text} </p>
            <div className="-my-6">
                <Image src={src} width={width} height={height} alt="tag icon" className={twMerge("drop-shadow-[3px_3px_0px_rgba(166,88,244,1)] " + (active ? "grayscale-0 " : "grayscale-[85%]"))} />
            </div>
        </div>
    )
}