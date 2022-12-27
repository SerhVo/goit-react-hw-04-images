import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("modal-root")

export const Modal = ({ largeImageURL, modalClose }) => {

    const handleClose = ({ target, currentTarget, code }) => {
        if (target === currentTarget || code === "Escape") {
            modalClose();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleClose);
        return () => {
            window.removeEventListener('keydown', handleClose);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return createPortal(
        <div className={css.Overlay} onClick={handleClose}>
            <div className={css.Modal}>
                <img src={largeImageURL} alt={largeImageURL} />
            </div>
        </div>,
        modalRoot
    )
}

Modal.propTypes = {
    modalClose: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
};