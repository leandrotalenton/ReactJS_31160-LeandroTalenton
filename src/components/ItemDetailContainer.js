import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import { itemsData } from "../data/itemsData"


const ItemDetailContainer = () => {

    const params = useParams()
    const [item,setItem] = useState( {} ) 

    useEffect(() => {
        setItem(itemsData.find(i=>i.id === params.itemId))
        }, [params.itemId])

        return (
        <div className="mt-[65.94px] min-h-[70vh] flex justify-center content-center  ">
            <ItemDetail item={item} params={params}/>
        </div>
    )
}
export default ItemDetailContainer