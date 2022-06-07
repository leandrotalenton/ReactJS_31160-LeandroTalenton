import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export const useCartContext = () => useContext(CartContext)

const CartContextProvider = ({children}) => {    
    const [cart, setCart] = useState([])

    const isInCart = (id2)=>cart.find((producto)=>producto.id2 === id2) // posible reurns: id value (found), undefined (not found)

    const addToCart = (producto, cantidad) => {
        const newCart = [...cart]
        const productoIsInCart = isInCart(producto.id2)

        if(productoIsInCart){ // if undefined then falsy
            newCart[newCart.findIndex((prod)=>prod.id2 === productoIsInCart.id2)].quantity += cantidad
            setCart(newCart)
        } else {
            producto.quantity = cantidad
            setCart([...newCart, producto])
        }
    }

    const deleteFromCart = (producto)=>{
        const newCart = [...cart]
        const productoIsInCart = isInCart(producto.id2)

        if(productoIsInCart){ // should never be undefined
            setCart(newCart.filter((prod)=>prod.id2!==producto.id2))
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