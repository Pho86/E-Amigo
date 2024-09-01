import Post from "@/components/Post"
import React, { Suspense, useState } from 'react';
import { m } from "framer-motion"
import { Link as Scroll } from "react-scroll"
import Button from "@/components/Button"
import Link from "next/link";
import { postProps } from "@/components/Post";
import Spline from '@splinetool/react-spline';
import { TypeAnimation } from 'react-type-animation';
import Card from "@/components/Cards";
import ButtonSection from "@/components/ButtonSection";
export default function Posts({
    posts,
}: {
    posts: postProps
}) {
    const [chill, setChill] = useState<boolean>(false)
    const [sweaty, setSweaty] = useState<boolean>(false)
    const [cringe, setCringe] = useState<boolean>(false)
    const [fun, setFun] = useState<boolean>(false)

    return (
        <>
            <Head>
                <title>E-Amigo Posts | Find other gaming Amigos online!</title>
            </Head>

            <main className="flex-col flex justify-center w-full items-center gap-6">
                <section id="posts" className="w-full px-4 max-w-screen-2xl md:pt-4 mb-5 z-50">
                    <div className="flex justify-between">
                        <h1 className="font-bold text-2xl self-start mt-20">Recent Posts</h1>
                        <Link href="/createpost">
                            <FaPlusCircle className="text-3xl hover:drop-shadow-primary-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all" />
                        </Link>
                    </div>
                    <m.div className="grid gap-6 my-4 md:grid-cols-4 grid-cols-2 place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2}}>
                        <Card text="chill" active={chill} onClick={() => { setChill(!chill); setSweaty(false); setFun(false); setCringe(false) }} src="/love.gif" srcIn="/love.svg" />
                        <Card text="fun" active={fun} onClick={() => { setFun(!fun); setSweaty(false); setChill(false); setCringe(false) }} src="/fun.gif" srcIn="/fun.svg" />
                        <Card text="sweaty" active={sweaty} onClick={() => { setSweaty(!sweaty); setChill(false); setFun(false); setCringe(false) }} src="/typing.gif" srcIn="/typing.svg" />
                        <Card text="cringe" active={cringe} onClick={() => { setCringe(!cringe); setSweaty(false); setFun(false); setChill(false) }} src="/sweat.gif" srcIn="/sweat.svg" />
                    </m.div>
                    <div className="mt-5 grid grid-flow-row gap-6 w-full" >
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
                    </div>
                </section>
                <ButtonSection />
                <Footer/>
            </main>
        </>
    )
}

import { prisma } from "server/db/client"
import { FaPlusCircle } from "react-icons/fa";
import Head from "next/head";
import Footer from "@/components/Footer";
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