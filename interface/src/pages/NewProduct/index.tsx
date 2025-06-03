import { useEffect, useState } from "react";
import CategorySelect from "../../components/CategorySelect";
import Header from "../../components/Header";
import { Categories, StatusCode } from "../../utils/enums";
import { toast } from 'react-toastify'
import { registerNewProduct } from "../../services/api";

export default function NewProduct () {
    const [categories, setCategories] = useState<Categories[]>([])
    const [productName, setProductName] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productCategory, setProductCategory] = useState("")    
    
    useEffect(() => {    
        const categoryArray = Object.values(Categories).map((value) => value)
        const filteredCategoryArray = categoryArray.filter(
            item => item !== Categories.All
        )
        setProductCategory(filteredCategoryArray[0])
        setCategories(filteredCategoryArray)
    }, [])
    
    const handleCategorySelectedChange = (category: string) => {
        setProductCategory(category)
    }
        
    const handleRegisterNewCategory = async () => {
        const inputValues = [productName, productDescription, productPrice]
        const someInputIsNull = inputValues.some((value) => value === '')
        if (someInputIsNull) {
            toast.error("Preencha todos os campos!", {autoClose: 2500})
            return
        }
        
        const numberProductPrice = Number(productPrice)
        
        const apiResponse = await registerNewProduct({
            productName: productName,
            productDescription: productDescription,
            productCategory: productCategory,
            productPrice: numberProductPrice
        })  
        
        if (apiResponse.status == StatusCode.Created) {
            toast.success("Sucesso ao cadastrar novo produto!", {autoClose: 2500})
        }
        else {
            toast.error("Erro ao cadastrar novo produto!", {autoClose: 2500})
        }
    }
    
    return (
        <>
            <Header />
            <div 
                className="
                    grid 
                    grid-cols-[1fr_3fr_1fr] 
                    font-[Raleway]        
                "
            >
                <div 
                    className="
                        col-start-2 
                        text-center
                        bg-slate-blue-dark
                        text-beige
                        mt-[10%]
                        h-[25rem]
                        flex
                        flex-col
                        gap-6
                        justify-center
                        text-sm
                        sm:text-base
                        lg:text-lg
                        rounded-lg
                        shadow-custom-purple
                        lg:w-[60%]
                        lg:ml-auto
                        lg:mr-auto
                    "
                >
                    <p 
                        className="
                            text-base
                            sm:text-lg
                            lg:text-2xl
                        "
                    > 
                        Cadastrar novo produto
                    </p>
                    <div className="flex gap-4 ml-auto mr-auto justify-center">
                        <p>Nome: </p>
                        <input
                            id="product-name"
                            className="
                                rounded-lg 
                                bg-beige 
                                text-center 
                                text-navy-midnight
                                w-[60%]
                            " 
                            type="text"
                            value={productName}
                            onChange={(e) => {setProductName(e.target.value)}}
                        ></input>
                    </div>
                    <div className="flex gap-4 ml-auto mr-auto justify-center">
                        <p>Descrição: </p>
                        <input
                            id="product-description"
                            className="
                                rounded-lg 
                                bg-beige 
                                text-center 
                                text-navy-midnight
                                w-[55%]
                            " 
                            type="text"
                            maxLength={100}
                            value={productDescription}
                            onChange={(e) => {setProductDescription(e.target.value)}}
                        ></input>
                    </div>
                    <div className="flex gap-4 ml-auto mr-auto justify-center">
                        <p>Preço: </p>
                        <input
                            id="product-price"
                            className="
                                rounded-lg 
                                bg-beige 
                                text-center 
                                text-navy-midnight
                                w-[60%]
                            " 
                            type="number"
                            onChange={(e) => {
                                setProductPrice(e.target.value)
                            }}
                        ></input>
                    </div>
                    <div className="flex gap-4 ml-auto mr-auto">
                        <p>Categoria: </p>
                        <CategorySelect 
                            categories={categories} 
                            onChange={handleCategorySelectedChange}
                            className=""
                        />
                    </div>
                    <button
                        className="
                            bg-deep-night-blue 
                            w-[30%] 
                            ml-auto 
                            mr-auto 
                            p-2 
                            rounded-lg
                            transition duration-500 ease-in-out
                            hover:bg-navy-midnight
                            text-xs
                            lg:text-lg
                        "
                        onClick={handleRegisterNewCategory}
                    > 
                        Cadastrar Produto
                    </button>
                </div>
            </div>
        </>
    )
}