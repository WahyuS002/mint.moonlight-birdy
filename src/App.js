import Minting from './components/Minting'
import MovementImages from './components/MovementImages'
import Navbar from './components/Navbar'
import Roadmap from './components/Roadmap'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <div className="font-rubik min-h-screen bg-black text-white relative">
            <ToastContainer />
            <div className="absolute bg-[url('./assets/images/banner.png')] bg-no-repeat md:bg-cover bg-top w-full min-h-screen"></div>
            <div className="min-h-screen">
                <div className="h-screen relative">
                    <div className="mx-20 py-12">
                        <Navbar />
                    </div>
                    <div className="mx-5 md:mx-20 my-12">
                        <Minting />
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <MovementImages />
            </div>
            <div className="mx-5 md:mx-20 mt-10 md:mt-12">
                <Roadmap />
            </div>
        </div>
    )
}

export default App
