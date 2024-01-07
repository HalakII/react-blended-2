import { useEffect } from 'react';
import { Overlay, ModalDiv } from 'components';

export const Modal = ({ src, alt, onCloseModal }) => {
  useEffect(() => {
    const escapeCloseModal = evt => {
      if (evt.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', escapeCloseModal);
    return () => {
      window.removeEventListener('keydown', escapeCloseModal);
    };
  }, [onCloseModal]);

  const backdropCloseModal = evt => {
    if (evt.target === evt.currentTarget) {
      onCloseModal();
    }
  };
  return (
    <Overlay onClick={backdropCloseModal}>
      <ModalDiv>
        <img src={src.large} alt={alt} />
      </ModalDiv>
    </Overlay>
  );
};
