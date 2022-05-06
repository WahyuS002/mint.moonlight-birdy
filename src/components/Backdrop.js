import React from 'react'
import { motion } from 'framer-motion'

export default function Backdrop({ children, onClick }) {
    return (
        <motion.div className="flex h-screen top-0 absolute w-full z-10 bg-black/70" onClick={onClick} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="m-auto">{children}</div>
        </motion.div>
    )
}
