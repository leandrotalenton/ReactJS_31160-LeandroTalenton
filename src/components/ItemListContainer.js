const ItemListContainer = (props) => {
    return (
        <div className='container flex flex-wrap justify-center bg-300 mx-auto my-4'>
            {props.children}
        </div>
    )
}
export default ItemListContainer