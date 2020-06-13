import React, { Component } from "react";
//import {Link} from "react-router-dom"

import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Spinner,
  CustomInput,
  FormFeedback,
} from "reactstrap";
import Axios from "axios";
import "./../../App.css";
import { MdLibraryAdd, MdDelete, MdClose } from "react-icons/md";
import { FiAlertCircle } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
//import basket from "./basket.jpeg";
import { RootContext } from "./../../RContext";

export default class Teachers extends Component {
  static contextType = RootContext;
  imgurl = "";
  state = {
    details: [],
    display: true,
    tname: "",
    email: "",
    dept: "",
    search: "",
    modal: false,
    subject1_Id: "",
    subject2_Id: "",
    id: "",
    image: "",
    loading: true,
    failed: false,
    deletemodal: false,
    url: this.context.url,
    disabled: false,
  };
  arrayBufferTo64 = (buffer) => {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((element) => {
      binary += String.fromCharCode(element);
    });

    return window.btoa(binary);
  };
  async componentDidMount() {
    try {
      const res = await Axios.get(`${this.state.url}/cordinator/staff`);
      const details = res.data.StaffDetails;
      const base64Flag = "data:image/jpeg;base64,";
      let imgstr;
      const map = details.map((el) => {
        imgstr = this.arrayBufferTo64(el.photo.data.data);
        this.imgurl = base64Flag + imgstr;
        return (
          <div
            key={el._id}
            id={el.name}
            className="border-indigo-500 m-2 p-2 bg-gray-200 hover:shadow-lg border-b-4 sm:border-b-0 sm:border-l-4  rounded-lg"
          >
            {/*  */}
            <div className="staff-content mt-4">
              <img
                className=" w-32 h-32 m-2 mb-3 rounded-full shadow border-2 border-indigo-500"
                src={this.imgurl}
                alt="no"
              />
              <div className="ml-4">
                <p className="text-lg font-semibold text-gray-700 uppercase hover:underline tracking-wider">
                  Name : {el.name}
                </p>
                <p className="text-lg font-semibold text-gray-700 hover:underline tracking-wider">
                  EMAIL : {el.email}
                </p>
                <p className="text-lg font-semibold text-gray-700 uppercase hover:underline tracking-wider">
                  department : '{el.dept}'
                </p>
                <p className="text-lg font-semibold text-gray-700 uppercase hover:underline tracking-wider">
                  subject 1 : '{el.subject1}'
                </p>
                <p className="text-lg font-semibold text-gray-700 uppercase hover:underline tracking-wider">
                  subject 2 : '{el.subject2}'
                </p>
              </div>
            </div>
            <div className="staff-modify px-4 ">
              <Button
                className="mx-4"
                color="info"
                onClick={() => {
                  this.deleteDetails(el._id, el.subject1_Id, el.subject2_Id);
                  this.editClicked();
                }}
                outline
              >
                <span className="flex justify-between font-semibold text-lg items-center">
                  <AiFillEdit className="mr-1" />
                  Edit
                </span>
              </Button>
              <Button
                className="mx-4"
                color="danger"
                disabled={el.cordinator === true ? true : false}
                outline
                onClick={(e) =>
                  this.collectTeacher(el._id, el.subject1_Id, el.subject2_Id)
                }
              >
                <span className="flex justify-between font-semibold text-lg items-center">
                  <MdDelete className="mr-1" />
                  Delete
                </span>
              </Button>
            </div>
          </div>
        );
      });
      this.setState({
        details: [...map],
        loading: false,
      });
    } catch (err) {
      console.log(err.response);
    }
  }
  collectTeacher = (id, subject1_Id, subject2_Id) => {
    this.setState({
      id,
      subject1_Id,
      subject2_Id,
      deletemodal: !this.state.deletemodal,
    });
  };
  deleteTeacher = async () => {
    try {
      const id = this.state.id;
      const { subject1_Id, subject2_Id } = this.state;
      const res = await Axios.delete(`${this.state.url}/cordinator/staff`, {
        headers: { id, subject1_Id, subject2_Id },
      });
      console.log(res);
      if (res.status === 204) window.location.reload(false);
    } catch (err) {
      console.log(err.response);
    }
  };
  deleteDetails = (id, subject1_Id, subject2_Id) => {
    this.setState({
      id,
      subject1_Id,
      subject2_Id,
    });
  };
  editClicked = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  buttonClicked = () => {
    this.setState({
      display: !this.state.display,
    });
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
      const { tname: name, email, dept } = this.state;
      if (
        this.state.tname === "" ||
        this.state.email === "" ||
        this.state.dept === "" ||
        this.state.photo === ""
      )
        return this.setState({
          failed: true,
        });
      const formdata = new FormData();
      formdata.append("photo", this.state.image, this.state.image.name);
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("dept", dept);
      const res = await Axios.post(
        `${this.state.url}/cordinator/staff`,
        formdata,
        { enctype: "multipart/form-data" }
      );
      if (res.status === 201 && res.data.status === "success")
        window.location.reload(false);
    } catch (err) {
      console.log(err.response);
      if (err.response.status === 400) {
        this.setState({
          failed: true,
        });
      }
    }
  };
  searchChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  deleteSujects = async () => {
    try {
      const { id, subject1_Id, subject2_Id } = this.state;
      if (subject1_Id === undefined && subject2_Id === undefined)
        return this.props.history.push({
          pathname: `/cordinator/staff/${this.state.id}`,
          state: {
            id,
          },
        });
      const res = await Axios.patch(`${this.state.url}/cordinator/staff`, {
        headers: { id, subject1_Id, subject2_Id },
      });
      if (res.status === 200 && res.data.status === "success")
        return this.props.history.push({
          pathname: `/cordinator/staff/${this.state.id}`,
          state: {
            id,
          },
        });
    } catch (err) {
      console.log(err.response);
    }
  };
  imageChange = (e) => {
    if (e.target.files[0].size > 1024 * 1024 * 5) {
      return this.setState({
        disabled: true,
      });
    }
    this.setState({
      image: e.target.files[0],
      disabled: false,
    });
  };

  render() {
    if (this.state.loading)
      return (
        <div className="flex flex-col justify-center items-center">
          <Spinner
            color="primary"
            style={{ width: "100px", height: "100px" }}
            type="grow"
          />
          <h4 className="text-gray-500">Loading...</h4>
        </div>
      );
    return (
      <div className="m-2">
        <Alert
          className="teacherc-alert p-4 m-2 text-lg font-bold capitalize"
          color="primary"
        >
          <span className="mr-4">Add a new teacher to the Ise department.</span>
          <Button
            className=" px-4 py-2"
            style={{ display: this.state.display ? "inline-block" : "none" }}
            color="primary"
            onClick={this.buttonClicked}
          >
            <span className="flex justify-evenly items-center">
              <MdLibraryAdd className="mr-1" />
              Add
            </span>
          </Button>
        </Alert>
        <Form
          style={{ display: this.state.display ? "none" : "block" }}
          className="border m-2 rounded-lg pb-2 "
          onSubmit={this.submit}
        >
          <div className="p-4 mb-2 text-xl capitalize text-gray-800 rounded-lg font-bold bg-blue-400 border flex items-center justify-between">
            Enter Teacher Details:
            <span className="text-gray-800" onClick={this.buttonClicked}>
              <MdClose />
            </span>
          </div>
          <FormGroup className="mx-8">
            <Label for="name" className="text-lg text-secondary  font-semibold">
              Name:
            </Label>
            <Input
              className="capitalize"
              type="text"
              id="name"
              name="tname"
              value={this.state.tname}
              placeholder="Ex: Teacher"
              autoComplete="off"
              autoFocus="on"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup className="mx-8">
            <Label
              for="email"
              className="text-lg text-secondary  font-semibold"
            >
              Email:
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              placeholder="Ex: teacherMail@email.com"
              autoComplete="off"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup className="mx-8">
            <Label for="dept" className="text-lg text-secondary  font-semibold">
              Department:
            </Label>
            <Input
              type="dept"
              id="dept"
              name="dept"
              value={this.state.dept}
              maxLength={3}
              placeholder="Ex: ISE"
              autoComplete="off"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup className="mx-8">
            <Label
              for="image"
              className="text-lg text-secondary  font-semibold"
            >
              Photo:
            </Label>
            <CustomInput
              id="image"
              type="file"
              accept="image/*"
              name="image"
              onChange={this.imageChange}
            />
            <FormFeedback
              style={{ display: this.state.disabled ? "block" : "none" }}
              className="font-semibold p-1 capitalize"
              color="danger"
            >
              File size should not exceed 5Mb.
            </FormFeedback>
          </FormGroup>
          <Alert
            style={{ display: this.state.failed ? "block" : "none" }}
            className="mx-8  font-semibold capitalize"
            color="danger"
          >
            <span className="flex items-center">
              <FiAlertCircle className="mr-3" />
              Please provide valid information.
            </span>
          </Alert>
          <FormGroup className="flex justify-center">
            <Button
              disabled={this.state.disabled}
              color="primary"
              outline
              className="px-4 py-2  uppercase tracking-wide"
              type="submit"
            >
              add teacher
            </Button>
          </FormGroup>
        </Form>
        <div className="mt-4 flex  justify-center">
          <FormGroup className="border-2  border-blue-500 rounded-lg p-2 w-64 text-gray-500 flex items-center">
            <FaSearch className="mr-2 text-blue-500" />
            <input
              className="focus:outline-none"
              type="text"
              name="search"
              autoComplete="off"
              placeholder="Search"
              value={this.state.search}
              onChange={this.searchChange}
            />
          </FormGroup>
        </div>
        <div className="teacherdetails-content">
          {this.state.details.filter((staff) => {
            if (this.state.search !== "")
              return staff.props.id.startsWith(this.state.search);
            else return staff;
          })}
        </div>
        <Modal isOpen={this.state.modal} centered={true}>
          <ModalHeader className="bg-teal-600 text-white capitalize">
            are you sure?
          </ModalHeader>
          <ModalBody className="text-gray-700 font-semibold capitalize">
            if any subjects assigned before to this teacher will be deleted from
            respected teacher account ,also all the question papers will be
            deleted.
          </ModalBody>
          <ModalFooter>
            <Button
              color="info"
              className="capitalize"
              onClick={this.deleteSujects}
              outline
            >
              confirm
            </Button>
            <Button onClick={this.editClicked} className="capitalize" outline>
              cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.deletemodal} centered={true}>
          <ModalHeader className="bg-red-600 text-white capitalize">
            are you sure?
          </ModalHeader>
          <ModalBody className="text-gray-700 font-semibold capitalize">
            the teacher will be deleted from respected teacher database.
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              className="capitalize"
              onClick={this.deleteTeacher}
              outline
            >
              confirm
            </Button>
            <Button
              onClick={() =>
                this.setState({ deletemodal: !this.state.deletemodal })
              }
              className="capitalize"
              outline
            >
              cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
