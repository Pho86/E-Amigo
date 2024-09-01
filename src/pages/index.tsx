"use client"
import React, { useRef } from 'react';
import { m } from "framer-motion"
import Link from "next/link";
import Head from "next/head";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/Hero";
import ButtonSection from '@/components/ButtonSection';

import Grid from '@/components/Grid';
import FAQ from '@/components/FAQ';

export default function Home({

}: {

    }) {


    return (
        <>
            <Head>
                <title>E-Amigo | Find other gaming Amigos online!</title>
            </Head>

            <main className="flex-col flex justify-center w-full items-center gap-8">
                <HeroBanner>
                    <m.h1
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
                        }}
                        className="text-2xl px-4 md:text-6xl lg:text-7xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
                    >
                        Find <span className='text-primary'>Amigos</span> Today for Tommorrow
                    </m.h1>
                    <div
                        className="max-w-xl items-center"
                    >
                        <m.div className=""
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
                                delay: 0.3
                            }}
                        >
                            <p className="mt-4 font-normal text-base text-neutral-300 text-center mx-auto">
                                Find other Amigos to game with for today and tomorrow with E-Amigo and create a community with the other amigos. Become a part of the Amigos today, so you can find other Amigos for tommorrow.
                            </p>
                        </m.div>
                        <Link href="/posts" >
                            <m.div initial={{
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
                                    delay: 0.6
                                }}
                                className="pt-5"
                            >
                                <Button >Go To Posts</Button>
                            </m.div>
                        </Link >
                    </div>
                </HeroBanner>
                <Grid />

                <FAQ />

                <section className="bg-topbg w-full flex items-center py-12 justify-center">
                    <div className="flex flex-col items-center text-center gap-4 max-w-5xl text-balance text-lg md:text-xl leading-normal ">
                        <m.h2 className="text-secondary font-semibold text-2xl md:text-3xl"
                            initial={{ opacity: 0, y: 20 }} whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: .5, ease: "easeInOut" }}
                        >About Us</m.h2>
                        <m.div className="flex flex-col gap-3 p-2 leading-normal"
                            initial={{ opacity: 0, y: 20 }} whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: .5, ease: "easeInOut", delay: .3 }}
                        >
                            <p>E-Amigo is a community designed to connect gamers globally by providing them with a platform to find others to play video games together and make new friends.
                                We aspire to create authentic connections among our community members. We strive to establish a bridge that connects individuals worldwide and allows them to indulge in their passion for gaming while making new friends. Become part of the <Link href="/profile" className="text-secondary font-semibold">Amigos</Link> today.</p>
                        </m.div>
                    </div>
                </section>
                <ButtonSection />
                <Footer />
            </main>
        </>
    )
}

