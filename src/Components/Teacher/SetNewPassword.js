import React, { Component } from "react";
import "./../../App.css";
// eslint-disable-next-line
import { Link } from "react-router-dom";
import { MdVpnKey } from "react-icons/md";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import logo from "./../images/logo.png";
import logoMain from "./../images/logoMain.png";
import Axios from "axios";
import { Button } from "reactstrap";
import { RootContext } from "./../../RContext";
class SetNewPassword extends Component {
  static contextType = RootContext;
  state = {
    newpassword: "",
    confirmpassword: "",
    message: "",
    failed: false,
    url: this.context.url,
    resetToken: this.props.match.params.resetToken,
    toggle1: false,
    toggle2: false,
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  submit = async () => {
    try {
      if (this.state.confirmpassword === "" || this.state.newpassword === "")
        return this.setState({
          message: "fill all the fields.",
          failed: true,
        });
      if (
        this.state.confirmpassword.length < 10 ||
        this.state.newpassword.length < 10
      )
        return this.setState({
          message: "length of the password must be 8 charaters or greater.",
          failed: true,
        });
      if (this.state.confirmpassword === this.state.newpassword) {
        const password = this.state.newpassword;
        const res = await Axios.patch(
          `${this.state.url}/resetPassword/${this.state.resetToken}`,
          { password }
        );
        console.log(res);
        if (res.status === 200) {
          this.props.history.push("/passwordUpdated");
        }
      }
    } catch (err) {
      console.log(err.response);
    }
  };
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
        <div className="flex justify-center items-center mt-10 sm:mt-0 ">
          <div
            style={{ borderRadius: "20px" }}
            className="border-2  hover:border-blue-600 w-full mx-2 sm:mx-0 sm:w-1/3  py-2"
          >
            <span className="flex justify-center">
              <img src={logoMain} alt="nothing found" />
            </span>

            <div className="mb-16 mt-8 mx-6">
              <p className="text-blue-500 text-lg w-full pb-3 capitalize font-semibold tracking-widest mb-2">
                Enter new password:
              </p>
              <span className="flex items-center border-b-2 pb-1 hover:border-blue-500 text-gray-500 hover:text-blue-500 fill-current ">
                <MdVpnKey className="text-2xl" />
                <input
                  style={{ background: "none" }}
                  type={this.state.toggle1 ? "text" : "password"}
                  className="focus:outline-none w-full ml-3 text-lg font-semibold"
                  name="newpassword"
                  placeholder="New password"
                  value={this.state.resetEmail}
                  onChange={this.handleChange}
                  minLength={8}
                />
                <button
                  onClick={() => {
                    this.setState({ toggle1: !this.state.toggle1 });
                  }}
                  className="focus:outline-none"
                >
                  {this.state.toggle1 ? (
                    <AiFillEye className="text-2xl" />
                  ) : (
                    <AiFillEyeInvisible className="text-2xl" />
                  )}
                </button>
              </span>
              <p className="text-blue-500 text-lg w-full pb-3 capitalize font-semibold tracking-widest mb-2 mt-6">
                confirm new password:
              </p>
              <span className="flex items-center border-b-2 pb-1 hover:border-blue-500 text-gray-500 hover:text-blue-500 fill-current ">
                <MdVpnKey className="text-2xl" />
                <input
                  style={{ background: "none" }}
                  type={this.state.toggle2 ? "text" : "password"}
                  className="focus:outline-none w-full ml-3 text-lg font-semibold"
                  name="confirmpassword"
                  placeholder="Confirm password"
                  value={this.state.resetEmail}
                  onChange={this.handleChange}
                />
                <button
                  onClick={() => {
                    this.setState({ toggle2: !this.state.toggle2 });
                  }}
                  className="focus:outline-none"
                >
                  {this.state.toggle2 ? (
                    <AiFillEye className="text-2xl" />
                  ) : (
                    <AiFillEyeInvisible className="text-2xl" />
                  )}
                </button>
              </span>
              {this.state.newpassword !== "" &&
              this.state.confirmpassword !== "" ? (
                this.state.confirmpassword === this.state.newpassword ? (
                  <p className="capitalize font-semibold text-green-500 mt-2">
                    passwords matches.
                  </p>
                ) : (
                  <p className="capitalize font-semibold text-red-500 mt-2">
                    passwords does not match
                  </p>
                )
              ) : (
                ""
              )}

              <p
                style={{ display: this.state.failed }}
                className="capitalize font-semibold text-red-500 mt-2"
              >
                {this.state.message}
              </p>
              <span className="flex justify-center  pt-8 ">
                <Button
                  color="primary"
                  onClick={this.submit}
                  outline
                  className="uppercase tracking-wide"
                >
                  submit
                </Button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SetNewPassword;
