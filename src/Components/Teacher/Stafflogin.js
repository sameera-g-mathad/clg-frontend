import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./../images/logo.png";
import logoMain from "./../images/logoMain.png";
import image1 from "./../images/image1.jpg";
// eslint-disable-next-line
import {
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  FormFeedback,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import "./../../App.css";
import { MdEmail, MdVpnKey } from "react-icons/md";
import axios from "axios";
import auth from "./auth";

export default class Stafflogin extends Component {
  number = 0;
  state = {
    email: "",
    password: "",
    failedmsg: "",
    faildisplay: false,
  };
  change = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  submit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = this.state;
      const res = await axios.post("http://127.0.0.1:4000/staff-login", {
        email,
        password,
      });
      if (res.status === 200) {
        auth.login(res.data.teacherToken);
        sessionStorage.setItem(
          "teacherToken",
          JSON.stringify(res.data.teacherToken)
        );
        sessionStorage.setItem("id", JSON.stringify(res.data.staff._id));
        if (auth.isAuthenticated() !== null)
          this.props.history.push({
            pathname: "/staff",
            state: {
              id: res.data.staff._id,
              subject1: res.data.staff.subject1_Id,
              subject2: res.data.staff.subject2_Id,
            },
          });
      }
    } catch (err) {
      this.setState({
        failedmsg: err.response.data.message,
        faildisplay: true,
      });
    }
  };
  render() {
    if (window.innerWidth < 500) this.number = 30;
    else this.number = 150;
    return (
      <div>
        <div
          style={{
            backgroundImage: 'url("' + image1 + '")',
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
          className="staff-container "
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <div className="staff-back   p-3 ">
            <span className="flex items-center ">
              <img src={logo} alt="no logo" className="w-12 h-12" />
              <span className=" mx-2 text-dark font-semibold uppercase hover:text-black hover:no-underline tracking-widest">
                gat website
              </span>
            </span>
            <Link
              className="mx-2  text-dark font-semibold uppercase hover:text-black hover:no-underline tracking-widest"
              to="/"
            >
              Back
            </Link>
          </div>
          <div className="staff-login  ">
            <Form
              style={{ borderRadius: "20px" }}
              className="staff-form border  bg-white  hover:shadow-lg"
              onSubmit={this.submit}
            >
              <span className="flex justify-center mt-2">
                <img src={logoMain} alt="nothing found" />
              </span>
              {/* <h4
                style={{ borderRadius: "20px" }}
                className="bg-blue-500 text-gray-900 w-full p-3  capitalize tracking-widest mb-2"
              >
                Login
              </h4> */}

              <FormGroup className="mx-8 my-4 w-full px-3">
                <Label
                  className="text-md font-semibold text-gray-800 tracking-wider capitalize"
                  for="email"
                >
                  Email:
                </Label>
                <span className="flex items-center bg-white pr-4 border-b-2 hover:border-blue-500 hover:text-blue-500 text-gray-500  fill-current">
                  <MdEmail className="text-2xl" />
                  <input
                    style={{ background: "none" }}
                    className="m-2 font-semibold focus:outline-none w-3/4 focus:text-blue-500"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="yourmail@email.com"
                    autoComplete="off"
                    onChange={this.change}
                  />
                </span>
                {/* <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <MdEmail className="text-blue-500" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="yourmail@email.com"
                    autoComplete="off"
                    bsSize="lg"
                    onChange={this.change}
                  />
                </InputGroup> */}
              </FormGroup>

              <FormGroup className="mx-8 w-full px-3">
                <Label
                  className="text-md font-semibold text-gray-800 tracking-wider capitalize"
                  for="pass"
                >
                  Password:
                </Label>
                <span className="flex items-center bg-white pr-4 border-b-2 hover:border-blue-500 hover:text-blue-500 text-gray-500  fill-current">
                  <MdVpnKey className="text-2xl" />
                  <input
                    style={{ background: "none" }}
                    className="m-2 font-semibold focus:outline-none w-3/4 focus:text-blue-500"
                    type="password"
                    id="pass"
                    name="password"
                    placeholder="Password"
                    onChange={this.change}
                  />
                </span>
                {/* <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <MdVpnKey className="text-blue-500" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="password"
                    id="pass"
                    name="password"
                    placeholder="Password"
                    bsSize="lg"
                    onChange={this.change}
                  />
                </InputGroup> */}
              </FormGroup>
              <FormGroup className="mx-8 text-xl">
                <FormFeedback
                  className="font-semibold uppercase tracking-wide"
                  color="danger"
                  style={{ display: this.state.faildisplay ? "block" : "none" }}
                >
                  {this.state.failedmsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="flex">
                <Button className="m-3" type="submit" color="success">
                  Login
                </Button>
                <Button
                  className="m-3"
                  type="button"
                  color="info"
                  tag={Link}
                  to="/resetpassword"
                >
                  Reset Password
                </Button>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
