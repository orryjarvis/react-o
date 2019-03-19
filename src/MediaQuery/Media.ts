import useMedia from './useMedia';

interface MediaProps {
  query: string;
  initial: boolean;
  children: React.ReactNode;
}

const Media = (props: MediaProps): React.ReactNode => {
  const { query, initial, children } = props;
  const matches = useMedia(query, initial);
  return matches ? children : null;
};

Media.defaultProps = {
  initial: false,
};

export default Media;
