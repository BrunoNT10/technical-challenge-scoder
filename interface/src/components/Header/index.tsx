import { useState } from "react";
import { BsList } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
    const [open, setOpen] = useState(false)
    const { logout } = useAuth()
    const navigate = useNavigate()
    
    const toggleDropdown = () => setOpen(!open);
    
    return (
        <header 
            className="
                bg-navy-midnight 
                text-beige
                flex 
                h-[5rem] 
                w-full
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
                        onClick={() => {navigate('/home')}}
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
                        onClick={() => {navigate('/new-product')}}
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
                        onClick={() => {
                            logout()
                            navigate('/')
                        }}
                    >
                        Sair
                    </li>
                  </ul>
                </div>
            </div>
        </header>
    )
}