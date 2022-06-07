import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import { db } from "../index"
import { getDoc, doc } from "firebase/firestore"
/* getDoC (en lugar de getDocs)<-- doc en sigular por que aca no quiero un array, quiero los datos de un unico producto */
/* doc (en lugar de collection)<-- doc es en lugar de collection */




const  ItemDetailContainer = () => {

    const {itemId} = useParams()
    const [item,setItem] = useState( {} ) 



    useEffect(()=>{

        getDoc(doc(db,'items',itemId)).then(snapshot=>{  /* doc toma 3 parametros: 1)la base de datos 2) */
            const item = {id: snapshot.id, ...snapshot.data()}
            setItem(item)
        })

    },[itemId])



    return (
        <div className="py-8 min-h-[calc(100vh-17.8rem)] flex justify-center content-center bg-zinc-50">
            <ItemDetail item={item}/>
        </div>
    )
}
export default ItemDetailContainer