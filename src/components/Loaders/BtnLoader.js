import React from "react";
import ContentLoader from "react-content-loader";

const BtnLoader = props => {
  const { height = 19, width = 30 } = props;
  return (
    <ContentLoader height={height} width={width} speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb" {...props}>
      <rect x="0" y="0" rx="3" ry="3" width={40} height={8} />
    </ContentLoader>
  );
};

export default BtnLoader;
