import Minting from './components/Minting'
import MovementImages from './components/MovementImages'
import Navbar from './components/Navbar'

import { ToastContainer } from 'react-toastify'

function App() {
    return (
        <div className="font-rubik min-h-screen bg-black text-white">
            <ToastContainer />
            <div className="mx-20 py-12">
                <Navbar />
            </div>
            <div className="mx-20 my-12">
                <Minting />
            </div>
            <div className="mt-12">
                <MovementImages />
            </div>
        </div>
    )
}

export default App
