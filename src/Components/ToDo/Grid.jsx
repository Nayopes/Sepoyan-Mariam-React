import { Container, Row, Col } from 'react-bootstrap'
import RandomId from '../helpers/RandomId'
import styles from './todo.module.css'
import AddNewTask from '../AddTask/AddNewTask'

const Grid = () => {
    const blocks = []
    for (let k = 0; k < 20; k++) {
        blocks.push(
            <Col key={RandomId()} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center mt-3">
                  <div className={styles.block}>
                 </div>   
            </Col>
        )
    }
    return (
        <div>
            <Container>
                <Row className="justify-content-center mt-5">
                    <div className={styles.title}>
                       <h1>Grid Component</h1>
                    </div>
                </Row>
                <Row className="justify-content-center mt-5">
                    <AddNewTask />
                </Row>
                <Row className="justify-content-center mt-5">
                    {blocks}
                </Row>
            </Container>
        </div>
    )
}

export default Grid;