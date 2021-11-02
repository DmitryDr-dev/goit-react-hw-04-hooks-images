// package import
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

// styles import
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ url, alt, onClose, imageArray }) {
  const [activeImageUrl, setActiveImageUrl] = useState(url);
  const [activeImageAlt, setActiveImageAlt] = useState(alt);
  // const [activeIndex, setActiveIndex] = useState(null);

  const closeModal = useCallback(() => {
    onClose();
  }, [onClose]);

  // function to handle backdrop clicks
  const handleBackdropClick = e => {
    if (e.currentTarget !== e.target) {
      return;
    }

    closeModal();
  };

  // function  to update state on keyboard manipulation
  const changeActiveImage = useCallback(
    index => {
      setActiveImageAlt(imageArray[index]?.photographer);
      setActiveImageUrl(imageArray[index]?.src?.large);
    },
    [imageArray],
  );

  // function to close modal on ESC & to switch between images
  const keyboardManipulation = useCallback(
    e => {
      let activeIndex = imageArray.findIndex(
        ({ src: { large } }) => large === activeImageUrl,
      );

      switch (e.code) {
        case 'Escape':
          closeModal();
          return;
        case activeIndex === imageArray.length - 1 && 'ArrowRight':
          activeIndex = 0;
          changeActiveImage(activeIndex);
          return;
        case activeIndex < imageArray.length - 1 && 'ArrowRight':
          activeIndex += 1;
          changeActiveImage(activeIndex);
          return;
        case activeIndex === 0 && 'ArrowLeft':
          activeIndex = imageArray.length - 1;
          changeActiveImage(activeIndex);
          return;
        case activeIndex > 0 && 'ArrowLeft':
          activeIndex -= 1;
          changeActiveImage(activeIndex);
          return;
        default:
          return;
      }
    },
    [activeImageUrl, changeActiveImage, imageArray, closeModal],
  );

  // adding keydown listener
  useEffect(() => {
    window.addEventListener('keydown', keyboardManipulation);

    return () => {
      window.removeEventListener('keydown', keyboardManipulation);
    };
  }, [keyboardManipulation]);

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={activeImageUrl} alt={activeImageAlt} />
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  imageArray: PropTypes.arrayOf(
    PropTypes.shape({
      photographer: PropTypes.string.isRequired,
      src: PropTypes.shape({
        large: PropTypes.string.isRequired,
      }),
    }),
  ),
};
