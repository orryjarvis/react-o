import React from "react";
import { useMedia } from "../hooks";

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

export default Media;
