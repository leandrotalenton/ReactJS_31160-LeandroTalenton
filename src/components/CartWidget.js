import { Link } from "react-router-dom"
import { useCartContext } from "./context/CartContext"

const CartWidget = () => {

    const {cart} = useCartContext()

    const circleStyles = {
        empty: `hidden`,
        notEmpty: `badge badge-sm indicator-item`
    }

    let itemAmt = cart.reduce((acc, i)=>{return acc + i.quantity},0)

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span className={((itemAmt)>0)?circleStyles.notEmpty:circleStyles.empty}>{itemAmt>0?`${itemAmt}`:``}</span>
                </div>
            </label>
            <div tabIndex="0" className="mt-3 card card-compact dropdown-content w-52 bg-base-300 shadow">
                <div className="card-body">
                    <span className="font-bold text-info">
                        {itemAmt>0
                            ?(itemAmt===1
                                ?`1 Item`
                                :`${itemAmt} Items`)
                            :`Carrito Vacio`}
                    </span>
                    {cart.map(i=><span key={i.id2} className="font-bold text-base">{i.title} x {i.quantity}</span>)}
                    <span className="text-info">Subtotal: ${cart.reduce((acc, i)=> acc + (i.price*i.quantity),0)}</span>
                    <div className="card-actions">
                        <Link to={`/cart`} className="btn btn-primary btn-block">Ir al carrito</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CartWidget