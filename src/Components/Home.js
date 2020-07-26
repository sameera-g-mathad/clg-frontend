import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./../App.css";
import global from "./global.mp4";
import logo from "./images/logo.png";
import triback from "./images/triangleb.jpg";
import videoback from "./images/triangley.jpg";
export default class Home extends Component {
  state = {
    display: false,
  };
  render() {
    return (
      <div>
        <nav className=" flex justify-between items-center md:m-8 p-3 md:border-2 rounded-lg ">
          <span className="flex items-center">
            <img src={logo} className="w-12 h-12" />
            <span className=" mx-2 text-white font-semibold uppercase hover:text-black hover:no-underline tracking-widest">
              gat website
            </span>
          </span>
          <div className="home-nav">
            <Link
              className="px-4 text-light font-semibold uppercase  hover:text-black hover:no-underline tracking-widest"
              to="staff-login"
            >
              Staff
            </Link>
            <Link
              className="px-4 text-light font-semibold uppercase  hover:text-black hover:no-underline tracking-widest"
              to="cordinator-login"
            >
              Cordinator
            </Link>
            <Link
              className="px-4 text-light font-semibold uppercase  hover:text-black hover:no-underline tracking-widest"
              to="student-login"
            >
              Student
            </Link>
          </div>
          <div className="home-half">
            <button
              className="mb-3 mx-2   pt-3"
              onClick={() => {
                this.setState({ display: !this.state.display });
              }}
            >
              <span className={`font-bold text-xl `}>
                <FaBars
                // className={`text-${this.state.color}-500`}
                />
              </span>
            </button>
          </div>
        </nav>
        <div className="md:hidden">
          <div
            className={`h-40 mx-3 mb-2 flex flex-col items-start px-3  border-2  bg-gray-200 rounded-lg shadow-sm `}
            style={{
              display: this.state.display === true ? "flex" : "none",
            }}
          >
            <div className="py-2 mt-2 ">
              <Link
                className=" text-black font-semibold uppercase  hover:text-black hover:no-underline tracking-widest"
                to="staff-login"
              >
                Staff
              </Link>
            </div>

            <div className="py-2 mt-2 ">
              <Link
                className=" text-black font-semibold uppercase  hover:text-black hover:no-underline tracking-widest"
                to="cordinator-login"
              >
                Cordinator
              </Link>
            </div>
            <div className="py-2 mt-2 ">
              <Link
                className=" text-black font-semibold uppercase  hover:text-black hover:no-underline tracking-widest"
                to="student-login"
              >
                Student
              </Link>
            </div>
          </div>
        </div>
        <div className="md:absolute  md:top-0 " style={{ zIndex: -2 }}>
          <video
            className="opacity-75  "
            width="100%"
            height="50%"
            src={global}
            autoPlay={true}
            muted={true}
            loop={true}
          />
          <div
            className="p-4  "
            style={{
              backgroundImage: 'url("' + triback + '")',
              backgroundRepeat: "no-repeat",
            }}
          >
            <span className="flex justify-center mb-2">
              <span className="uppercase font-bold text-2xl text-gray-800 tracking-widest">
                about gat
              </span>
            </span>
            <span>
              <p className="leading-loose h-64 text-gray-800 overflow-auto md:overflow-visible font-semibold tracking-wider">
                Global Academy of Technology, established in the year 2001, is
                one of the most sought-after engineering and management colleges
                in Bangalore, Karnataka. Located in a sprawling campus of 10
                acre land GAT has contemporary multi-media smart classrooms,
                modern laboratories, seminar halls, auditorium, an up to date
                library with volumes of recommended and reference books along
                with e-journals and well equipped computer centre. Students @GAT
                experience 24 x 7 high speed Wi-Fi facilities and web based CMS
                & LMS for video streaming which is an integral part of
                e-learning. GAT provides ample opportunities for various
                co-curricular and extra-curricular activities for the students.
                A large cafeteria and well maintained hostels for both boys and
                girls are available. The campus brims with more than 3500
                students and 300 experienced staff involved in effective
                Teaching and Learning Process. Fully established mentoring, peer
                learning and counseling by proctors ensure holistic development
                of all students. GAT has academic alliances with various
                industries and research organizations to provide current
                industry perspective to the students.
              </p>
            </span>
            <span className="font-bold  text-lg tracking-wider capitalize text-gray-700  ">
              GAT is committed to :
            </span>

            <div className="about-gat mt-4 ">
              <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-pink-500 bg-gray-300   ">
                <span className="flex justify-center font-bold  text-pink-500">
                  <img src="https://img.icons8.com/dotty/80/000000/tuition.png" />
                </span>
                Providing Excellent Education Through High Quality, Experienced
                and Committed Faculty.
              </p>
              <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-pink-500 bg-gray-300  ">
                <span className="flex justify-center font-bold  text-pink-500">
                  <img
                    className="my-2"
                    src="https://img.icons8.com/wired/64/000000/book-shelf.png"
                  />
                </span>
                Evolving creative processes for optimal Knowledge and Skill
                Transfer.
              </p>
              <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-pink-500 bg-gray-300  ">
                <span className="flex justify-center font-bold  text-pink-500">
                  <img src="https://img.icons8.com/dotty/80/000000/student-center.png" />
                </span>
                Building up state-of-the-art infrastructure at par with
                International standards.
              </p>
              <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-pink-500 bg-gray-300  ">
                <span className="flex justify-center font-bold  text-pink-500">
                  <img
                    className="my-2"
                    src="https://img.icons8.com/pastel-glyph/64/000000/microscope.png"
                  />
                </span>
                Creating an environment for holistic personality development and
                develop research temperament.
              </p>
            </div>
          </div>
          <div
            style={{
              backgroundImage: 'url("' + videoback + '")',
            }}
            className="about-gat2"
          >
            <div className="mt-4">
              <span>
                <p className="text-center tracking-widest text-lg font-bold text-white uppercase">
                  vision
                </p>
                <span className="about-gat">
                  <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-yellow-500 bg-gray-300  ">
                    Become a premier institution imparting quality education in
                    engineering and management to meet the changing needs of
                    society.
                  </p>
                </span>
              </span>
              <span>
                <p className="text-center tracking-widest text-lg font-bold text-white uppercase">
                  mission
                </p>
                <span className="about-gat">
                  <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-yellow-500 bg-gray-300  ">
                    Create environment conducive for continuous learning through
                    quality teaching and learning processes supported by modern
                    infrastructure.
                  </p>
                  <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-yellow-500 bg-gray-300  ">
                    Promote Research and Innovation through collaboration with
                    industries.
                  </p>
                  <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-yellow-500 bg-gray-300  ">
                    Inculcate ethical values and environmental consciousness
                    through holistic education programs.
                  </p>
                </span>
              </span>
            </div>
            <div className="my-4">
              <p className="text-center tracking-widest text-lg font-bold text-white uppercase">
                watch us here!!
              </p>
              <span className="flex justify-center ">
                <iframe
                  className="md:ml-4"
                  width="90%"
                  height="360"
                  src="https://www.youtube.com/embed/54PaHnh9Pg0"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
