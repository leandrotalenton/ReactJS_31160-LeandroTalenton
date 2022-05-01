import Item from "./Item"

const ItemList = (props) => {
    
    return (
        <div className='container m-auto grid grid-cols-[repeat(auto-fit,_minmax(18rem,_1fr))] justify-items-center'>
            {props.productArray.map( product => {
                return <Item id={product.id} title={product.title} price={product.price} pictureUrl={product.pictureUrl} initial='1' stock={product.stock} key={product.id} />
            })}
        </div>
    )
}
export default ItemList