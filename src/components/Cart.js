import { useState } from "react";
import { Link } from "react-router-dom"
import { useCartContext } from "./context/CartContext"
import { writeBatch, getDocs, query, where, collection, documentId, Timestamp, addDoc } from "firebase/firestore"
import { db } from "../index"

const Cart = () => {

    const {cart, deleteFromCart, deleteCart} = useCartContext()

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
        e.preventDefault();
        crearOrden()
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
        const ids = cart.map(prod => prod.id2) /* supongo que mis productos tienen id */
        console.log(ids)

        getDocs(query(collectionRef,where(documentId(),`in`,ids)))
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    const dataDoc = doc.data()
                    // cart.map(prod=>console.log(`que me trae esto?`,prod))
                    const prodStock = cart.find(prod => {console.log(prod.id2,`===`,doc.id); return prod.id2 === doc.id})?.quantity
                    if(dataDoc.stock >= prodStock) {
                        batch.update(doc.ref, { stock: dataDoc.stock - prodStock})
                    } else {
                        outOfStock.push({id2: doc.id, ...dataDoc})
                    }
                })
            }).then(()=>{
                if(outOfStock.length === 0){
                    const collectionRef = collection(db,`ordenes`)
                    return addDoc(collectionRef, orden)
                } else {
                    console.log(`algo salio mal :(`)
                }
            }).then(({id})=>{
                batch.commit()
                console.log(`el id de la orden es ${id}`)
            }).catch(error => {
                console.log(error)
            })
    }


    return (
        <div className="py-10 w-full min-h-[calc(100vh-17.8rem)] bg-zinc-50 flex justify-center"> {
            cart.length===0
                ?<div className="flex flex-col justify-center items-center max-w-3xl">
                    <div className="mb-5 text-xl sm:text-2xl mx-auto font-bold pb-4 text-center">Carrito vacio</div>
                    <Link to={`/`} className="btn btn-primary">Volver al catalogo</Link>
                </div>
                :<div className="mx-7 max-w-3xl">
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