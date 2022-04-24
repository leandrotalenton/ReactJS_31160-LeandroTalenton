const ItemListContainer = (props) => {
    return (
        <div className='container m-auto grid grid-cols-[repeat(auto-fit,_minmax(24rem,_1fr))] justify-items-center'>
            {props.children}
        </div>
    )
}
export default ItemListContainer