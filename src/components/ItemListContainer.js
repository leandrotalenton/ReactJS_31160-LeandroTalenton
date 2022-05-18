import { /* useContext, */ useEffect, useState } from "react";
// import { getItem, itemsData } from "../data/itemsData";
import { useAppContext } from "./context/AppContext";
import ItemList from "./ItemList";

const ItemListContainer = () => {

    const [productArray, setProductArray] = useState([])
    const { products } = useAppContext()

    useEffect(()=>{
        setTimeout(()=>{
            setProductArray(products)
            console.log(products)
        },1000)
    },[products])

    return (
        <div id="anchor-name">
            <ItemList productArray={productArray}/>
        </div>
    )
}
export default ItemListContainer