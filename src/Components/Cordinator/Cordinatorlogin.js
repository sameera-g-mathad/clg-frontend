import React, { Component } from "react";
import "./../../App.css";
import { RootContext } from "./../../RContext";
import { Link } from "react-router-dom";
import { MdVpnKey, MdEmail } from "react-icons/md";
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
export default class Cordinaotlogin extends Component {
  static contextType = RootContext;
  state = {
    url: this.context.url,
  };
  render() {
    return (
      <div className="login-container">
        <div className="login-back border rounded-lg p-3 ">
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
          <Form className=" border bg-gray-200 rounded rounded-lg  hover:shadow-lg">
            <h4 className="bg-yellow-400 text-gray-900 w-full p-3 rounded-lg uppercase tracking-widest mb-2">
              Login
            </h4>
            <FormGroup className="mx-8 my-4">
              <Label className="text-lg font-semibold text-gray-800 tracking-wider uppercase">
                email:
              </Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <MdEmail className="text-yellow-400" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  bsSize="lg"
                  placeholder="yourmail@email.com"
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
                    <MdVpnKey className="text-yellow-400" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type="password" bsSize="lg" placeholder="Password" />
              </InputGroup>
            </FormGroup>
            <FormGroup className="flex justify-center">
              <Button className="m-6  px-4" type="submit" color="success">
                Login
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}
