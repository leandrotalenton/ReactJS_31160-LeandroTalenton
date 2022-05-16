import { Link } from "react-router-dom"
import { useCartContext } from "./context/CartContext"

const Cart = () => {

    const {cart, deleteFromCart} = useCartContext()

    return (
        <div className="w-full p-10 min-h-[60vh] "> {cart.length===0
            ?<div className="flex flex-col justify-center items-center">
                <div className="mb-5 text-2xl mx-auto font-bold pb-4 text-center">Carrito vacio</div>
                <Link to={`/`} className="btn btn-primary">Volver al catalogo</Link>
            </div>
            :<div>
                <div className="mb-5 text-2xl font-bold pb-4">Va a comprar:</div>
                <div className="grid grid-cols-6 gap-4">
                    <span className="font-bold text-base"></span>
                    <span className="font-bold text-base">Producto</span>
                    <span className="font-bold text-base">Cantidad</span>
                    <span className="font-bold text-base">Precio unitario</span>
                    <span className="font-bold text-base">Precio total</span>
                    <span className="font-bold text-base">Eliminar</span>
                    {cart.map(i=>{return(
                        <>
                            <img className="h-16 rounded-xl" src={i.pictureUrl} alt="product"></img>
                            <span className="font-bold text-base">{i.title}</span>
                            <span className="font-bold text-base">{i.quantity}</span>
                            <span className="font-bold text-base">${i.price}</span>
                            <span className="font-bold text-base">${i.price*i.quantity}</span>
                            <span className="btn btn-xs btn-primary btn-block h-3" onClick={()=>deleteFromCart(i)}>Eliminar</span>
                        </>
                    )})}
                    <span className="font-bold text-base"></span>
                    <span className="font-bold text-base"></span>
                    <span className="font-bold text-base"></span>
                    <span className="font-bold text-base"></span>
                    <span className="font-bold text-base">Subtotal: ${cart.reduce((acc, i)=> acc + (i.price*i.quantity),0)}</span>
                    <span className="font-bold text-base"></span>
                </div>

                <div className="bg-base-300 rounded-lg my-6 p-6">
                    <h3 className="mb-5 text-2xl font-bold">Datos del comprador: </h3>
                    <div className="flex justify-between py-4">
                        <button type="button" className="btn btn-xs btn-primary h-3 w-[48%]">
                            <i className="bx bxl-google"></i> Google
                        </button>
                        <button type="button" className="btn btn-xs btn-primary h-3 w-[48%]">
                            <i className="bx bxl-facebook"></i> Facebook
                        </button>
                    </div>
                    <form className="flex flex-col gap-4 justify-around">
                        <input className="border-2 border-gray-300 rounded-lg" type="text" name="name" placeholder="Nombres" required="" />
                        <input className="border-2 border-gray-300 rounded-lg" type="phone" name="phone" placeholder="celular" required="" />
                        <input className="border-2 border-gray-300 rounded-lg" type="email" name="email" placeholder="correo" required="" />
                        <input className="border-2 border-gray-300 rounded-lg" type="email" name="emailr" placeholder="repite el correo" required="" />
                        <small className="font-bold text-base">Sus datos correctos nos permitirán entregarle los productos de forma correcta y oportuna.</small>
                        <Link to={`/`}  type="submit" className="btn btn-xs btn-primary h-3"> Terminar Compra</Link>
                    </form>
                </div>

            </div>}
        </div>
    )
}
export default Cart