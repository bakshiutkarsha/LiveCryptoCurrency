import * as React from "react";
import  '../styles/styles.global.scss';
// @ts-ignore
import Bg from "../styles/Bg.scss";
import Table from "../src/components/Table/index";

const IndexPage: React.FC = () => {
  return <div className={Bg.bgCntr}>
      <div className={Bg.squareTop}></div>
      <div className={Bg.squareBottom}></div>
      <Table></Table>
  </div>
};

export default IndexPage;