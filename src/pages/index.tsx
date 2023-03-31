import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { prisma } from "server/db/client"
import Post from "@/components/Post"

export default function Home({
    posts
}: {
    posts: any
}) {
    return (
        <>
            <main className="mt-24 flex-col flex justify-center w-full items-center gap-5">
                <div>
                    
                </div>
                <h1>Recent Posts</h1>
                {posts && posts.map((post: any, i: number) => (
                    <Post post={post} key={i}/>
                ))}
            </main>
        </>
    )
}

export async function getServerSideProps() {
    const posts = await prisma?.post.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            user: true,
        }
    })
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts))
        }
    }
}