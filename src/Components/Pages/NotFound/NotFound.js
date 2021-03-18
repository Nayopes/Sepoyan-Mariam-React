import styles from './notfound.module.css'

const NotFound =() => {
    return (
        <div className={styles.mainDiv}>
            <div className={styles.errorBox}>
                <h1 className={styles.errorTitle}>错误 四 零 四 !</h1>
                <p className={styles.errorText}>本   页面    不   存在.</p>
                <p className={styles.errorText}>请    检查   您 的   链接.</p>
                <p className={styles.englishText}>P.S. If you want to understand what is written please provide the correct link.</p>
            </div>
            <p className={styles.textOfPPS}>P.P.S. Or let's study Chinese)</p>
        </div>
    )
}
export default NotFound