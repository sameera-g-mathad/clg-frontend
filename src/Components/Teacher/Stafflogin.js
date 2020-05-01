import React, { Component } from "react";
import { Link } from "react-router-dom";
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
        auth.login(res.data.token);
        localStorage.setItem("id", JSON.stringify(res.data.staff._id));
        if (auth.isAuthenticated() !== null)
          //this.context.simple();
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
    return (
      <div className="staff-container mx-4">
        {/* <TeacherContext.Consumer>
          {(context) => console.log(context)}
        </TeacherContext.Consumer> */}
        <div className="staff-back  ">
          <Link
            className="mx-4 text-black font-semibold uppercase hover:text-black hover:no-underline tracking-wide"
            to="/"
          >
            Back
          </Link>
        </div>
        <div className="staff-login  ">
          <Form
            className="staff-form border bg-gray-200 rounded rounded-lg  hover:shadow-lg"
            onSubmit={this.submit}
          >
            <h4 className="bg-blue-500 text-gray-900 w-full p-3 rounded-lg uppercase tracking-widest mb-2">
              Login
            </h4>

            <FormGroup className="mx-8 my-4">
              <Label
                className="text-lg font-semibold text-gray-800 tracking-wider uppercase"
                for="email"
              >
                Email:
              </Label>
              <InputGroup>
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
              </InputGroup>
            </FormGroup>

            <FormGroup className="mx-8">
              <Label
                className="text-lg font-semibold text-gray-800 tracking-wider uppercase"
                for="pass"
              >
                Password:
              </Label>
              <InputGroup>
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
              </InputGroup>
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
              <Button className="m-3" type="button" color="info">
                Forgot Password
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}
