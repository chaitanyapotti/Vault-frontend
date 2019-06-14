import React from "react";
import { CUICard } from "../../helpers/material-ui";
import Loader from "./loader";

const TableLoader = () => (
  <CUICard className="card-brdr" style={{ padding: "40px 40px" }}>
    <Loader rows={6} />
  </CUICard>
);

export default TableLoader;
