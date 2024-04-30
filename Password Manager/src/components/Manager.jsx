// import React from 'react'
import { useState, useEffect, useRef } from "react"
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const pass = useRef()
    const [form, setForm] = useState({ id: "", site: "", name: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const [isUpdate, setIsUpdate] = useState(false)

    useEffect(() => {
        if (localStorage.password) {
            setPasswordArray(JSON.parse(localStorage.getItem('password')))
        }
    }, [])


    const handleSave = () => {
        if(form.site.length < 3 || form.name.length < 3 || form.password.length < 3){
            toast.error('Error! Cannot Save the password', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        else{
            if (isUpdate) {
                // console.log("HandleSave is clicked")
                let cloneArray = [...passwordArray]
                let index = cloneArray.findIndex((item) => item.id == form.id)
                cloneArray[index] = form
                setPasswordArray(cloneArray)
                localStorage.setItem("password", JSON.stringify(cloneArray))
                setForm({ id: "", site: "", name: "", password: "" })
                setIsUpdate(false)
                toast("Successfylly Updated Password!", {theme: "dark",})
            }
            else {
                // console.log("HandleSave is clicked")
                // console.log(form)
                let id = uuidv4();
                setPasswordArray([...passwordArray, { ...form, id: id }])
                // console.log([...passwordArray, {...form, id: id}])
                localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: id }]))
                setForm({ id: "", site: "", name: "", password: "" })
                toast('Successfully Saved Password!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        // console.log({...form, [e.target.name]:e.target.value})
    }

    const handleChangeImgage = (e) => {
        if (pass.current.type == "password") {
            pass.current.type = "text";
            e.target.src = "Images/view.png";
        }
        else {
            pass.current.type = "password";
            e.target.src = "Images/hide.png"
        }
    }

    const handleEdit = (id) => {
        // console.log("Edit thid id", id)
        setForm(passwordArray.filter((item) => {
            return item.id == id
        })[0])
        setIsUpdate(true)
    }

    const handleDelete = (id) => {
        let isDelete = confirm("Do you really want delete this password?")
        if (isDelete) {
            setPasswordArray(passwordArray.filter((item) => {
                return item.id != id
            }))
            localStorage.setItem('password', JSON.stringify(passwordArray.filter((item) => {
                return item.id != id
            })))
            toast('Successfully Deleted Password!', {theme: "dark",})
        }
    }

    const handleCopy = (str) => {
        navigator.clipboard.writeText(str)
        toast('Successfully Copied to Clipboard!', {theme: "dark",})
    }

    return (
        <div className="max-w-[700px] h-fit m-auto bg-green-100 py-2 my-2 rounded-md">
            {/* Below is for tost */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="addPass flex flex-col items-center py-4 px-2">
                <div className="text-2xl font-bold text-gray-700">
                    <span className="text-green-700">&lt;</span>Pass<span className="text-green-700">OP/&gt;</span>
                </div>
                <div className="text-gray-700 font-semibold">Your own Password Manager</div>

                <input type="text" className="w-full mt-5 rounded-full border outline-slate-400 px-3 py-[2px]" placeholder="Enter URL" value={form.site} name="site" onChange={(e) => handleChange(e)} />

                <div className="flex w-full gap-2 mt-1 flex-col min-[632px]:flex-row">
                    <input type="text" className="min-[632px]:w-3/4 w-full rounded-full border outline-slate-400 px-3 py-[2px]" placeholder="Enter Name" value={form.name} name="name" onChange={(e) => handleChange(e)} />

                    <div className="password min-[632px]:w-1/4 w-full relative">
                        <input type="password" className="w-full rounded-full border outline-slate-400 px-3 py-[2px]" placeholder="Enter Password" value={form.password} name="password" onChange={(e) => handleChange(e)} ref={pass} />
                        <img src="Images/hide.png" alt="eye" className="w-6 absolute right-2 top-1 cursor-pointer" onClick={(e) => { handleChangeImgage(e) }} />
                    </div>
                </div>

                <button className="py-1 px-3 mt-2 rounded-full bg-green-400 hover:bg-green-500 flex items-center gap-1" onClick={handleSave}>
                    <lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover"
                        style={{ "width": "20px", "height": "20px" }}>
                    </lord-icon>
                    {isUpdate ? <span>Update</span> : <span>Save</span>}
                </button>
            </div>

            <div className="text-gray-700 font-semibold pl-2">Your Passwords</div>


            {passwordArray.length == 0 && <div className="pl-2">No password to show</div>}
            {passwordArray.length != 0 &&
                <div className="relative overflow-x-auto w-[95%] m-auto bg-green-200 rounded-md my-2">
                    <table className="w-full text-min-[632px] text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 bg-green-50 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Site URL
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Password
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordArray.map(item => {
                                return (
                                    <tr key={item.id} className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-green-300">
                                        <td className="px-6 py-4 hover:underline cursor-pointer flex items-center">
                                            <a href={item.site} target="_BLANK">{item.site}</a>
                                            <div><lord-icon
                                                style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px", "cursor": "pointer" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover"
                                                onClick={()=>{handleCopy(item.site)}} >
                                            </lord-icon>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <span>{item.name}</span>
                                                <lord-icon
                                                    style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px", "cursor": "pointer" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    onClick={()=>{handleCopy(item.name)}} >
                                                </lord-icon>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <span>{"*".repeat(item.password.length)}</span>
                                                <lord-icon
                                                    style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px", "cursor": "pointer" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" 
                                                    onClick={()=>{handleCopy(item.password)}}>
                                                </lord-icon>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <span onClick={() => { handleEdit(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "20px", "height": "20px" }}>
                                                </lord-icon>
                                            </span>
                                            <span onClick={() => { handleDelete(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "20px", "height": "20px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>);
                            })}
                        </tbody>
                    </table>
                </div>}

        </div>
    )
}

export default Manager
