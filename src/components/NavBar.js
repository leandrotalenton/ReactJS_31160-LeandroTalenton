import { Link } from "react-router-dom"
import CartWidget from "./CartWidget"
import { getDocs, collection } from "firebase/firestore"
import { db } from ".."
import { useEffect, useState } from "react"



const NavBar = () => {

	const [categories, setCategories] = useState([])

	useEffect(() => {
		getDocs(collection(db,'categories')).then(snapshot=>{
			const categorias = snapshot.docs.map(doc => {
				return {id: doc.id, ...doc.data()}
			})
			setCategories(categorias)
		})
	}, [])
	


	return (
		<>
		<div className="navbar bg-base-300 fixed top-0 z-50">
			<div className="flex-1">
				<Link to='/' className="text-sm sm:text-xl btn btn-ghost normal-case ">Tiendita de zapatillas</Link>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal p-0">
					<li tabIndex="0">
						<div>
							Marca
							<svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
						</div>
						<ul className="p-2 bg-base-300">
							{categories.map( cat => {
								return <li key={cat.description}><Link to={`/category/${cat.description}`}>{cat.description}</Link></li>
							})}
						</ul>
					</li>
				</ul>
			</div>
			<div className="flex-none">
				<CartWidget />
				<div className="dropdown dropdown-end">
					<label tabIndex="0" className="btn btn-ghost btn-circle avatar">
						<div className="w-10 rounded-full">
							<img src="https://api.lorem.space/image/face?hash=33791" alt="img"/>
						</div>
					</label>
					<ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52">
						<li>
							<Link to={`/`} className="justify-between">
								Profile
								<span className="badge">New</span>
							</Link>
						</li>
						<li><Link to={`/`} >Settings</Link></li>
						<li><Link to={`/`} >Logout</Link></li>
					</ul>
				</div>
			</div>
		</div>
		<div className="h-16"></div>
		</>
	)
}
export default NavBar