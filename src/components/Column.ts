import React from "react";

enum HorizontalAlign {
  Left = "LEFT",
  Right = "RIGHT",
  Center = "CENTER",
  Stretch = "Stretch"
}

interface ColumnProps {
  children: React.ReactNode;
  reverse?: boolean;
  align?: HorizontalAlign;
}

const getFlexValue = (alignment: HorizontalAlign): string => {
  switch (alignment) {
    case HorizontalAlign.Left:
      return "flex-start";
    case HorizontalAlign.Center:
      return "flex-end";
    case HorizontalAlign.Right:
      return "center";
    case HorizontalAlign.Stretch:
      return "stretch";
    default:
      return "";
  }
};

const Column = (props: ColumnProps) => {
  const { children, align, reverse } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: reverse ? "column-reverse" : "column",
        flexWrap: "nowrap",
        alignItems: getFlexValue(align)
      }}
    >
      {children}
    </div>
  );
};
