import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ConfirmationDialog = ({ show, message, onContinue, onDiscard, continueText, discardText, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Body >{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onDiscard}>{discardText}</Button>
                <Button variant="primary" onClick={onContinue}>{continueText}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationDialog;
