import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const BotModal = ({ isNoah }: any ) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        if(isNoah()) {
            setShow(true);        
        }
        
    }
    return (
        <>
            <Button 
            variant="dark" 
            onClick={handleShow}
            className="col-8"
            size="sm">
            click modal
            </Button>

            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Hello,you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                Save Changes
                </Button>
            </Modal.Footer>
            </Modal>
        </>
    );
}

export default BotModal;