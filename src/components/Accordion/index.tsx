import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Accordion ({ i, expanded, setExpanded, title, description }: {
  i: any,
  expanded: any,
  setExpanded: any,
  title: any,
  description: any,
}) {
  const isOpen = i === expanded;

  return (
    <>
      <motion.div
        initial={false}
        onClick={() => setExpanded(isOpen ? false : i)}
        className="border-b-4 border-primarybg cursor-pointer border-spacing-2 pb-4"
      >
        <h3 className='font-bold text-lg'>
          {title}
        </h3>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.section
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className=""
            >
              {description}
            </motion.section>
          )}
        </AnimatePresence>
      </motion.div>

    </>
  );
};

export default Accordion;