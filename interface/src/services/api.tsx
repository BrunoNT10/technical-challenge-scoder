import axios from 'axios'
import { io } from 'socket.io-client'
import { toast } from 'react-toastify'
import { ToastIds } from '../utils/enums'

const baseURL = "http://159.89.86.218:3000/"
const api = axios.create({
    baseURL: baseURL,
})

export async function updateCache () {
    try{
        const apiResponse = await api.post("/products/cache")    
    } catch (error: any) {
        console.error("An unexpected error occured when update the cache.")
    }
}

export async function listProducts () {
    try{
        const apiResponse = await api.get("/products")    
        return apiResponse.data
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {   
                toast.error(
                    "Não existem produtos cadastrados.", {
                        toastId: ToastIds.NoProductsFound,
                        autoClose: 2500
                    }
                )
                return 
            }
        }
        else {
            toast.error(
                "Ocorreu um erro inesperado ao listar os produtos.", {
                    toastId: ToastIds.UnexpectedException,
                    autoClose: 2500
                }
            )   
        }
    }
}

type NewProductModel = {
    productName: string
    productDescription: string
    productPrice: number
    productCategory: string
}

export async function registerNewProduct (props: NewProductModel) {
    const apiResponse = await api.post('/products', props)
    return apiResponse
}

type UpdateProductModel = {
    id: number,
    productName: string
    productDescription: string
    productPrice: number
    productCategory: string
}

export async function updateProductItem (props: UpdateProductModel) {
    const { id, ...requestProps } = props
    
    try{
        await api.patch(`products/${props.id}`, requestProps)
        toast.success("Sucesso ao atualizar item!", {
            toastId: ToastIds.SuccessWhenUpdateItem,
            autoClose: 2500
        })
    }
    catch(error) {
        toast.error(
            "Ocorreu um erro inesperado ao listar os produtos.", {
                toastId: ToastIds.UnexpectedException,
                autoClose: 2500
            }
        )     
    }
}

type DeleteProductModel = {
    id: number
}

export async function deleteProductItem (props: DeleteProductModel) {
    try{
        await api.delete(`products/${props.id}`)
        toast.success("Sucesso ao deletar item!", {
            toastId: ToastIds.SuccessWhenDeleteItem,
            autoClose: 2500
        })
    }
    catch(error) {
        toast.error(
            "Ocorreu um erro inesperado ao deletar o produto.", {
                toastId: ToastIds.UnexpectedException,
                autoClose: 2500
            }
        )     
    }
}


export const connectWebSocket = () => {
    const socket = io(baseURL)
    return socket
}