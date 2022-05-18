import { createContext, useContext, useEffect, useState } from "react"
import { collection, getDocs, getFirestore } from "firebase/firestore"


const AppContext = createContext()
export const useAppContext = () => useContext(AppContext)

const AppContextProvider = ({children}) => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const db = getFirestore()
        const itemsCollection = collection(db, 'items')
        getDocs(itemsCollection).then( snapshot => {
            setProducts(snapshot.docs.map((i)=>i.data()))
        })
    }, [])
    
    return (
        <AppContext.Provider value={{products}}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContextProvider