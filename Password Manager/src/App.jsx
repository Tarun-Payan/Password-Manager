import Navbar from "./components/Navbar"
import Manager from "./components/Manager"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Navbar />
      <div className="min-[760px]:pb-16 min-[636px]:pb-20 pb-24 pt-2">
        <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App