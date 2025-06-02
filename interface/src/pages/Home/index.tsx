import Header from "../../components/Header"
import Card from "../../components/Cards"
import { connectWebSocket, listProducts } from "../../services/api"
import { useEffect, useState } from "react"

export default function Home () {
    const [products, setProducts] = useState([])
    useEffect(() => {connectWebSocket()}, [])
    useEffect(() => {
        const fetchData = async () => {
            const apiResponse = await listProducts()
            setProducts(apiResponse.items)
        }
        fetchData()
    }, [])
    
    return (
        <>
            <Header />
            <div 
                id="cards"
                className="
                    grid
                    grid-cols-[1fr_3fr_1fr]
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
        </>
    )
}