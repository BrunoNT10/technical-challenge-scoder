import { useState } from "react";
import { BsList } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [open, setOpen] = useState(false)
    
    const navigate = useNavigate()
    
    const logOut = () => navigate("/")
    const toggleDropdown = () => setOpen(!open);
    
    return (
        <header 
            className="
                bg-navy-midnight 
                text-beige
                flex 
                h-[5rem] 
                font-raleway-500
                relative
            "
        >   
            <div className="ml-auto h-auto flex flex-col text-right">
                <button 
                    className="rounded-lg mt-[1.1rem] mb-auto ml-auto mr-2"
                    onClick={toggleDropdown}
                >
                    <BsList size={40}/>
                </button>
                <div 
                    className={`
                        absolute 
                        top-full
                        w-40
                        bg-white
                        rounded
                        shadow-lg
                        right-0
                        ${open ? "block": "hidden"}
                    `}
                >
                  <ul>
                    <li 
                        className="hover:bg-gray-200
                            cursor-pointer
                            text-navy-midnight
                            mt-[0.5rem]
                            mr-[0.5rem]
                        "
                    >
                        Home
                    </li>
                    <li 
                        className="
                            hover:bg-gray-200 
                            cursor-pointer
                            text-navy-midnight
                            mt-[0.5rem]
                            mr-[0.5rem]
                        "
                    >
                        Cadastrar Produto
                    </li>
                    <li 
                        className="
                            hover:bg-gray-200 
                            cursor-pointer 
                            text-navy-midnight
                            mt-[0.5rem]
                            mr-[0.5rem]
                            mb-[0.5rem]
                        "
                        onClick={logOut}
                    >
                        Sair
                    </li>
                  </ul>
                </div>
            </div>
        </header>
    )
}