import { useState } from "react"
import { Link } from "react-router-dom";

const ItemCount = (props) => {
    const [amt, setAmt] = useState(parseInt(props.initial));

    const addAmt = () => amt < parseInt(props.stock) && setAmt(amt + 1);
    const substractAmt = () => amt > 1 && setAmt(amt - 1);

    return (
        <div className="card-actions justify-between ">
            <div className="flex justify-between items-center rounded-xl w-[47.5%]">
                <button onClick={substractAmt} className="btn btn-primary p-4 w-1 rounded-r-none">-</button>
                <div>{amt}</div>
                <button onClick={addAmt} className="btn btn-primary w-1 rounded-l-none">+</button>
            </div>
            <Link className="btn btn-primary w-[47.5%]" to={`/item/${props.id}`}>Details</Link>
        </div>
    )
}
export default ItemCount