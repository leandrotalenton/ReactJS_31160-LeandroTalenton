import { useState } from "react"
import { Link } from "react-router-dom"
import ItemCount from "./ItemCount"

const ItemDetail = (props) => {

    const [enCarrito, setEnCarrito] = useState(false)

    const onAdd = ()=>{
        setEnCarrito(true)
    }

    return (
    <div className="card lg:card-side bg-base-100 shadow-xl m-4 my-auto">
        <figure><img src={props.item.pictureUrl} alt="Album" /></figure>
        <div className="card-body">
            <h2 className="card-title">Item: {props.item.title}</h2>
            <p>{props.item.description}</p>
            <p>Stock disponible: {props.item.stock} unidades</p>
            <p>Precio: ${props.item.price}</p>
            <div className="card-actions justify-end">
                {/* <Link to='/' className="btn btn-primary">Volver</Link>
                <Link to={`/item/${parseInt(props.params.itemId) + 1}`} className="btn btn-primary">Siguiente</Link> */}
                {enCarrito?
                <Link to='/' className="btn btn-primary">ir al carrito</Link>:
                <ItemCount stock={props.item.stock} onAdd={onAdd}/>
                }
            </div>
        </div>
    </div>
    )
}
export default ItemDetail