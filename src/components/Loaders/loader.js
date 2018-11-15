import React from "react";
import ContentLoader from "react-content-loader";

const LoaderContent = props => {
  const random = Math.random() * (1 - 0.7) + 0.7;
  return (
    <ContentLoader height={65} width={1060} speed={2} primaryColor="#d9d9d9" secondaryColor="#ecebeb" {...props}>
      <rect x="0" y="28" rx="4" ry="4" width="6" height="6.4" />
      <rect x="34" y="25" rx="6" ry="6" width={200 * random} height="12" />
      <rect x="633" y="25" rx="6" ry="6" width={23 * random} height="12" />
      <rect x="653" y="25" rx="6" ry="6" width={78 * random} height="12" />
      <rect x="755" y="25" rx="6" ry="6" width={117 * random} height="12" />
      <rect x="938" y="25" rx="6" ry="6" width={83 * random} height="12" />
    </ContentLoader>
  );
};

const Loader = props => (
  <React.Fragment>
    {Array(props.rows)
      .fill("")
      .map((e, i) => (
        <LoaderContent key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
      ))}
  </React.Fragment>
);

export default Loader;
