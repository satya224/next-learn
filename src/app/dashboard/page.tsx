import styles from './page.module.css'
import Login from "@/app/dashboard/login/page";

const Dashboard = () => {
    return (
        <div className={styles.container}>
            <Login></Login>
        </div>
    )
}
export default Dashboard
