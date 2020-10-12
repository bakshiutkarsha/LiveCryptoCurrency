//@ts-ignore

import * as React from "react";
import { default as App } from "next/app";

interface IProps extends React.Props<{}> {
  isMobileFromSSR: boolean;
}

class GlobalApp extends App<IProps, {}, {}> {
  constructor(props) {
    super(props);
  }

  public static async getInitialProps() {
    return {
      pageProps: {}
    };
  }

  public render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Component {...pageProps} />
      </>
    );
  }
}

export default GlobalApp;