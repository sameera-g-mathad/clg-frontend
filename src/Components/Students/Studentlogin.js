import React, { Component } from "react";
import "./../../App.css";
import { RootContext } from "./../../RContext";
import { Link } from "react-router-dom";
import { MdVpnKey } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import Axios from "axios";
import auths from "./auths";
import logo from "./../images/logo.png";
import logoMain from "./../images/logoMain.png";
import image2 from "./../images/image2.jpg";
import {
  Form,
  FormGroup,
  FormText,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
} from "reactstrap";
export default class Studentlogin extends Component {
  static contextType = RootContext;
  state = {
    url: this.context.url,
    usn: "",
    pass: "",
    failedmsg: "",
    display: false,
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  submit = async (e) => {
    try {
      e.preventDefault();
      if (this.state.usn === "" || this.state.pass === "") {
        return this.setState({
          failedmsg: "Invalid Usn or Password",
          display: true,
        });
      }
      const { usn: studentUsn, pass: password } = this.state;
      const res = await Axios.post(`${this.state.url}/student-login`, {
        studentUsn,
        password,
      });

      if (res.status === 200) {
        auths.loginS(res.data.studentToken);
        sessionStorage.setItem(
          "studentToken",
          JSON.stringify(res.data.studentToken)
        );
        this.props.history.push({
          pathname: "/student",
          state: { student: res.data.student },
        });
      }
    } catch (err) {
      console.log(err.response);
      this.setState({
        failedmsg: err.response.data.message,
        display: true,
      });
    }
  };
  render() {
    return (
      <div>
        <div
          style={{
            backgroundImage: 'url("' + image2 + '")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            opacity: 0.75,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></div>
        <div
          className="login-container"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <div className="login-back  p-3 ">
            <span className="flex items-center">
              <img src={logo} alt="no logo" className="w-12 h-12" />
              <span className=" mx-2 text-dark font-semibold uppercase hover:text-black hover:no-underline tracking-widest">
                gat website
              </span>
            </span>
            <Link
              className="mx-2 text-black font-semibold uppercase hover:text-black hover:no-underline tracking-wide"
              to="/"
            >
              Back
            </Link>
          </div>
          <div className="login-content">
            <Form
              style={{ borderRadius: "20px" }}
              className="login-form border  bg-white  hover:shadow-lg"
              onSubmit={this.submit}
            >
              <span className="flex justify-center mt-2">
                <img src={logoMain} alt="nothing found" />
              </span>
              {/* <h4
                style={{ borderRadius: "20px" }}
                className="bg-red-500 text-gray-900 w-full p-3  capitalize tracking-widest mb-2"
              >
                Login
              </h4> */}
              <FormGroup className="mx-8 my-4 w-full px-3">
                <Label className="text-md font-semibold text-gray-800 tracking-wider capitalize">
                  usn:
                </Label>
                <span className="flex items-center bg-white pr-4 border-b-2 hover:border-red-500 hover:text-red-500 text-gray-500  fill-current">
                  <FaUniversity className="text-2xl " />
                  <input
                    style={{ background: "none" }}
                    className="m-2 font-semibold focus:outline-none w-3/4 focus:text-red-500"
                    type="text"
                    name="usn"
                    placeholder="1ga16is000"
                    onChange={this.handleChange}
                    autoComplete="off"
                  />
                </span>
                {/* <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <FaUniversity className="text-red-500" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    name="usn"
                    bsSize="lg"
                    placeholder="1ga16is456"
                    onChange={this.handleChange}
                    autoComplete="off"
                  />
                </InputGroup> */}
              </FormGroup>
              <FormGroup className="mx-8 w-full px-3 ">
                <Label className="text-md font-semibold text-gray-800 tracking-wider capitalize">
                  password:
                </Label>
                <span className="flex items-center bg-white pr-4 border-b-2 hover:border-red-500 hover:text-red-500 text-gray-500  fill-current">
                  <MdVpnKey className="text-2xl" />
                  <input
                    style={{ background: "none" }}
                    className="m-2 font-semibold focus:outline-none w-3/4 focus:text-red-500"
                    type="password"
                    name="pass"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </span>
                {/* <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <MdVpnKey className="text-red-500" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="password"
                    name="pass"
                    bsSize="lg"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </InputGroup> */}
              </FormGroup>
              <FormGroup className="mx-8 flex flex-wrap justify-center">
                <FormText
                  style={{ display: this.state.display ? "block" : "none" }}
                  color="danger"
                  className="text-lg font-semibold uppercase tracking-wide"
                >
                  {this.state.failedmsg}
                </FormText>
              </FormGroup>
              <FormGroup className="flex justify-center">
                <Button className="m-3  px-4 " type="submit" color="success">
                  Login
                </Button>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
