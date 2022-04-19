import React from 'react'
import Marquee from 'react-fast-marquee'
import { to_left_nfts } from '../utils/bulkImages'
import { to_right_nfts } from '../utils/bulkImages'

export default function MovementImages() {
    return (
        <div>
            <div>
                <Marquee gradient={false} speed="40">
                    {to_left_nfts.map((nft) => {
                        return <img className="w-72 h-72 m-4 rounded-lg" src={nft.image} alt={nft.alt} draggable={false} />
                    })}
                </Marquee>
                <Marquee gradient={false} speed="40" direction="right">
                    {to_right_nfts.map((nft) => {
                        return <img className="w-72 h-72 m-4 rounded-lg" src={nft.image} alt={nft.alt} draggable={false} />
                    })}
                </Marquee>
            </div>
        </div>
    )
}
