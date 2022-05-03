import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { itemsData } from "../data/itemsData"

const ItemDetail = () => {
    
    const params = useParams()
    const [item,setItem] = useState( {} ) 

    useEffect(() => {
        setItem(itemsData.find(i=>i.id === params.itemId))
        }, [params.itemId])
    
    return (
    <div className="card lg:card-side bg-base-100 shadow-xl m-4 my-auto">
        <figure><img src={item.pictureUrl} alt="Album" /></figure>
        <div className="card-body">
            <h2 className="card-title">Item: {item.title}</h2>
            <p>{item.description}</p>
            <p>Stock disponible: {item.stock} unidades</p>
            <p>Precio: ${item.price}</p>
            <div className="card-actions justify-end">
                <Link to='/' className="btn btn-primary">Volver</Link>
                <Link to={`/item/${parseInt(params.itemId) + 1}`} className="btn btn-primary">Siguiente</Link>
            </div>
        </div>
    </div>
    )
}
export default ItemDetail