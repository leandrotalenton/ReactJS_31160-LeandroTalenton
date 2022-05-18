import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export const useCartContext = () => useContext(CartContext)

const CartContextProvider = ({children}) => {
    /* cart va ser un array de objetos [{id,cantidad},{id,cantidad},...] */
    
    const [cart, setCart] = useState([])

    const isInCart = (id)=>cart.find((producto)=>producto.id === id) // posible reurns: id value (found), undefined (not found)

    const addToCart = (producto, cantidad) => {
        const newCart = [...cart]
        const productoIsInCart = isInCart(producto.id)

        if(productoIsInCart){ // if undefined then falsy
            newCart[newCart.findIndex((prod)=>prod.id === productoIsInCart.id)].quantity += cantidad
            setCart(newCart)
        } else {
            producto.quantity = cantidad
            setCart([...newCart, producto])
        }
    }

    const deleteFromCart = (producto)=>{
        const newCart = [...cart]
        const productoIsInCart = isInCart(producto.id)

        if(productoIsInCart){ // should never be undefined
            setCart(newCart.filter((prod)=>prod.id!==producto.id))
        }
    }

    const deleteCart = ()=> setCart([])

    // console.log(cart)

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                addToCart,
                deleteFromCart,
                deleteCart,
            }}>
                {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider