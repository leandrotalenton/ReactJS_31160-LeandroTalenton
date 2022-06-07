import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "..";
import { useCartContext } from "./context/CartContext";


const ItemCount = (props) => {

    const { addToCart } = useCartContext()
    const [productArray, setProductArray] = useState([])

    const [amt, setAmt] = useState(1);
    const addAmt = () => amt < parseInt(props.stock) && setAmt(amt + 1);
    const substractAmt = () => amt > 1 && setAmt(amt - 1);

    useEffect(()=>{

        getDocs(collection(db, 'items')).then(snapshot=>{/* traeme los documentos de la coleccion items ('items') de mi base de datos (db). el snapshot tiene la respuesta y una de sus propiedadess es docs que tiene el array con mis items  */
            const products = snapshot.docs.map(doc => {
                return {id2:doc.id, ...doc.data()}
            })
            setProductArray(products)
        })
    
    },[])

    const handleClick = (id, cantidad) => {
        const findProduct = productArray.find((producto)=>producto.id===id)

        if(!findProduct){
            alert(`error`)
            return
        }

        addToCart(findProduct, cantidad)
        props.onAdd(amt)
    }

    return (
        <div className="card-actions">
            <div className="flex justify-between items-center rounded-xl w-[47.5%] gap-6">
                <div className="flex items-center gap-1">
                    <button onClick={substractAmt} className="btn btn-primary p-4 w-1 rounded-r-none">-</button>
                    <div className="w-4 text-center">{amt}</div>
                    <button onClick={addAmt} className="btn btn-primary w-1 h-1 rounded-l-none">+</button>
                </div>
                <button onClick={()=>handleClick(parseInt(props.id), amt)} className="btn btn-primary">agregar al carrito</button>
            </div>
        </div>
    )
}
export default ItemCount