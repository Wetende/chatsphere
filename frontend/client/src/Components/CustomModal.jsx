import React, { useContext, useEffect, useRef } from 'react'

// Libraries
import ReactModal from "react-modal";
import { PropTypes } from "prop-types";

// Components
import useOnClickOutside from '../Functions/UseOnClickOutside';
import GlobalContext from '../Context/Context';

const Wrapper = (props) => {
    const modalEl = useRef(null)
    const modal_inner = useRef(null)
    const { customModal, setCustomModal } = useContext(GlobalContext);

    const customStyles = {
        overlay: {
            background: "rgba(35,35,35,0.93)"
        },
        content: {
            padding: 0,
            border: "none",
            background: "transparent",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }
    };

    const handleCloseEvent = () => {
        modalEl.current.node.classList.remove("open");
        setTimeout(() => {
            setCustomModal({
                ...customModal,
                el: null,
                isOpen: false
            })
        }, 100);
    }

    const handleOpenEvent = () => {
        setCustomModal({
            ...customModal,
            el: modalEl.current.node,
            isOpen: true
        })
        setTimeout(() => {
            modalEl.current.node.classList.add("open");
        }, 100);
    }

    useEffect(() => {
        modalEl.current.node.classList.add("custom_modal");
        const close = (e) => {
            if (e.keyCode === 27) {
                handleCloseEvent();
            }
        };

        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])

    useEffect(() => {
        if (props.defaultOpen === true) {
            setTimeout(() => {
                import("../Functions/Utilities").then(module => {
                    if (module.getCookie("litho-promo-popup") === "shown") {
                        handleCloseEvent();
                    } else {
                        handleOpenEvent();
                    }
                });
            }, 200);
        }
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])

    useOnClickOutside(modal_inner, handleCloseEvent);

    ReactModal.setAppElement("#modal-outer");

    return (
        <div className={props.className}>
            <span className={props.modalBtn && "inline-block"} onClick={handleOpenEvent}>
                {props.modalBtn}
            </span>
            <ReactModal
                className={props.animation}
                ref={modalEl}
                isOpen={(customModal.el !== null && customModal.el === modalEl.current.node && customModal.isOpen === true) ? true : false}
                onRequestClose={handleCloseEvent}
                style={customStyles}
                contentLabel="Example Modal"
                shouldCloseOnEsc={true}
                parentSelector={() => document.body}
            >
                <div className="modal-outer w-full text-center py-[40px] px-[15px]">
                    {
                        (props.closeBtnOuter === true) && <div className="close-btn absolute top-[30px] text-[30px] right-[30px] w-[44px] h-[44px] flex items-center justify-center cursor-pointer text-white landscape:top-[20px] landscape:right-[20px]" onClick={handleCloseEvent}>×</div>
                    }
                    <div className="modal-inner inline-block w-auto max-w-full" ref={modal_inner}>
                        {props.children}
                    </div>
                </div>
            </ReactModal>
        </div>
    )
}

const Close = (props) => {
    const { customModal, setCustomModal } = useContext(GlobalContext);

    const handleCloseEvent = (e) => {
        let modalEl = e.target.closest(".ReactModalPortal");
        modalEl.classList.remove("open");
        setTimeout(() => {
            setCustomModal({
                ...customModal,
                el: null,
                isOpen: false
            })
        }, 100);
    }

    return (
        <div
            className={`inline-block${props.className ? ` ${props.className}` : ""}`}
            onClick={handleCloseEvent}
        >
            {props.children}
        </div>
    );
};

const CustomModal = {
    Close,
    Wrapper
};

// Default Props
CustomModal.Wrapper.defaultProps = {
    closeBtnOuter: true,
    defaultOpen: false
}

// Validation
CustomModal.Wrapper.propTypes = {
    className: PropTypes.string,
    closeBtnOuter: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
}

CustomModal.Close.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
}
export default CustomModal