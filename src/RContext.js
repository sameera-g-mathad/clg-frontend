import React, { Component } from "react";
const RootContext = React.createContext();
class RootContextProvider extends Component {
  render() {
    return (
      <RootContext.Provider value={{ url: "http://192.168.0.107:4000" }}>
        {this.props.children}
      </RootContext.Provider>
    );
  }
}
export { RootContextProvider, RootContext };
