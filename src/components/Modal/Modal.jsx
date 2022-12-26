import { Component } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("modal-root")

export class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleClose);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleClose);
    }

    handleClose = ({ target, currentTarget, code }) => {
        if (target === currentTarget || code === "Escape") {
            this.props.modalClose();
        }
    }

    render() {
        const { largeImageURL } = this.props;
        return createPortal(
            <div className={css.Overlay} onClick={this.handleClose}>
                <div className={css.Modal}>
                    <img src={largeImageURL} alt={largeImageURL} />
                </div>
            </div>,
            modalRoot
        )
    }
}

Modal.propTypes = {
  modalClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};