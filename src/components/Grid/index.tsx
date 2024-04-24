import { m } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

function Card({
    image,
    link,
    title,
    content
}: {
    image: string,
    link: string,
    title: string,
    content: string
}) {
    return (<div className="w-full flex flex-col gap-2">
        <Link href={link} className="overflow-hidden transition-all duration-200 border-4 border-primarybg  p-8 rounded-xl">
            <Image src={image} width={720} height={720} alt="DWA" className="w-full md:max-h-[20rem] transition-all duration-200 hover:scale-[105%] object-contain " />
        </Link>
        <h2 className="font-bold text-2xl">{title}</h2>
        <p className="text-pretty">{content}</p>
    </div>)
}
export default function Grid() {
    return (
        <section className="w-full flex flex-col px-8 md:px-16 py-2 ">

            <m.div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4"
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                whileInView={{
                    opacity: 1,
                    y: [20, -5, 0],
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1],
                }}>

                <Card image="/fun.gif" title="Check Posts" content="Check out other posts from other users from E-Amigo" link="/posts" />
                <Card image="/typing.gif" title="Create Posts" content="Create a new post for others to see on E-Amigo" link="/createpost" />
                <Card image="/love.gif" title="Choose an Amigo" content="Choose another Amigo to befriend on E-Amigo " link="/posts" />

            </m.div>
        </section>
    )
}