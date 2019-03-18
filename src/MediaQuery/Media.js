import PropTypes from 'prop-types';
import React from "react";
import useMedia from "./useMedia";

interface MediaProps {
  query: string;
  initial?: boolean;
  children: React.ReactNode;
}

const Media = (props: MediaProps) => {
  const { query, initial, children } = props;
  const matches: boolean = useMedia(query, initial);
  return matches ? children : null;
};

Media.propTypes = {
  query: 
}

export default Media;
