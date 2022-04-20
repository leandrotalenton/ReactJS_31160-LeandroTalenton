const Card = (props) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl m-4">
            <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{props.name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <p className="text-right mx-2">${props.price}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    )
}
export default Card