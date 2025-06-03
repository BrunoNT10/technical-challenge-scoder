import Header from "../../components/Header"
import Card from "../../components/Cards"
import ProductsTable from "../../components/Table"
import { connectWebSocket, listProducts } from "../../services/api"
import { useEffect, useState } from "react"
import { Socket } from 'socket.io-client'
import Footer from "../../components/Footer"

export default function Home () {
    const [products, setProducts] = useState<Record<string, any>[]>([])
    const [socket, setSocket] = useState<Socket | null>(null)
    
    useEffect(() => {
        const connectedWebSocket = connectWebSocket()
        setSocket(connectedWebSocket)
    }, [])
    
    useEffect(() => {
        const fetchData = async () => {
            const apiResponse = await listProducts()
            if (apiResponse) setProducts(apiResponse.items)
        }
        fetchData()
    }, [])
    
    useEffect(() => {
        if (!socket) return 
        socket.on('new_product_item', (newProduct) => {
            setProducts([newProduct, ...products])
        })
        socket.on('updated_product_item', (updatedProduct) => {
            const currentProducts = [...products]
            const newProducts = currentProducts.map(
                (product) => {
                    return product.id === updatedProduct.id ? updatedProduct : product
                } 
            )
            setProducts(newProducts)
        })
        socket.on('deleted_product_item', (deletedProduct) => {
            const numberDeletedProduct = Number(deletedProduct)
            const newProducts = products.filter(product => product.id !== numberDeletedProduct)
            setProducts(newProducts)
        })
    }, [products, socket])
        
    return (
        <div className="min-h-screen flex flex-col gap-8">
            <Header />
            <div 
                id="cards"
                className="
                    grid
                    grid-cols-[1fr_3fr_1fr]
                    gap-4
                    lg:grid-cols-[1fr_3fr_3fr_3fr_3fr_1fr]
                    lg:gap-4
                "
            >
                <Card 
                    className="col-start-2 lg:col-start-3" 
                    category="Todos"
                    products={products}
                />
                <Card 
                    className="col-start-2 lg:col-start-4" 
                    category="Select"
                    products={products}
                />
            </div>
            <div className="w-full overflow-x-auto">
                <ProductsTable 
                    products={products} 
                />
            </div>
            <Footer />
        </div>
    )
}