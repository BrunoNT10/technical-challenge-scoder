import { useState } from 'react'
import { Table } from '@mantine/core';
import { useEffect } from 'react';
import { translateKeys } from '../../utils/translate_keys';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ProductKeys } from '../../utils/enums';
import CategorySelect from '../CategorySelect';
import { Categories } from '../../utils/enums';
import { updateProductItem, deleteProductItem } from '../../services/api';

type TablePropsModel = {
    products: Record<string, any>[]
}

export default function ProductsTable (tableProps: TablePropsModel) {
    const [tableKeys, setTableKeys] = useState<string[]>([])
    const [updateItemIsOpened, setUpdateItemIsOpened] = useState<Boolean>(false)
    const [productBeenUpdated, setProductBeenUpdated] = useState<Record<string, any>>({})
    const [categories, setCategories] = useState<string[]>([])
    
    
    useEffect(() => {
        if (!tableProps.products) return
        const tableKeysSet = new Set<string>();
        const keysToRemoveFromHead = ['id', 'key']
        
        tableProps.products.forEach((product) => {
          Object.keys(product).forEach((key) => {
            if (!keysToRemoveFromHead.includes(key)) {
                const newKey = translateKeys[key]
                if (newKey) {
                    tableKeysSet.add(newKey)
                }
            }
          });
        });
        
        const tableKeys = Array.from(tableKeysSet);
        setTableKeys(tableKeys)    
    }, [tableProps.products])
    
    useEffect(() => {    
        const categoryArray = Object.values(Categories).map((value) => value)
        const filteredCategoryArray = categoryArray.filter(
            item => item !== Categories.All
        )
        setCategories(filteredCategoryArray)
    }, [])
    
    const handleUpdateProduct = async (product: Record<string, any>) => {
        setUpdateItemIsOpened(true)
        setProductBeenUpdated(product)
    }
    
    const updateProduct = async () => {
        const itemToUpdate = {
            id: productBeenUpdated.id,
            productName: productBeenUpdated.productName,
            productDescription: productBeenUpdated.productDescription,
            productPrice: productBeenUpdated.productPrice,
            productCategory: productBeenUpdated.productCategory
        }
        await updateProductItem(itemToUpdate)
        setUpdateItemIsOpened(false)
    }
    
    const deleteProduct = async (product: any) => {
        const itemToDelete = {
            id: product.id
        }
        deleteProductItem(itemToDelete)
    }
    
    return (
        <>
            <Table 
                className="
                    bg-beige
                    font-[Raleway]
                    text-center
                    ml-auto
                    mr-auto
                    w-[90%]
                    rounded-lg
                    table-auto 
                    border-separate
                    border-spacing-x-1 
                    border-spacing-y-4
                    overflow-x-auto
                "
            >
                <thead>
                    <tr>
                        {tableKeys.map((key) => {
                            return (<th>{key}</th>)
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tableProps.products.map((product) => {
                        return (
                            <tr id={`${product.id}`}>
                                {Object.keys(product).map((key) => {
                                    const notAddKeys = ['id', 'key']
                                    if (!notAddKeys.includes(key)) return (
                                        <td> 
                                            {key === ProductKeys.Price ? "R$": ""} {product[key]}
                                        </td>
                                    )
                                })}
                                <td>
                                    <button 
                                        className='
                                            bg-deep-night-blue
                                            transition duration-500 ease-in-out
                                            hover:bg-navy-midnight
                                            text-beige
                                            p-2
                                            rounded-lg
                                        '
                                        id={`${product.id}`}
                                        onClick={() => {handleUpdateProduct(product)}}
                                    >
                                        <FaRegEdit />
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className='
                                            p-2
                                            transition duration-500 ease-in-out
                                            bg-red-600
                                            hover:bg-red-800
                                            rounded-lg
                                            text-beige
                                        '
                                        id={`${product.id}`}
                                        onClick={() => deleteProduct(product)}
                                    >
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            {updateItemIsOpened && 
                <>
                    <div 
                        className='
                            bg-navy-midnight
                            text-beige
                            fixed 
                            top-1/2 
                            left-1/2 
                            -translate-x-1/2 
                            -translate-y-1/2 
                            z-50 
                            p-6 
                            rounded 
                            shadow-lg 
                            w-[90vw] 
                            lg:w-[50vw]
                            h-[50vh]
                            flex
                            flex-col
                            gap-8
                            justify-center
                            rounded-lg
                            font-[Raleway]
                        '
                    >
                        <p className='text-base sm:text-lg lg:text-xl ml-auto mr-auto'>Editar Produto</p>
                        <div className='ml-auto mr-auto flex w-[70%] gap-4 justify-center'>
                            <p>Nome: </p>
                            <input 
                            className='
                                w-[40%]
                                rounded-lg
                                bg-beige
                                text-navy-midnight
                                text-center
                            '
                            value={productBeenUpdated.productName}
                            onChange={(e) => {
                                setProductBeenUpdated((prev) => ({
                                    ...prev,
                                    productName: e.target.value
                                }))
                            }}
                            ></input>
                        </div>
                        <div className='ml-auto mr-auto flex w-[70%] gap-4 justify-center'>
                            <p>Descrição: </p>
                            <input 
                                className='
                                    w-[40%]
                                    rounded-lg
                                    bg-beige
                                    text-navy-midnight
                                    text-center
                                '
                                value={productBeenUpdated.productDescription}
                                onChange={(e) => {
                                setProductBeenUpdated((prev) => ({
                                        ...prev,
                                        productDescription: e.target.value
                                    }))
                                }}
                            ></input>
                        </div>
                        <div className='ml-auto mr-auto flex w-[70%] gap-4 justify-center'>
                            <p>Preço: </p>
                            <input 
                                className='
                                    w-[40%]
                                    rounded-lg
                                    bg-beige
                                    text-navy-midnight
                                    text-center
                                '
                                value={productBeenUpdated.productPrice}
                                onChange={(e) => {
                                setProductBeenUpdated((prev) => ({
                                        ...prev,
                                        productPrice: e.target.value
                                    }))
                                }}
                            ></input>
                        </div>
                        <CategorySelect 
                            categories={categories} 
                            className='w-[80%] lg:w-[40%] p-2 ml-auto mr-auto'
                            initialValue={productBeenUpdated.productCategory}
                            onChange={(category) => {
                                setProductBeenUpdated((prev) => ({
                                    ...prev,
                                    productCategory: category
                                }))
                            }}
                        />
                        <button 
                            className='
                                bg-deep-night-blue 
                                w-[50%]
                                ml-auto
                                mr-auto
                                p-2
                                rounded-lg
                                transition duration-500 ease-in-out
                                hover:bg-slate-blue-dark
                            '
                            onClick={updateProduct}
                        > 
                            Atualizar Item 
                        </button>
                    </div>
                    <div 
                        className='
                            fixed 
                            inset-0 
                            bg-deep-night-blue
                            bg-opacity-60
                            backdrop-blur-sm 
                            z-40
                        '
                        onClick={() => setUpdateItemIsOpened(false)}
                    >
                    </div>
                </>
            }
        </>
    )

}