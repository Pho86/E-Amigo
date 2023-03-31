import axios from "axios"
import { useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
export default function CreatePost() {
    const { data: session } = useSession();
    const [post, setPost] = useState({
        title: "",
        content: "",
        game: "",
        tags: [""]
    })
    const [disabled, setDisabled] = useState(false)
    const handleChange = (event: any) => {
        setPost({ ...post, [event.target.name]: event.target.value });
        console.log(post)
    };
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setDisabled(true)
            const req = await axios.post('/api/post', { post });
            router.push('/')
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <main className="mt-20 w-full flex flex-col justify-between items-center">
                <form onSubmit={handleSubmit} onChange={handleChange} className="w-1/2">
                    <fieldset disabled={disabled} className="flex flex-col gap-3">
                        <div className='flex gap-2 justify-center flex-col'>
                            <label htmlFor="title">title</label>
                            <input
                                type="title"
                                name="title"
                                required
                                placeholder="Need a duo."
                                value={post.title}
                                className='p-2 rounded w-full text-black border-x-[3px] outline-primary border-primary'
                                onChange={() => { }}
                            />
                        </div>
                        <div className='flex gap-2 justify-center flex-col'>
                            <label htmlFor="game">game</label>
                            <input
                                type="game"
                                name="game"
                                required
                                placeholder="VALORANT, League of Legends, Other..."
                                value={post.game}
                                className='p-2 rounded w-full text-black border-x-[3px] outline-primary border-primary'
                                onChange={() => { }}
                            />
                        </div>
                        <div className='flex gap-2 justify-center flex-col'>
                            <label htmlFor="content">description</label>
                            <textarea
                                className='p-2 rounded w-full text-black border-x-[3px] outline-primary border-primary whitespace-pre-wrap'
                                name="content"
                                required
                                value={post.content}
                                placeholder="need a 5th contact me at joe#1234"
                                rows={5}
                                onChange={() => { }}
                            ></textarea>
                        </div>
                        <div className='flex justify-center items-center my-4'>
                            <Button type="submit">SUBMIT</Button>
                        </div>
                    </fieldset>
                </form>
            </main>
        </>
    )
}
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next"
import { authOptions } from './api/auth/[...nextauth]';
import Button from "@/components/Button";
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: "/api/auth/signin",
                permanent: false
            }
        }
    }

    return {
        props: {
            session,
        }
    }
}