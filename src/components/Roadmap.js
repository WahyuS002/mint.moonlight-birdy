import React from 'react'

import { roadmaps } from '../utils/words'

export default function Roadmap() {
    return (
        <div>
            <h1 className="text-5xl font-bold text-center mb-8">Roadmap</h1>
            <div className="grid md:grid-cols-3 gap-6">
                {roadmaps.map((roadmap) => {
                    return (
                        <div key={roadmap.title} className="bg-gray-900 rounded-xl p-8 text-white">
                            <h2 className="text-gray-100 text-3xl font-bold mb-2">{roadmap.title}</h2>
                            <p className="text-gray-400">{roadmap.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
