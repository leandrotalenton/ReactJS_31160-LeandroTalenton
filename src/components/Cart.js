import { useState } from "react";
import { Link } from "react-router-dom"
import { useCartContext } from "./context/CartContext"
import { writeBatch, getDocs, query, where, collection, documentId, Timestamp, addDoc } from "firebase/firestore"
import { db } from "../index"

const Cart = () => {

    const {cart, deleteFromCart, deleteCart} = useCartContext()

    const [loading, setLoading] = useState()
    const [mostrarCheckout, setMostrarCheckout] = useState(false)
    const [idCompra, setIdCompra] = useState()
    const [comprador, setComprador] = useState({
        name: "",
        apellido: "",
        telefono: "",
        email: "",
        confirmacionEmail: "",
    })

    const handleSubmitChange = (e) => {
        setComprador({ ...comprador, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        crearOrden();
        deleteCart();
    }

    const outOfStock = []

    const crearOrden = ()=>{
        const orden = {
            items: cart,
            comprador,
            total: cart.reduce((acc, item)=> acc + (item.price*item.quantity),0),
            fecha: Timestamp.fromDate(new Date())
        }

        const batch = writeBatch(db)

        const collectionRef = collection(db, `items`)
        const ids = cart.map(prod => prod.id)
        console.log(ids)

        getDocs(query(collectionRef,where(documentId(),`in`,ids)))
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                const dataDoc = doc.data()
                // cart.map(prod=>console.log(`que me trae esto?`,prod))
                const prodStock = cart.find(prod => {console.log(prod.id,`===`,doc.id); return prod.id === doc.id})?.quantity
                if(dataDoc.stock >= prodStock) {
                    batch.update(doc.ref, { stock: dataDoc.stock - prodStock})
                } else {
                    outOfStock.push({id: doc.id, ...dataDoc})
                }
            })
        }).then(()=>{
            if(outOfStock.length === 0){
                const collectionRef = collection(db,`ordenes`)
                return addDoc(collectionRef, orden)
            } else {
                console.log("algo salio mal :`(")
            }
        }).then(({id})=>{
            batch.commit()
            console.log(`el id de la orden es ${id}`)
            setIdCompra(id)
        }).catch(error => {
            console.log(error)
        }).finally(
            setTimeout(()=>{setLoading(false);setMostrarCheckout(true)},1000) // le tuve que poner un setTimeout por que mi computadora es un avion y no llego a ver mi fidget spunnerrr
        )
    }


    return (
        loading
        ?//mostrar spiner
        <div className="w-full min-h-[calc(100vh-17.8rem)] flex justify-center items-center">
            <svg role="status" className="inline w-9 h-9 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>
        :mostrarCheckout
        ?//mostrar checkout
        <div className="py-8 min-h-[calc(100vh-17.8rem)] flex justify-center items-center content-center bg-zinc-50">
            <div className="mx-6 card bg-base-100 shadow-xl">
                <figure>
                    <img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Gracias por tu compra!</h2>
                    <p>El ID de tu compra es:</p>
                    <p>{idCompra}</p>
                    <p>¡Hasta la próxima!</p>
                    <div className="card-actions justify-end">
                        <Link to="/" className="mt-6 flex justify-center">
                            <button className="btn btn-xs btn-primary h-3">Volver al inicio</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        ://mostrar carrito
        <div className="py-10 w-full min-h-[calc(100vh-17.8rem)] bg-zinc-50 flex justify-center"> {
            cart.length===0
                ?//mostrar mensaje carrito vacio
                <div className="flex flex-col justify-center items-center max-w-3xl">
                    <div className="mb-5 text-xl sm:text-2xl mx-auto font-bold pb-4 text-center">Carrito vacio</div>
                    <Link to={`/`} className="btn btn-primary">Volver al catalogo</Link>
                </div>
                ://mostrar carrito con contenido
                <div className="mx-7 max-w-3xl">
                    <div className="mb-5 text-lg sm:text-xl lg:text-2xl font-bold pb-4">Va a comprar:</div>
                    <div className="grid items-center justify-items-center grid-cols-[minmax(7rem,_1fr)_repeat(3,minmax(0,_1fr))] lg:grid-cols-6 min gap-1 sm:gap-3">
                        <span className="text-xs sm:text-sm font-bold"></span>
                        <span className="text-xs sm:text-sm font-bold">Producto</span>
                        <span className="text-xs sm:text-sm hidden lg:block font-bold">Cantidad</span>
                        <span className="text-xs sm:text-sm hidden lg:block font-bold">Precio</span>
                        <span className="text-xs sm:text-sm font-bold">Subtotal</span>
                        <span className="text-xs sm:text-sm font-bold">Eliminar</span>
                        {cart.map(item=>{return(
                            <div className="contents" key={item.id}>
                                <img className="text-xs sm:text-sm h-16 rounded-xl" src={item.pictureUrl} alt="product"></img>
                                <span className="text-xs sm:text-sm ">{item.title}</span>
                                <span className="text-xs sm:text-sm hidden lg:block">{item.quantity}</span>
                                <span className="text-xs sm:text-sm hidden lg:block">${item.price}</span>
                                <span className="text-xs sm:text-sm ">${item.price*item.quantity}</span>
                                <span className="text-xs sm:text-sm btn btn-xs btn-primary h-3 rounded-full" onClick={()=>deleteFromCart(item)}>X</span>
                            </div>
                        )})}
                        <span className=""></span>
                        <span className=""></span>
                        <span className="hidden lg:block"></span>
                        <span className="hidden lg:block"></span>
                        <span className="text-xs sm:text-sm font-bold">Precio Total: ${cart.reduce((acc, item)=> acc + (item.price*item.quantity),0)}</span>
                        <span className=""></span>
                    </div>

                    <div className="bg-base-300 rounded-lg my-6 p-6">
                        <h3 className="mb-5 text-lg sm:text-xl lg:text-2xl font-bold">Datos del comprador: </h3>
                        <h6 className="mb-5 text-sm sm:text-md">A continuación complete sus datos para poder finalizar su compra</h6>
                        <form className="flex flex-col gap-1 justify-around">
                            <input className="border-2 rounded-lg px-2"
                                placeholder="Nombre"
                                type='text'
                                name='name'
                                onChange={handleSubmitChange}
                                />
                            <input className="border-2 rounded-lg px-2"
                                placeholder="Apellido"
                                type='text'
                                name='apellido'
                                onChange={handleSubmitChange}
                                />
                            <input className="border-2 rounded-lg px-2"
                                placeholder="Celular (Al menos 10 digitos)"
                                type="number"
                                name="telefono"  
                                onChange={handleSubmitChange}
                            />
                            <input className="border-2 rounded-lg px-2"
                                placeholder="E-mail"
                                type="email"
                                name="email"  
                                onChange={handleSubmitChange}
                            />
                            <input className="border-2 rounded-lg px-2"
                                placeholder="confirmación E-mail"
                                type="email"
                                name="confirmacionEmail"  
                                onChange={handleSubmitChange}
                            />
                            {(comprador.telefono && comprador.name && comprador.apellido && (comprador.telefono.length >= 10) && (comprador.email.includes(`@`)) && (comprador.email.includes(`.`)) && (comprador.email === comprador.confirmacionEmail))
                                ?<input 
                                        onClick={handleSubmit} 
                                        className="btn btn-xs btn-primary h-3"
                                        type="submit" 
                                        value="Terminar Compra" 
                                    />
                                : <input 
                                        className="btn btn-xs btn-disabled h-3"
                                        type="submit" 
                                        value="Terminar Compra" 
                                        disabled 
                                    />
                            }
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}
export default Cart