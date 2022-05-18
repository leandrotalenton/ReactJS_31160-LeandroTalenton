import Item from "./Item"

const ItemList = ({productArray}) => {

    return (
        <div className='container m-auto grid grid-cols-[repeat(auto-fit,_minmax(18rem,_1fr))] justify-items-center'>
            {productArray.map( product => {
                return <Item id={product.id2} title={product.title} price={product.price} pictureUrl={product.pictureUrl} initial='1' stock={product.stock} key={product.id} brand={product.brand}/>
            })}
        </div>
    )
}
export default ItemList