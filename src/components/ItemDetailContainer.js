import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import { useAppContext } from "./context/AppContext";


const  ItemDetailContainer = () => {

    const params = useParams()
    const [item,setItem] = useState( {} ) 

    const { products } = useAppContext()

    useEffect(()=>{
        async function buscarItem (){
            await setItem(products.find(i=>i.id === parseInt(params.itemId)))
            console.log(products.find(i=>i.id === parseInt(params.itemId)))
        }
        buscarItem()
    },[products, params.itemId])



    return (
        // <div>asd</div>
        <div className="mt-[65.94px] min-h-[70vh] flex justify-center content-center  ">
            <ItemDetail item={item} params={params}/>
        </div>
    )
}
export default ItemDetailContainer