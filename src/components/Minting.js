import React from 'react'

export default function Minting() {
    return (
        <div className="flex justify-center">
            <div className="p-12 relative bg-gray-900 border-gray-600 border-2 max-w-xl rounded-xl">
                <div className="flex justify-center">
                    <img
                        className="absolute -top-12 w-24 h-24 rounded-full border-gray-600 border-2"
                        src="https://lh3.googleusercontent.com/rYTH7ErBre_PhOVFq3dDxPD-6j7nQcg7Ny-cSQl39k7dpdN7v6qifpFxnl2n_Ld9I2-F5B6KF9P3-Dnozd3fcEYrkf9Z6GduqPfpMg=w600"
                        alt="MintingImage"
                        draggable="false"
                    />
                </div>
                <div>
                    <h1 className="mt-6 font-semibold text-2xl">Get Your Moonlight Birdy</h1>
                    <div className="flex justify-center my-2">
                        <span className="px-3 bg-white text-gray-900 rounded-full text-sm font-bold py-[0.2rem]">0/2222</span>
                    </div>
                    <p className="text-sm text-center my-6">Connect to the Ethereum network</p>
                    <div className="flex justify-center">
                        <button className="bg-orange-400 hover:bg-orange-500 transition-all duration-300 ease-in-out px-5 py-2 rounded-full text-gray-900 font-bold">Connect Your Wallet</button>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <a
                            href="https://etherscan.io/address/0x0d1fe1ebab085bd039b4d1fbf96dbe8decf769a1"
                            target={'_blank'}
                            className="text-xs text-center text-gray-400 hover:text-white transition-all duration-300 ease-in-out"
                            rel="noreferrer"
                        >
                            0x0d1fe1ebab085bd039b4....
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
