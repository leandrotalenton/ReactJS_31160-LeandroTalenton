import { Link } from "react-router-dom"

const Item = (props) => {
    return (
        <div className="card w-64 bg-base-100 shadow-xl m-4">
            <figure><img src={props.pictureUrl} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{props.title} {props.brand}</h2>
                <p>Product ID: {props.id}</p>
                <p>Current stock: {props.stock} units.</p>
                <p className="text-left mx-2">Price: ${props.price}</p>
                <Link className="btn btn-primary w-[100%]" to={`/item/${props.id}`}>Details</Link>
            </div>
        </div>
    )
}
export default Item