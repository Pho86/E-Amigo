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
        tags: []
    } as any)
    const [disabled, setDisabled] = useState<boolean>(false)
    const handleChange = (event: any) => {
        setPost({ ...post, [event.target.name]: event.target.value });
    };
    const [chill, setChill] = useState<boolean>(true)
    const [sweaty, setSweaty] = useState<boolean>(true)
    const [cringe, setCringe] = useState<boolean>(true)
    const [fun, setFun] = useState<boolean>(true)

    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setDisabled(true)
            if (chill) post.tags.push("chill")
            if (fun) post.tags.push("fun")
            if (sweaty) post.tags.push("sweaty")
            if (cringe) post.tags.push("cringe")
            const req = await axios.post('/api/post', { post });
            router.push('/')
        }
        catch (error) {
            console.log(error)
        }
    }
    const [all, setAll] = useState(true)
    const handleAll = () => {
        if (all) {
            setAll(false)
            setChill(false);
            setFun(false);
            setCringe(false);
            setSweaty(false)
        } else {
            setAll(true)
            setChill(true);
            setFun(true);
            setCringe(true);
            setSweaty(true);
        }
    }

    return (
        <>
            <Head>
                <title>Create A Post | E-Amigo</title>
            </Head>

            <main className="mt-16 w-full flex flex-col justify-between items-center p-4 sm:p-8 md:p-16">
                <h1 className="font-bold text-2xl mb-4">Create A Posting</h1>
                <form onSubmit={handleSubmit} onChange={handleChange} className="w-full lg:w-8/12">
                    <fieldset disabled={disabled} className="flex flex-col gap-3">
                        <div className='flex gap-2 justify-center flex-col'>
                            <label htmlFor="title">enter title</label>
                            <input
                                type="title"
                                name="title"
                                required
                                placeholder="Need someone for VALORANT 5 stack..."
                                value={post.title}
                                className='p-2 rounded w-full text-black border-x-[3px] outline-primary border-primary'
                                onChange={() => { }}
                            />
                        </div>
                        <div className='flex gap-2 justify-center flex-col'>
                            <label htmlFor="game">enter game</label>
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
                            <label htmlFor="content">enter description</label>
                            <textarea
                                className='p-2 rounded w-full text-black border-x-[3px] outline-primary border-primary whitespace-pre-wrap'
                                name="content"
                                required
                                value={post.content}
                                placeholder="need a 5th for VALORANT, contact me at joe#1234, below iron only please"
                                rows={5}
                                onChange={() => { }}
                            ></textarea>
                        </div>

                        <div className='flex gap-4 justify-center'>
                            <Tag active={all} text="all" onClick={handleAll} />
                            <Tag active={chill} text="chill" onClick={() => { setChill(!chill); setAll(false); }} />
                            <Tag active={fun} text="fun" onClick={() => { setFun(!fun); setAll(false) }} />
                            <Tag active={cringe} text="cringe" onClick={() => { setCringe(!cringe); setAll(false) }} />
                            <Tag active={sweaty} text="sweaty" onClick={() => { setSweaty(!sweaty); setAll(false) }} />
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
import Head from "next/head";
import Tag from "@/components/Tag";
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