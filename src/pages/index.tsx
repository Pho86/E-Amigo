import Post from "@/components/Post"
import React, { Suspense } from 'react';
import { m } from "framer-motion"
import { Link as Scroll } from "react-scroll"
import Button from "@/components/Button"
const Spline = React.lazy(() => import('@splinetool/react-spline'));
import Link from "next/link";
import { postProps } from "@/components/Post";

export default function Home({
    posts,
    randomUsers,
}: {
    posts: postProps,
    randomUsers: any
}) {
    return (
        <>
            <Head>
                <title>E-Amigo | Gaming With Friends</title>
            </Head>

            <main className="mt-24 flex-col flex justify-center w-full items-center p-4 pt-8 sm:p-8 md:p-16 gap-6">
                <div className="w-full grid grid-cols-1 max-h-[1000px] md:min-h-[600px] md:grid-cols-[45%_55%]">
                    <div className="flex flex-col gap-6 h-1/2 justify-between z-50">
                        <div className="flex flex-col">
                            <m.h1 initial={{ opacity: 0, width: "25%" }} animate={{ opacity: 1, width: "100%" }} transition={{ duration: 1.1, delay: .2 }} className="font-bold text-4xl whitespace-nowrap">Welcome to <span className="text-primary font-extrabold">E-Amigo</span>!</m.h1>
                            <m.hr className="border-primary border-2 mt-2 rounded-md" initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "100%" }} transition={{ duration: 1.2, delay: .2 }} />
                        </div>
                        <m.div className="flex flex-col gap-3 p-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: .3 }}>
                            <p>E-Amigo is a <span className="text-secondary font-semibold">community</span> designed to connect <span className="text-secondary font-semibold">gamers</span> globally by providing them with a platform to find others to play video games together and make new friends.</p>
                            <p>We aspire to create <span className="text-secondary font-semibold">authentic connections</span> among our community members. Although the journey may be challenging, we are committed to embarking on it together with our community.</p>
                            <p>We respect gamers for their <span className="text-secondary font-semibold">passion and tenacity</span> for the things they hold dear. At E-Amigo, we strive to establish a bridge that connects individuals worldwide and allows them to indulge in their passion for gaming while making new friends. Become part of the <Link href="/profile" className="text-secondary font-semibold">Amigos</Link> today.</p>
                        </m.div>
                        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: .4 }} className="p-2">
                            <Scroll to="posts" className=""
                                smooth={true}
                                offset={-100}
                                duration={500}
                                spy={true}
                            >
                                <Button>
                                    See Recent Posts
                                </Button>
                            </Scroll>
                        </m.div>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <m.div className="max-h-[600px]" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: "100%" }} transition={{ duration: 2, delay: 2 }}>
                            <Spline scene="https://prod.spline.design/OFVNpul-5fMB04Hx/scene.splinecode" />
                        </m.div>
                    </Suspense>

                </div>
                <section id="posts" className="w-full mb-10 z-50">
                    <div className="flex justify-between">
                        <h2 className="font-bold text-2xl self-start">Recent Posts</h2>
                        <Link href="/createpost">
                            <FaPlusCircle className="text-3xl hover:drop-shadow-primary-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all" />
                        </Link>
                    </div>
                    <m.div className="mt-5 grid grid-flow-row gap-6 w-full grid-cols-home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: .5 }}>
                        {posts && posts.map((post: any, i: number) => (
                            <Post post={post} key={i} />
                        ))}
                    </m.div>
                </section>
                <section className="my-8 flex flex-col gap-5">
                    <h2 className="font-bold text-xl">Login or check your E-Amigo profile</h2>
                    <div className="flex">
                        <Link href="/profile" className="w-full px-4">
                            <Button>Login/Profile</Button>
                        </Link>
                    </div>
                </section>
            </main>
        </>
    )
}

import { prisma } from "server/db/client"
import { FaPlusCircle } from "react-icons/fa";
import Head from "next/head";
export async function getServerSideProps() {
    const posts = await prisma?.post.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            user: true,
        }
    })
    // const randomUsers = await prisma.user.findMany({

    // })
    // console.log(randomUsers)
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)),
            // randomUsers: JSON.parse(JSON.stringify(randomUsers))
        }
    }
}