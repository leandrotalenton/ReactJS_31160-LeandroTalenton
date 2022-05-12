import { useState } from "react"
import { useAppContext } from "./context/AppContext";
import { useCartContext } from "./context/CartContext";

const ItemCount = (props) => {
    const [amt, setAmt] = useState(1);
    const addAmt = () => amt < parseInt(props.stock) && setAmt(amt + 1);
    const substractAmt = () => amt > 1 && setAmt(amt - 1);

    const { addToCart } = useCartContext()
    const { products } = useAppContext()

    const handleClick = (id, cantidad) => {
        const findProduct = products.find((producto)=>producto.id===id)

        if(!findProduct){
            alert(`error`)
            return
        }

        addToCart(findProduct, cantidad)
        props.onAdd(amt)
    }

    return (
        <div className="card-actions justify-between ">
            <div className="flex justify-between items-center rounded-xl w-[47.5%]">
                <button onClick={substractAmt} className="btn btn-primary p-4 w-1 rounded-r-none">-</button>
                <div>{amt}</div>
                <button onClick={addAmt} className="btn btn-primary w-1 rounded-l-none">+</button>
                <button onClick={()=>handleClick(props.id, amt)} className="btn btn-primary">agregar al carrito</button>
            </div>
        </div>
    )
}
export default ItemCount