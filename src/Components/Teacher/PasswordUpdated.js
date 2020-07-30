import React, { Component } from "react";
import logo from "./../images/logo.png";
import animatedCheckMark from "./animat-checkmark-color.gif";
import { Redirect } from "react-router-dom";
class PasswordUpdated extends Component {
  state = {
    count: 5,
  };
  componentDidMount() {
    this.inter = setInterval(() => {
      if (this.state.count <= 0) clearInterval(this.inter);
      else
        this.setState({
          count: this.state.count - 1,
        });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.inter);
    this.props.history.goForward();
  }
  render() {
    return (
      <div>
        <div className="flex items-center justify-between rounded-lg p-3 ">
          <span className="flex items-center">
            <img src={logo} alt="no logo" className="w-12 h-12" />
            <span className=" mx-2 text-dark font-semibold uppercase hover:text-black hover:no-underline tracking-widest">
              gat website
            </span>
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-bold  sm:text-2xl  capitalize tracking-widest">
            password updated successfully.
          </p>
          <p className="font-semibold capitalize">
            you will be redirected to home in {this.state.count} .
          </p>
          <img src={animatedCheckMark} alt="nothing found" />
        </div>
        {this.state.count === 0 ? <Redirect to="/" /> : ""}
      </div>
    );
  }
}

export default PasswordUpdated;
