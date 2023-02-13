import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillCloseCircle } from "react-icons/ai";

import styles from "./Navbar.module.css";
import { logout } from "../../auth/authentication";
import { useNavigate } from "react-router-dom";

function Navbar() {
	const [toggleMenu, setToggleMenu] = useState(false);
	const navigate = useNavigate();

	const routes = [
		{ to: "/", text: "Empleados" },
		{ to: "/palindromos", text: "Palíndromos" },
	];

	const logoutEvent = () => {
		logout();
		navigate("/auth/login");
	};

	return (
		<nav className={styles.app__navbar}>
			<div className={styles.app__navbarLogo}>
				<span className="p__opensans">EMPRESA</span>
			</div>
			<ul className={styles.app__navbarLinks}>
				{routes.map((route) => (
					<li className="p__opensans" key={`link-${route.text}`}>
						<a href={route.to}>{route.text}</a>
					</li>
				))}
			</ul>
			<div className={styles.app__navbarLogin}>
				<a
					href="/auth/login"
					className="p__opensans"
					onClick={() => {
						logoutEvent();
					}}
				>
					Cerrar sesión
				</a>
				<div />
			</div>
			<div className={styles.app__navbarSmallscreen}>
				<GiHamburgerMenu
					color="#333a56"
					fontSize={27}
					onClick={() => setToggleMenu(true)}
					className={styles.hamburguer}
				></GiHamburgerMenu>

				{toggleMenu && (
					<div
						className={`${styles.app__navbarSmallscreen_overlay} flex-center slide-bottom`}
					>
						<AiFillCloseCircle
							fontSize={27}
							className={styles.overlay__close}
							onClick={() => setToggleMenu(false)}
						/>
						<ul className={styles.app__navbarSmallscreen_links}>
							{routes.map((route) => (
								<li
									className="p__opensans"
									key={`link-${route.text}`}
								>
									<a href={route.to}>{route.text}</a>
								</li>
							))}
							<li className="p__opensans">
								<a
									href="/auth/login"
									onClick={() => {
										logoutEvent();
									}}
								>
									Cerrar sesión
								</a>
							</li>
						</ul>
					</div>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
