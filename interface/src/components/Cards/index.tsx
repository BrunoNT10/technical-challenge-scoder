import { useEffect, useState } from "react"
import { Categories } from "../../utils/enums"
import CategorySelect from "../CategorySelect"

type CardModel = {
    className: string
    category: string
    products: Record<string, any>[]
}

export default function Card(props: CardModel) {
    const [category, setCategory] = useState(props.category)
    const [categories, setCategories] = useState<Categories[]>([])
    const [
        productsByCategories, 
        setProductsByCategories
    ] = useState<Record<string, any>[]>([])
    
    useEffect(() => {
        if (props.category === Categories.All) {
            setCategory(category)
        }
        else {
            const categoryArray = Object.values(Categories).map((value) => value)
            const filteredCategoryArray = categoryArray.filter(
                item => item !== Categories.All
            )
            setCategory(filteredCategoryArray[0])
            setCategories(filteredCategoryArray)
        }
    }, [])
    
    useEffect(() => {
        
    }, [])
    
    const handleCategorySelected = (category: string) => {
        setCategory(category)
    }
    
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
            <p className="text-sm sm:text-base"> Categoria: { category } </p>
            <p className="text-xs sm:text-sm"> Número de Produtos: 20 </p>
            {
                category === Categories.All ? 
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
                        text-base
                        lg:text-lg
                    "
                > 
                    Cadastrar produto
                </button> :
                <CategorySelect 
                    categories={categories}
                    onChange={handleCategorySelected}
                    className={"w-[80%] ml-auto mr-auto"}
                />
            }
            
        </div>
    )
}