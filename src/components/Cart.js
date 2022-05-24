import { useState } from "react";
import { Link } from "react-router-dom"
import { useCartContext } from "./context/CartContext"
import { writeBatch, getDocs, query, where, collection, documentId, Timestamp, addDoc } from "firebase/firestore"
import { db } from "../index"

const Cart = () => {

    const {cart, deleteFromCart, deleteCart} = useCartContext()

    const [nombreCompleto, setNombreCompleto] = useState('');
    const [cellPhone, setCellPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        crearOrden()
        deleteCart();
    }

    const outOfStock = []

    const crearOrden = ()=>{
        const orden = {
            items: cart,
            comprador: {
                nombre: nombreCompleto,
                telefono: cellPhone,
                email: email
            },
            total: 0,
            fecha: Timestamp.fromDate(new Date())
        }

        const batch = writeBatch(db)

        const collectionRef = collection(db, `items`)
        const ids = cart.map(prod => prod.id2) /* supongo que mis productos tienen id */

        getDocs(query(collectionRef,where(documentId(),`in`,ids)))
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    const dataDoc = doc.data()
                    cart.map(prod=>console.log(`que verga me trae esto?`,prod))
                    const prodStock = cart.find(prod => {console.log(prod.id2,`===`,doc.id); return prod.id2 === doc.id})?.quantity
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
        <div className="my-10 mx-auto min-h-[60vh] max-w-3xl"> {cart.length===0
            ?<div className="flex flex-col justify-center items-center">
                <div className="mb-5 text-2xl mx-auto font-bold pb-4 text-center">Carrito vacio</div>
                <Link to={`/`} className="btn btn-primary">Volver al catalogo</Link>
            </div>
            :<div>
                <div className="mb-5 text-2xl font-bold pb-4">Va a comprar:</div>
                <div className="grid items-center justify-items-center grid-cols-6 min gap-3">
                    <span className="font-bold text-base"></span>
                    <span className="font-bold text-base">Producto</span>
                    <span className="font-bold text-base">Cantidad</span>
                    <span className="font-bold text-base">Precio unitario</span>
                    <span className="font-bold text-base">Precio total</span>
                    <span className="font-bold text-base">Eliminar</span>
                    {cart.map(i=>{return(
                        <div className="contents" key={i.id}>
                            <img className="h-16 rounded-xl" src={i.pictureUrl} alt="product"></img>
                            <span className="font-bold text-base">{i.title}</span>
                            <span className="font-bold text-base">{i.quantity}</span>
                            <span className="font-bold text-base">${i.price}</span>
                            <span className="font-bold text-base">${i.price*i.quantity}</span>
                            <span className="btn btn-xs btn-primary btn-block h-3" onClick={()=>deleteFromCart(i)}>Eliminar</span>
                        </div>
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
                        <button type="button" className="btn btn-xs btn-primary h-3 w-[49.25%]">
                            <i className="bx bxl-google"></i> Google
                        </button>
                        <button type="button" className="btn btn-xs btn-primary h-3 w-[49.25%]">
                            <i className="bx bxl-facebook"></i> Facebook
                        </button>
                    </div>
                    <form className="flex flex-col gap-1 justify-around">
                        <input className="border-2 rounded-lg px-2"
                            placeholder="NombreCompleto"
                            type='text'
                            name='nombreCompleto'
                            value={nombreCompleto}
                            onChange={(e) => setNombreCompleto(e.target.value)}
                            />
                        <input className="border-2 rounded-lg px-2"
                            placeholder="Celular"
                            type="phone"
                            name="phone"  
                            value={cellPhone}
                            onChange={(e) => setCellPhone(e.target.value)}
                        />
                        <input className="border-2 rounded-lg px-2"
                            placeholder="E-mail"
                            type="email"
                            name="email"  
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="btn btn-xs btn-primary h-3" type="submit" onClick={handleSubmit}>Terminar Compra</button>
                    </form>
                </div>
            </div>}
        </div>
    )
}
export default Cart