import Post from "@/components/Post"
import React, { Suspense, useState } from 'react';
import { m } from "framer-motion"
import { Link as Scroll } from "react-scroll"
import Button from "@/components/Button"
// const Spline = React.lazy(() => import('@splinetool/react-spline'));
import Link from "next/link";
import { postProps } from "@/components/Post";
import Spline from '@splinetool/react-spline';
import { TypeAnimation } from 'react-type-animation';
import Card from "@/components/Cards";
import ButtonSection from "@/components/ButtonSection";
export default function Home({
    posts,
}: {
    posts: postProps
}) {
    const [chill, setChill] = useState(false)
    const [sweaty, setSweaty] = useState(false)
    const [cringe, setCringe] = useState(false)
    const [fun, setFun] = useState(false)

    return (
        <>
            <Head>
                <title>E-Amigo | Find other gaming Amigos online!</title>
            </Head>

            <main className="flex-col flex justify-center w-full items-center gap-6">
                <section className="w-full p-4 pt-24 sm:p-8 sm:pt-24 md:pt-32 md:p-16 bg-topbg">
                    <div className="w-full grid grid-cols-1 max-h-[1000px] md:min-h-[600px] md:grid-cols-[45%_55%] ">
                        <div className="flex flex-col gap-6 h-1/2 justify-between z-50">
                            <div className="flex flex-col break-words w-full" >
                                <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: .2 }} className="w-full">
                                    <h1 className="font-bold text-3xl md:text-4xl">
                                        <span className="text-primary font-extrabold">
                                            E-Amigo
                                        </span>
                                        <TypeAnimation sequence={[
                                            ' is a place to find other gamers.',
                                            2000,
                                            ' is a place to build connections.',
                                            2000,
                                            ' is a place to feed your passion.',
                                            2000
                                        ]}
                                            wrapper="span"
                                            speed={50}
                                            repeat={Infinity} />
                                    </h1>
                                </m.div>
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
                </section>
                <section id="posts" className="w-full p-4 sm:p-8 md:p-16 md:pt-4 mb-5 z-50">
                    <div className="flex justify-between">
                        <h2 className="font-bold text-2xl self-start">Recent Posts</h2>
                        <Link href="/createpost">
                            <FaPlusCircle className="text-3xl hover:drop-shadow-primary-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all" />
                        </Link>
                    </div>
                    <m.div className="grid gap-6 my-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: .5 }}>
                        <Card text="chill" active={chill} onClick={() => { setChill(!chill); setSweaty(false); setFun(false); setCringe(false) }} src="/love.gif" srcIn="/love.svg" />
                        <Card text="fun" active={fun} onClick={() => { setFun(!fun); setSweaty(false); setChill(false); setCringe(false) }} src="/fun.gif" srcIn="/fun.svg" />
                        <Card text="sweaty" active={sweaty} onClick={() => { setSweaty(!sweaty); setChill(false); setFun(false); setCringe(false) }} src="/typing.gif" srcIn="/typing.svg" />
                        <Card text="cringe" active={cringe} onClick={() => { setCringe(!cringe); setSweaty(false); setFun(false); setChill(false) }} src="/sweat.gif" srcIn="/sweat.svg" />
                    </m.div>
                    <m.div className="mt-5  grid grid-flow-row gap-6 w-full grid-cols-home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: .8 }}>
                        {chill && posts.map((post: any, i: number) => {
                            for (let i = 0; i < post.tags.length; i++) {
                                if (post.tags[i] === "chill") {
                                    return <Post id={`post${post.id}`} post={post} key={i} />
                                }
                            }
                        })}
                        {fun && posts.map((post: any, i: number) => {
                            for (let i = 0; i < post.tags.length; i++) {
                                if (post.tags[i] === "fun") {
                                    return <Post id={`post${post.id}`} post={post} key={i} />
                                }
                            }
                        })}
                        {cringe && posts.map((post: any, i: number) => {
                            for (let i = 0; i < post.tags.length; i++) {
                                if (post.tags[i] === "cringe") {
                                    return <Post id={`post${post.id}`} post={post} key={i} />
                                }
                            }
                        })}
                        {sweaty && posts.map((post: any, i: number) => {
                            for (let i = 0; i < post.tags.length; i++) {
                                if (post.tags[i] === "sweaty") {
                                    return <Post id={`post${post.id}`} post={post} key={i} />
                                }
                            }
                        })}
                        {!chill && !fun && !cringe && !sweaty &&
                            posts.map((post: any, i: number) => (
                                <Post id={`post${post.id}`} post={post} key={i} />
                            ))
                        }
                    </m.div>
                </section>
                <ButtonSection />
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
            comments: true,
        }
    })
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)),
        }
    }
}