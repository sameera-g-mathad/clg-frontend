import React, { Component } from "react";
import { Link } from "react-router-dom";
import Particles from "react-particles-js";
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
    if (window.innerWidth < 500) this.number = 30;
    else this.number = 150;
    return (
      <div>
        <Particles
          className="bg-blue-500 "
          height={window.innerHeight}
          params={{
            particles: {
              number: {
                value: this.number,
              },

              size: {
                value: 2,
              },
              color: {
                value: ["#BD10E0", "#B8E986", "#50E3C2", "#FFD300", "#E86363"],
              },
              lineLinked: {
                enable: true,
                color: {
                  value: [
                    "#BD10E0",
                    "#B8E986",
                    "#50E3C2",
                    "#FFD300",
                    "#E86363",
                  ],
                },
              },
            },
            interactivity: {
              detect_on: "window",
              events: {
                onhover: {
                  enable: true,
                  mode: "repulse",
                },
              },
            },
          }}
        />
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
          <div className="staff-back  rounded-lg p-3 ">
            <p className=" mx-2 text-black font-semibold uppercase hover:text-black hover:no-underline tracking-widest">
              clg website
            </p>
            <Link
              className="mx-2 text-black font-semibold uppercase hover:text-black hover:no-underline tracking-widest"
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
      </div>
    );
  }
}
