// Node Modules
import PropTypes from 'prop-types';
import { useRef, useEffect, useContext } from 'react';
// Context
import ModalContext from './ModalContext';

const createUniqueNameGenerator = seed => () => {
  return seed++;
};

const generateUniqueName = createUniqueNameGenerator(Math.floor(performance.now()));

const Modal = props => {
  const { children, context } = props;
  // Generate unique name once
  const nameRef = useRef(generateUniqueName());

  // Subscribe to modal context, retrieve functions to show/hide modals
  const contextValue = useContext(context || ModalContext);

  const { showModal, hideModal, updateModal } = contextValue;

  useEffect(() => {
    const name = nameRef.current;
    showModal(name);
    return () => hideModal(name);
  }, [showModal, hideModal]);

  useEffect(() => {
    const name = nameRef.current;
    updateModal(name, children);
  }, [children, updateModal]);

  return null;
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  context: PropTypes.any,
};

export default Modal;
