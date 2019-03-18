import PropTypes from "prop-types";
import React, { useMemo, useReducer, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import ModalContext from "./ModalContext";

const reducer = (state, action) => {
  const { name } = action;
  switch (action.type) {
    case "UPDATE": {
      if (!state.modals[name]) {
        // If 'SHOW' has not been run yet, get a base state
        state = reducer(state, { type: "SHOW" });
      }
      return {
        ...state, // Keep other state the same (stack index)
        modals: {
          ...state.modals, // Keep other existing modals open
          [name]: {
            ...state.modals[name], // Keep other info on the modal the same (name, index)
            children: action.children // Update the children of this modal
          }
        }
      };
    }
    case "SHOW": {
      return {
        ...state,
        nextIndex: state.nextIndex + 1, // Increment the index for the next modal
        modals: {
          ...state.modals, // Keep other existing modals open
          [name]: {
            // Add modal by name
            ...state.modals[name], // Keep the children if 'UPDATE' was ran prior
            index: state.nextIndex, // Define a stack index
            name // Track the modal name
          }
        }
      };
    }
    case "HIDE": {
      // Take advantage of es6 object desctructuring to immutably remove the named property.
      // Eslint doesn't like that we don't use the variable we declare, so disable for that line.
      const { [name]: theModal, ...withoutModal } = state.modals; //eslint-disable-line no-unused-vars

      // We don't decrement the `nextIndex` because we do not guarantee that the closed modal
      // was the top of the stack. We only need to maintain relative ordering anyway.
      return {
        ...state,
        modals: withoutModal
      };
    }
    default:
      return state;
  }
};

const ModalRoot = props => {
  const {
    children,
    onModalShown,
    onModalHidden,
    portalElement,
    context
  } = props;

  const [state, dispatch] = useReducer(reducer, { nextIndex: 0, modals: {} });
  const { modals } = state;

  const showModal = useCallback(
    name => {
      return dispatch({ type: "SHOW", name });
    },
    [dispatch]
  );

  const hideModal = useCallback(
    name => {
      return dispatch({ type: "HIDE", name });
    },
    [dispatch]
  );

  const updateModal = useCallback(
    (name, children) => {
      return dispatch({ type: "UPDATE", name, children });
    },
    [dispatch]
  );

  useEffect(() => {
    if (Object.keys(modals).length > 0) {
      onModalShown && onModalShown();
    }
    return () => {
      onModalHidden && onModalHidden();
    };
  }, [modals, onModalShown, onModalHidden]);

  const contextValue = useMemo(() => ({ showModal, hideModal, updateModal }), [
    showModal,
    hideModal,
    updateModal
  ]);

  const ContextProvider = context ? context.Provider : ModalContext.Provider;
  return (
    <ContextProvider value={contextValue}>
      {children}
      {portalElement ? (
        createPortal(<Modals modals={modals} />, portalElement)
      ) : (
        <Modals modals={modals} />
      )}
    </ContextProvider>
  );
};

ModalRoot.propTypes = {
  // Children of the component. Any node in this tree will be able to
  // access the modal context
  children: PropTypes.node.isRequired,
  // (Optional)
  // A provided element to render the modals into. If not provided, the
  // modals will be rendered as siblings (successors) to the provided
  // children of this component.
  portalElement: PropTypes.instanceOf(Element),
  // (Optional)
  // It is important for this function to be idempotent, as it will be
  // called every time this component is rendered, if any modal is shown.
  // This is intended to be a place to, for example, disable scrolling on
  // the body of the app.
  onModalShown: PropTypes.func,
  // (Optional)
  // It is important for this function to be idempotent, as it will be
  // called every time this component is rendered, if no modal is shown.
  // This is intended to be a place to clean up effects created in response
  // to "onModalShown".
  onModalHidden: PropTypes.func,
  // (Optional)
  // Using a custom context for this component will allow <Modal /> components
  // using that same context to be independent from other <Modal /> and
  // <ModalRoot /> components in the same tree- as they will differ by context.
  // This is intended to allow for extreme modal stacking flexibility.
  context: PropTypes.any
};

const Modals = props => {
  const { modals } = props;
  return Object.keys(modals)
    .sort((a, b) => modals[a].index - modals[b].index)
    .map(key => modals[key].children || null);
};

Modals.propTypes = {
  modals: PropTypes.objectOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      children: PropTypes.node
    })
  ).isRequired
};

export default ModalRoot;
