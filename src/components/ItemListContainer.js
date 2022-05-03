import { useEffect, useState } from "react";
import ItemList from "./ItemList";

const ItemListContainer = (props) => {

    const [productArray, setProductArray] = useState([])

    useEffect(()=>{
        const emulacionFetch = new Promise((resolve, reject)=>{
            setTimeout(() => {
                if(true){
                    resolve(`se resolvio la promesa`);
                } else {
                    reject(`no se resolvio nada`);
                }
            }, 2000);
        })

        emulacionFetch
        .then(res=>{
            console.log(res);
            setProductArray([
                {id:`1`,title:`Zapatilla 1`,price:11,pictureUrl:"https://api.lorem.space/image/shoes?w=400&h=225",stock:1},
                {id:`2`,title:`Zapatilla 2`,price:22,pictureUrl:"https://api.lorem.space/image/shoes?w=400&h=225",stock:2},
                {id:`3`,title:`Zapatilla 3`,price:33,pictureUrl:"https://api.lorem.space/image/shoes?w=400&h=225",stock:3},
                {id:`4`,title:`Zapatilla 4`,price:44,pictureUrl:"https://api.lorem.space/image/shoes?w=400&h=225",stock:4},
                {id:`5`,title:`Zapatilla 5`,price:55,pictureUrl:"https://api.lorem.space/image/shoes?w=400&h=225",stock:5},
                {id:`6`,title:`Zapatilla 6`,price:66,pictureUrl:"https://api.lorem.space/image/shoes?w=400&h=225",stock:6},
                {id:`7`,title:`Zapatilla 7`,price:77,pictureUrl:"https://api.lorem.space/image/shoes?w=400&h=225",stock:7},
                {id:`8`,title:`Zapatilla 8`,price:88,pictureUrl:"https://api.lorem.space/image/shoes?w=400&h=225",stock:8},
                {id:`9`,title:`Zapatilla 9`,price:99,pictureUrl:"https://api.lorem.space/image/shoes?w=400&h=225",stock:9}
            ])
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    return (
        <div id="anchor-name">
            <ItemList productArray={productArray}/>
        </div>
    )
}
export default ItemListContainer