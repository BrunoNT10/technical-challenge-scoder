import Header from "../../components/Header"
import Card from "../../components/Cards"

export default function Home () {
    return (
        <>
            <Header />
            <div 
                id="cards"
                className="
                    grid
                    grid-cols-[1fr_3fr_3fr_3fr_3fr_3fr_1fr]
                    gap-4
                "
            >
                <Card className="col-start-2" category="Todos"/>
                <Card className="col-start-3" category="Eletrônicos"/>
                <Card className="col-start-4" category="Roupas"/>
                <Card className="col-start-5" category="Veículos"/>
                <Card className="col-start-6" category="Alimentos"/>
            </div>
        </>
    )
}