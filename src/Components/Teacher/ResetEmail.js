import React, { Component } from "react";
import "./../../App.css";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  FormGroup,
  Label,
} from "reactstrap";
class ResetEmail extends Component {
  render() {
    return (
      <div>
        <div className="staff-back  rounded-lg p-3 ">
          <p className=" mx-2 text-black font-semibold uppercase hover:text-black hover:no-underline tracking-widest">
            clg website
          </p>
          <Link
            className="mx-2 text-black font-semibold uppercase hover:text-black hover:no-underline tracking-widest"
            to="/staff-login"
          >
            Back
          </Link>
        </div>
        <div className="staff-login">
          <Form
            className="staff-form"
            // style={{
            //   width: "500px",
            //   height: "500px",
            //   position: "absolute",
            //   top: "50%",
            //   left: "50%",
            //   transform: `translate(-50%,-50%)`,
            // }}
          >
            <FormGroup>
              <Label>email</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <MdEmail />
                  </InputGroupText>
                </InputGroupAddon>
                <Input />
              </InputGroup>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default ResetEmail;
