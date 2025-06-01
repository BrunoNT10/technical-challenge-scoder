type CardModel = {
    className: string
    category: string
}

export default function Card(props: CardModel) {
    return (
        <div
            className={`
                flex
                flex-col
                gap-4
                h-[10rem]
                ml-auto
                mr-auto
                text-center
                w-[100%]
                mt-[2rem]
                bg-slate-blue-dark
                justify-center
                rounded-lg
                text-beige
                font-[Raleway]
                shadow-custom-purple
                ${props.className}
            `}
        >   
            <p className="text-xl"> Categoria: { props.category } </p>
            <p className="text-sm"> Número de Produtos: 20 </p>
            <button 
                className="
                    text-sm 
                    bg-lavender-gray 
                    w-[70%] 
                    h-[20%] 
                    ml-auto 
                    mr-auto
                    rounded-lg
                    text-navy-midnight
                    hover:bg-deep-night-blue
                    hover:text-beige
                    transition duration-500 ease-in-out
                "
            > 
                Consultar produtos 
            </button>
        </div>
    )
}