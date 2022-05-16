import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Item from "./Item"

const ItemList = ({productArray}) => {
    
    const params = useParams()
    const [itemList,setItemList] = useState( [] ) 

    useEffect(() => {
        params.categoryId
        ? setItemList(productArray.filter(i=>i.brand === params.categoryId))
        : setItemList(productArray)
    }, [params.categoryId, productArray])

    // console.log(itemList)

    return (
        <div className='container m-auto grid grid-cols-[repeat(auto-fit,_minmax(18rem,_1fr))] justify-items-center'>
            {itemList.map( product => {
                return <Item id={product.id} title={product.title} price={product.price} pictureUrl={product.pictureUrl} initial='1' stock={product.stock} key={product.id} brand={product.brand}/>
            })}
        </div>
    )
}
export default ItemList