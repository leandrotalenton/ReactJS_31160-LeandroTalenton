import { useState } from "react"

const ItemCount = (props) => {
    const [amt, setAmt] = useState(1);
    const addAmt = () => amt < parseInt(props.stock) && setAmt(amt + 1);
    const substractAmt = () => amt > 1 && setAmt(amt - 1);



    return (
        <div className="card-actions justify-between ">
            <div className="flex justify-between items-center rounded-xl w-[47.5%]">
                <button onClick={substractAmt} className="btn btn-primary p-4 w-1 rounded-r-none">-</button>
                <div>{amt}</div>
                <button onClick={addAmt} className="btn btn-primary w-1 rounded-l-none">+</button>
                <button onClick={()=>props.onAdd()} className="btn btn-primary">agregar al carrito</button>
            </div>
        </div>
    )
}
export default ItemCount