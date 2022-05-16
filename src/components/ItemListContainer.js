import { useEffect, useState } from "react";
import { getItem, itemsData } from "../data/itemsData";
import ItemList from "./ItemList";

const ItemListContainer = () => {

    const [productArray, setProductArray] = useState([])

    useEffect(()=>{
        setTimeout(()=>{
            getItem()
            setProductArray(itemsData)
        },1000)
    },[])

    return (
        <div id="anchor-name">
            <ItemList productArray={productArray}/>
        </div>
    )
}
export default ItemListContainer