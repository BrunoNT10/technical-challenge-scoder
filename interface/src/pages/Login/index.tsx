import Header from "../../components/Header"

export default function Login() {
    return (
        <div 
            className="
                bg-[#0D0C1D] 
                text-[#F1DAC4] 
                h-[100vh] 
                w-[100vw]
                font-raleway-500
                grid 
                grid-cols-4 
                gap-4
            "
        >   
            <img className="col-start-2" src="images/normal_meerkat.png"></img>
            <span 
                className="
                    col-start-3 
                    text-base
                    sm:text-lg
                    md:text-xl
                    lg:text-2xl
                    xl:text-3xl
                "
            >
                Precisamos identficar se você é realmente um suricato...
            </span>   
        </div>
    )
}