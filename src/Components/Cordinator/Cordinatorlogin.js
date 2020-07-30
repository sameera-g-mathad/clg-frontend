import React, { Component } from "react";
import "./../../App.css";
import { RootContext } from "./../../RContext";
import { Link } from "react-router-dom";
import { MdVpnKey, MdEmail } from "react-icons/md";
import { Alert } from "reactstrap";
import { FiAlertCircle } from "react-icons/fi";
import logo from "./../images/logo.png";
import logoMain from "./../images/logoMain.png";
import image3 from "./../images/image3.jpg";
import {
  Form,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
} from "reactstrap";
import Axios from "axios";
import authc from "./authc";
export default class Cordinaotlogin extends Component {
  static contextType = RootContext;
  state = {
    url: this.context.url,
    email: "",
    password: "",
    failed: false,
    failedmsg: "",
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
      if (this.state.email === "" || this.state.password === "")
        return this.setState({
          failed: true,
          failedmsg: "Please enter the fields specified",
        });
      const { email, password } = this.state;
      const res = await Axios.post(`${this.state.url}/cordinator-login`, {
        email,
        password,
      });
      console.log(res);
      if (res.status === 200) {
        sessionStorage.setItem(
          "dept",
          JSON.stringify(res.data.cordinator.dept)
        );
        sessionStorage.setItem(
          "cordinatorToken",
          JSON.stringify(res.data.cordinatorToken)
        );
        authc.loginC(res.data.cordinatorToken);
        this.props.history.push("/cordinator/staff");
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  render() {
    return (
      <div>
        <div
          className="gat"
          style={{
            backgroundImage: 'url("' + image3 + '")',
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
              className="login-form border bg-white hover:shadow-lg"
              onSubmit={this.submit}
            >
              <span className="flex justify-center mt-2">
                <img src={logoMain} alt="nothing found" />
              </span>
              {/* <h4
                style={{ borderRadius: "20px" }}
                className="bg-yellow-400 text-gray-900 w-full p-3  capitalize tracking-widest mb-2"
              >
                Login
              </h4> */}
              <FormGroup className="mx-8 my-4 w-full px-3 ">
                <Label className="text-md font-semibold text-gray-800 tracking-wider capitalize">
                  email:
                </Label>
                <span className="flex items-center bg-white pr-4 border-b-2 hover:border-yellow-500 hover:text-yellow-600 text-gray-500  fill-current">
                  <MdEmail className="text-2xl" />
                  <input
                    style={{ background: "none" }}
                    className="m-2 font-semibold focus:outline-none w-3/4 focus:text-yellow-600"
                    type="email"
                    name="email"
                    placeholder="yourmail@email.com"
                    autoComplete="off"
                    onChange={this.handleChange}
                  />
                </span>
                {/* <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <MdEmail className="text-yellow-400" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    bsSize="lg"
                    name="email"
                    placeholder="yourmail@email.com"
                    autoComplete="off"
                    onChange={this.handleChange}
                  />
                </InputGroup> */}
              </FormGroup>
              <FormGroup className="mx-8 w-full px-3">
                <Label className="text-md font-semibold text-gray-800 tracking-wider capitalize">
                  password:
                </Label>
                <span className="flex items-center bg-white pr-4 border-b-2 hover:border-yellow-500 hover:text-yellow-600 text-gray-500  fill-current">
                  <MdVpnKey className="text-2xl" />
                  <input
                    style={{ background: "none" }}
                    className="m-2 font-semibold focus:outline-none w-3/4 focus:text-yellow-600"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </span>
                {/* <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <MdVpnKey className="text-yellow-400" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="password"
                    bsSize="lg"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </InputGroup> */}
              </FormGroup>
              <Alert
                isOpen={this.state.failed}
                toggle={() => {
                  this.setState({ failed: !this.state.failed });
                }}
                className="mx-8  font-semibold capitalize"
                color="danger"
              >
                <span className="flex items-center">
                  <FiAlertCircle className="mr-3" />
                  {this.state.failedmsg}
                </span>
              </Alert>
              <FormGroup className="flex justify-center">
                <Button className="m-3  px-4" type="submit" color="success">
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
