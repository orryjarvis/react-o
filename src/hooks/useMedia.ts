import React from "react";

const useMedia = (query: string, initial: boolean) => {
  const [matches, setMatches] = React.useState(initial);

  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => {
      setMatches(mql.matches);
    };

    mql.addListener(onChange);
    setMatches(mql.matches);

    return () => {
      mql.removeListener(onChange);
    };
  }, [query]);

  return matches;
};

export default useMedia;
