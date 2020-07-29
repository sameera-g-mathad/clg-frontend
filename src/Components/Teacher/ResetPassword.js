import React, { Component } from "react";
import "./../../App.css";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import logo from "./../images/logo.png";
import logoMain from "./../images/logoMain.png";
import { Button } from "reactstrap";
class ResetPassword extends Component {
  state = {
    resetEmail: "",
    failedmsg: "",
    failed: false,
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  submit = () => {
    if (this.state.resetEmail === "")
      return this.setState({
        failedmsg: "email cannot be empty .",
        failed: true,
      });
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
          <Link
            className="mx-2 text-black font-semibold uppercase hover:text-black hover:no-underline tracking-widest"
            to="/staff-login"
          >
            Back
          </Link>
        </div>
        <div className="flex justify-center items-center mt-16">
          <div
            style={{ borderRadius: "20px" }}
            className="border-2  hover:border-blue-500 w-full mx-2 sm:mx-0 sm:w-1/3  py-2"
          >
            <span className="flex justify-center">
              <img src={logoMain} alt="nothing found" />
            </span>

            <div className="mb-16 mt-8 mx-6">
              <p className="text-blue-500 text-lg w-full pb-3 capitalize font-semibold tracking-widest mb-2">
                Enter your email :
              </p>
              <span className="flex items-center border-b-2 pb-1 hover:border-blue-500 text-gray-500 hover:text-blue-500 fill-current ">
                <MdEmail className="text-2xl" />
                <input
                  type="email"
                  className="focus:outline-none w-full ml-3 text-lg font-semibold"
                  name="resetEmail"
                  placeholder="yourmail@email.com"
                  value={this.state.resetEmail}
                  onChange={this.handleChange}
                />
              </span>
              <p
                style={{ display: this.state.failed }}
                className="capitalize font-semibold text-red-500 mt-2"
              >
                {this.state.failedmsg}
              </p>
              <span className="flex justify-end  pt-12 ">
                <Button
                  color="primary"
                  onClick={this.submit}
                  outline
                  className="uppercase tracking-wide"
                >
                  next
                </Button>
              </span>
            </div>
          </div>
        </div>

        {/* <div className="staff-login">
          <span>
            <img src={logoMain} alt="nothing found" />
          </span>
          <Form className="staff-form border">
            <p>Enter your email</p>
            <FormGroup>
              <Label>email</Label>
              <InputGroup className="px-8">
                {/* <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <MdEmail />
                  </InputGroupText>
                </InputGroupAddon> 
                <Input />
              </InputGroup>
            </FormGroup>
            <Button>next &gt;</Button>
          </Form>
        </div> */}
      </div>
    );
  }
}

export default ResetPassword;
