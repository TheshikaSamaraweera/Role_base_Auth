import styles from "./styles.module.css";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location = "/login";
	};

	return (
		<div className={styles.mainContainer}>
			<nav className={styles.navbar}>
				<h1>User dashbord</h1>
				<button className={styles.whiteBtn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
};

export default Main;
