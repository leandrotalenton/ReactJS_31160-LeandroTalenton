import ItemCount from "./ItemCount"

const Item = (props) => {
    return (
        <div>
        <div className="card w-64 bg-base-100 shadow-xl m-4">
            <figure><img src={props.pictureUrl} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{props.title} {props.brand}</h2>
                <p>Product ID: {props.id}</p>
                <p>Current stock: {props.stock} units.</p>
                <p className="text-right mx-2">${props.price}</p>
                <ItemCount id={props.id} initial={props.initial} stock={props.stock}/>
            </div>
        </div>

        </div>
    )
}
export default Item