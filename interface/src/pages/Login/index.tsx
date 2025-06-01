import { useEffect, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { connectWebSocket } from "../../services/api";

enum InputType {
    Password = "password",
    Text = "text"
}

export default function Login() {
    const [inputType, setInputType] = useState(InputType.Password)
    const [hiddenPassword, setHiddenPassword] = useState(true)
        
    const navigate = useNavigate();
    
    const changeIconStatus = () => {
        setHiddenPassword(!hiddenPassword);
        inputType === InputType.Password ? setInputType(InputType.Text) : setInputType(InputType.Password) 
    }
    
    const callProductsPage = () => {
        navigate('/home')
    }
    
    return (
        <div 
            className="
                bg-[#0D0C1D] 
                text-[#F1DAC4] 
                h-[100vh] 
                w-[100vw]
                font-[Raleway]
                grid 
                grid-cols-[1fr_3fr_3fr_1fr] 
                grid-rows-[1fr_3fr_3fr_1fr]
                gap-4
                text-base
                sm:text-lg
                md:text-xl 
                lg:text-2xl
                bg-radial-custom
            "
        >   
            <img 
                className="
                    col-start-2 
                    row-start-1
                    row-span-4
                    ml-auto
                    mr-[10%]
                    w-full
                    h-full
                    object-contain
                    drop-shadow-custom-purple rounded
                " 
                src="images/realistic_meerkat.png"
            ></img>
            <div 
                className="
                    col-start-3
                    row-start-2
                    text-center
                    flex
                    flex-col
                    bg-[#474973]
                    gap-4
                    row-span-2
                    justify-center   
                    object-contain
                    h-auto
                    mt-auto
                    mb-auto
                    rounded-2xl
                    text-[#F1DAC4]
                    shadow-custom-purple
                "
            >
                <p className="mt-[7vh]">Precisamos identificar se você é realmente um suricato...</p>
                <p 
                className="
                    text-base
                    sm:text-lg
                    w-[80%]
                    ml-auto
                    mr-auto
                "
                >
                    Insira sua credencial de suricato para acessar os produtos:
                </p>
                <div 
                    className="
                        flex
                        w-[80%]
                        items-center
                        gap-0
                        ml-auto
                        mr-auto
                    "
                >
                    <input 
                        className="
                            bg-[#F1DAC4]
                            w-[80%]
                            ml-auto
                            mr-auto
                            rounded-l-lg
                            text-black
                            text-center
                            text-base
                            sm:text-lg
                            flex-grow
                        "
                        type={inputType}
                    >
                    </input>
                    <button 
                        className="
                            bg-[#F1DAC4]
                            hover:bg-[#9e856d]
                            transition duration-500 ease-in-out
                            rounded-r-lg 
                        "
                        onClick={changeIconStatus}
                    >  
                        {hiddenPassword ? 
                            <FaEye size={24}
                                color="#474973" 
                                className="
                                    md:mt-[2px]
                                    md:ml-[2px]
                                    md:mr-[5px]
                                    md:mb-[2px]
                                "  
                            /> : 
                            <FaEyeSlash 
                                size={24}
                                color="#474973" 
                                className="
                                    md:mt-[2px]
                                    md:ml-[2px]
                                    md:mr-[5px]
                                    md:mb-[2px]
                                " 
                            />}
                    </button>
                </div>
                <button 
                    className="
                        md-3
                        bg-[#161B33]
                        text-[#F1DAC4]
                        sm:text-lg
                        rounded-lg
                        hover:bg-[#0D0C1D]
                        transition duration-500 ease-in-out
                        w-[80%]
                        ml-auto
                        mr-auto
                        mb-[7vh]
                        mt-[1vh]
                        p-3
                    "
                    onClick={callProductsPage}
                > 
                    Entrar na toca 
                </button>
            </div>   
        </div>
    )
}