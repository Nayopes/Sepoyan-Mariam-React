import { Modal, Button } from 'react-bootstrap'
const ConfirmModal = (props) => {
    const {onHide, onClick, message, buttonName} = props
    const onSubmit =() =>{
        onClick()
        onHide()
    }
    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title> {message}</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="info" onClick={onHide}>
                    Cancel
          </Button>
                <Button variant="danger" onClick={onSubmit}>
                    {buttonName}
          </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ConfirmModal