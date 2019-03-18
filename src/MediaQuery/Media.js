import PropTypes from 'prop-types';
import useMedia from './useMedia';

const Media = props => {
  const { query, initial, children } = props;
  const matches = useMedia(query, initial);
  return matches ? children : null;
};

Media.propTypes = {
  query: PropTypes.string.isRequired,
  initial: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Media;
