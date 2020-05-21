import React, { Component } from "react";
import "./../../App.css";
import { RootContext } from "./../../RContext";
import { Link } from "react-router-dom";
import { MdVpnKey } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import Axios from "axios";
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
        });
      }
      const { usn: studentUsn, pass: password } = this.state;
      const res = await Axios.post(`${this.state.url}/student-login`, {
        studentUsn,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div className="login-container">
        <div className="login-back  p-3 ">
          <p className=" mx-2 text-black font-semibold uppercase hover:text-black hover:no-underline tracking-wider">
            clg website
          </p>
          <Link
            className="mx-2 text-black font-semibold uppercase hover:text-black hover:no-underline tracking-wide"
            to="/"
          >
            Back
          </Link>
        </div>
        <div className="login-content">
          <Form
            className=" border bg-gray-200 rounded rounded-lg  hover:shadow-lg"
            onSubmit={this.submit}
          >
            <h4 className="bg-red-500 text-gray-900 w-full p-3 rounded-lg uppercase tracking-widest mb-2">
              Login
            </h4>
            <FormGroup className="mx-8 my-4">
              <Label className="text-lg font-semibold text-gray-800 tracking-wider uppercase">
                usn:
              </Label>
              <InputGroup>
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
              </InputGroup>
            </FormGroup>
            <FormGroup className="mx-8 ">
              <Label className="text-lg font-semibold text-gray-800 tracking-wider uppercase">
                password:
              </Label>
              <InputGroup>
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
              </InputGroup>
            </FormGroup>
            <FormGroup className="mx-8 flex flex-wrap justify-center">
              <FormText
                color="danger"
                className="text-lg font-semibold uppercase tracking-wide"
              >
                {this.state.failedmsg}
              </FormText>
            </FormGroup>
            <FormGroup className="flex justify-center">
              <Button className="m-4  px-4 " type="submit" color="success">
                Login
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}
