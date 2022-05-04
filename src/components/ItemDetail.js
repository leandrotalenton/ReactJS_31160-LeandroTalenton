import { Link } from "react-router-dom"

const ItemDetail = (props) => {
    
    return (
    <div className="card lg:card-side bg-base-100 shadow-xl m-4 my-auto">
        <figure><img src={props.item.pictureUrl} alt="Album" /></figure>
        <div className="card-body">
            <h2 className="card-title">Item: {props.item.title}</h2>
            <p>{props.item.description}</p>
            <p>Stock disponible: {props.item.stock} unidades</p>
            <p>Precio: ${props.item.price}</p>
            <div className="card-actions justify-end">
                <Link to='/' className="btn btn-primary">Volver</Link>
                <Link to={`/item/${parseInt(props.params.itemId) + 1}`} className="btn btn-primary">Siguiente</Link>
            </div>
        </div>
    </div>
    )
}
export default ItemDetail