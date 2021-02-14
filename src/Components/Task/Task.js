import React from 'react'
import styles from './task.module.css'

const Task = ({task}) => {
    return(
        <div className={styles.task}>
            <p className="task">
                {task}
            </p>
        </div>
    )
}
export default Task
