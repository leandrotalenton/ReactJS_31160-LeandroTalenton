const NavBar = (props) => {
	return (
		<div className="navbar bg-base-300 fixed top-0 z-50">
			<div className="flex-1">
				<a href="./#" className="btn btn-ghost normal-case text-xl" >Tiendita</a>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal p-0">
					<li><a href="./#">Item 1</a></li>
					<li tabIndex="0">
						<a href="./#">
							Parent
							<svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
						</a>
						<ul className="p-2 bg-base-300">
							<li><a href="./#">Submenu 1</a></li>
							<li><a href="./#">Submenu 2</a></li>
						</ul>
					</li>
					<li><a href="./#">Item 3</a></li>
				</ul>
			</div>
			<div className="flex-none">
				{props.children}
				<div className="dropdown dropdown-end">
					<label tabIndex="0" className="btn btn-ghost btn-circle avatar">
						<div className="w-10 rounded-full">
							<img src="https://api.lorem.space/image/face?hash=33791" alt="img"/>
						</div>
					</label>
					<ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52">
						<li>
							<a href="./#" className="justify-between">
								Profile
								<span className="badge">New</span>
							</a>
						</li>
						<li><a href="./#" >Settings</a></li>
						<li><a href="./#" >Logout</a></li>
					</ul>
				</div>
			</div>
		</div>
	)
}
export default NavBar