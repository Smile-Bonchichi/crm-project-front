import React from 'react';
import type { ModalType } from "./ModalType";
import ModalRO from "react-overlays/Modal";

import './modal.css';

const Modal = (props: ModalType) => {
    const renderBackdrop = (props) => <div className="backdrop" { ...props } />;

    return (
        <ModalRO
            className="modal"
            show={ props.open }
            onHide={ props.onCLose }
            renderBackdrop={ renderBackdrop }
        >
            <div>
                <div className="modal-header">
                    <div className="modal-title">Add /Alter</div>
                    <div>
                        <span className="close-button" onClick={ props.onCLose }> X </span>
                    </div>
                </div>
                { props.child }
            </div>
        </ModalRO>
    );
};

export default Modal;