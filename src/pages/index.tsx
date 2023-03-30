import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
export default function Home({
    posts
}: {
    posts: any
}) {
    return (
        <>
            <main className="mt-16">
                {posts && posts.map((post: any, i: number) => (
                    <div key={i}>
                        <Link href={`/post/${post.id}`}>
                            <div className="flex">
                                <Image
                                    className="h-12 w-12 rounded-full"
                                    src={post.user.image}
                                    width={50}
                                    height={50}
                                    alt=""
                                />
                                {post.user?.name}
                            </div>
                            <h1>{post.title}</h1>
                            <p>{post.content}</p>
                            <p>{new Date(post.createdAt).toLocaleDateString('en-GB')}</p>
                        </Link>

                    </div>
                ))}
            </main>
        </>
    )
}
import { prisma } from "server/db/client"
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