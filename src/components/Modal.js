import React from 'react'
import Backdrop from './Backdrop'
import { motion } from 'framer-motion'
import modalImage from '../assets/images/modal_image.jpg'

const dropIn = {
    hidden: {
        y: '100vh',
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: '100vh',
        opacity: 0,
    },
}

export default function Modal({ handleClose }) {
    return (
        <Backdrop onClick={handleClose}>
            <motion.div onClick={(e) => e.stopPropagation()} variants={dropIn} initial="hidden" animate="visible" exit="exit" className="flex justify-center">
                {/* <img className="w-1/2 h-1/2 rounded-3xl" src={modalImage} alt="" /> */}
                <div className="h-[60vh] w-[70vh] rounded-3xl bg-no-repeat bg-cover bg-[url('./assets/images/modal_image.jpg')]">
                    <div className="flex h-[60vh] justify-center font-grandstander">
                        <div className="m-auto text-center">
                            <h1 className="text-4xl font-semibold tracking-wider">Token Minted!</h1>
                            <h2 className="mt-3 text-xl font-medium">Look What You Got in Opensea!</h2>
                            <div className="flex justify-center mt-4">
                                <button className="bg-blue-900 text-white px-8 py-2 rounded-md font-semibold hover:bg-black transition-all duration-300 ease-in-out" onClick={handleClose}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Backdrop>
    )
}
