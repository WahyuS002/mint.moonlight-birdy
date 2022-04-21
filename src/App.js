import Minting from './components/Minting'
import MovementImages from './components/MovementImages'
import Navbar from './components/Navbar'
import Roadmap from './components/Roadmap'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <div className="font-rubik min-h-screen bg-black text-white">
            <ToastContainer />
            <div className="absolute inset-0 bg-[url('./assets/images/banner.png')] bg-no-repeat bg-cover w-full h-[95%]"></div>
            <div className="mx-20 py-12">
                <Navbar />
            </div>
            <div className="mx-5 md:mx-20 my-12">
                <Minting />
            </div>
            <div className="mt-12">
                <MovementImages />
            </div>
            <div className="mx-5 md:mx-20 py-12">
                <Roadmap />
            </div>
        </div>
    )
}

export default App
