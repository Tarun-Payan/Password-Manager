// import React from 'react'

const Navbar = () => {
    return (
        <div className="bg-slate-800 p-2 flex justify-between items-center">
            <div className="text-xl font-bold text-white">
                <span className="text-green-400">&lt;</span>Pass<span className="text-green-400">OP/&gt;</span>
            </div>
            <div className="flex text-white items-center font-semibold gap-2 border rounded-full p-1 bg-green-600 cursor-pointer">
                <img src="Images/github.png" width={30} height={30} alt="github logo" className="invert rounded-full"/>
                <span>GitHub</span>
            </div>
        </div>
    )
}

export default Navbar