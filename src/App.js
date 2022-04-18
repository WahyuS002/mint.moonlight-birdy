import Minting from './components/Minting'
import Navbar from './components/Navbar'

function App() {
    return (
        <div className="font-rubik min-h-screen bg-black text-white">
            <div className="mx-20 py-12">
                <Navbar />
            </div>
            <div className="mx-20 my-12">
                <Minting />
            </div>
        </div>
    )
}

export default App
