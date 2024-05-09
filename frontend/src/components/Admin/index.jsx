import styles from "./styles.module.css";

const Admin = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location = "/login";
	};

	return (
		<div className={styles.mainContainer}>
			<nav className={styles.navbar}>
				<h1>Admin dashbord</h1>
				<button className={styles.whiteBtn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
};

export default Admin;
