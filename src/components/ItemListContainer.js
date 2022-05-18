import { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore"
/* getdocS: <-- me trae documentos en plural, si me paro sobre la funcion me dice que me pide una querry (a que me voy a conectar) */
/* collection: para hacer la querry que me pide getDocs */
/* query  */
import { db } from "../index"
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";

const ItemListContainer = () => {

    const [productArray, setProductArray] = useState([])
    const { categoryId } = useParams()

    useEffect(()=>{

        const collectionRef = categoryId
            ? query( collection(db, 'items') , where(`brand`,`==`,categoryId))/* tiene 2 parametros: 1) la referencia 2)el filtro que le voy a aplicar(where()): where tiene 3 parametros a)el nombre del campo b) como voy a comprar c) contra que lo voy a comparar */
            : collection(db, 'items')

        getDocs(collectionRef).then(snapshot=>{/* traeme los documentos de la coleccion items ('items') de mi base de datos (db). el snapshot tiene la respuesta y una de sus propiedadess es docs que tiene el array con mis items  */
            const products = snapshot.docs.map(doc => {
                return {id2:doc.id, ...doc.data()}
            })
            setProductArray(products)
        })
    
    },[categoryId])



    return (
        <div id="anchor-name">
            <ItemList productArray={productArray}/>
        </div>
    )
}
export default ItemListContainer