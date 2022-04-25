import ItemCount from "./ItemCount"

const Card = (props) => {
    return (
        <div className="card w-64 bg-base-100 shadow-xl m-4">
            <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{props.name}</h2>
                <p>Current stock: {props.stock} units.</p>
                <p className="text-right mx-2">${props.price}</p>
                <ItemCount initial={props.initial} stock={props.stock}/>
            </div>
        </div>
    )
}
export default Card