import React, { useState } from 'react';
import Accordion from '../Accordion';
import { m } from "framer-motion"
export function FAQ() {
    const [expanded, setExpanded] = useState<boolean>(false);

    const accordionIds1 = [
        {
            title: "What does E-Amigo do?",
            description: "E-Amigo is a platform for fun and entertaining teamwork and socialization services for gamers. E-Amigo offers gamers the ability to hire and play with the most engaging gamers, creators, and pros to sharpen their skills, ensure safe, toxic-free multiplayer sessions, or just socialize and talk about shared interests. "
        }, {
            title: "Why should I use E-Amigo?",
            description: "On E-Amigo, you can team up and chat with non-toxic players from all over the globe, and make your gaming experience much better!"
        }, {
            title: "Can I use a different authentication option?",
            description: "Sadly, support for those have not been added, but are in the works. "
        }
    ];
    const accordionIds2 = [
        {
            title: "How to become an E-Amigo?",
            description: "Simply sign up using one of the authentication options!"
        }, {
            title: "What if I don't know anyone?",
            description: "That's why E-Amigo exists! Find someone on E-Amigo. "
        }
    ];

    return (
        <m.section className='w-full flex flex-col px-8 md:px-16 py-2 gap-4'
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
        >
            <h2 className="text-secondary font-semibold text-2xl md:text-3xl text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-4 md:gap-10 mt-5">
                <div className='space-y-4'>
                    {accordionIds1.map((item, i) => (
                        <Accordion
                            key={i + 10}
                            i={i + 10}
                            expanded={expanded}
                            setExpanded={setExpanded}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
                <div className='space-y-4'>
                    {accordionIds2.map((item, i) => (
                        <Accordion
                            key={i}
                            i={i}
                            expanded={expanded}
                            setExpanded={setExpanded}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </m.section>
    );
};

export default FAQ;