import axios from "axios"
import { useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
export default function Post() {
    const { data: session } = useSession();
    const [post, setPost] = useState({
        title: "",
        content: "",
    })
    const [disabled, setDisabled] = useState(false)
    const handleChange = (event: any) => {
        setPost({ ...post, [event.target.name]: event.target.value });
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
            <main className="mt-16">
                <form onSubmit={handleSubmit} onChange={handleChange}>
                    <fieldset disabled={disabled}>
                        <div className='flex gap-2 justify-center flex-col'>
                            <label htmlFor="title">title</label>
                            <input
                                type="title"
                                name="title"
                                required
                                placeholder="title"
                                className='p-2 rounded w-full text-black border-x-[3px] outline-primary border-primary'
                            />
                        </div>
                        <div className='flex gap-2 justify-center flex-col'>
                            <label htmlFor="content">content</label>
                            <textarea
                                className='p-2 rounded w-full text-black border-x-[3px] outline-primary border-primary'
                                name="content"
                                required
                                placeholder="content"
                                rows={5}
                            ></textarea>
                        </div>
                        <div className='flex justify-center items-center my-4'>
                            <button type="submit" >SUBMIT</button>
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