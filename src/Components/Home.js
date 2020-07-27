import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./../App.css";
import global from "./global.mp4";
import logo from "./images/logo.png";
import triback from "./images/triangleb.jpg";
import videoback from "./images/triangler.jpg";
import deptback from "./images/triangleg.jpg";
import image1 from "./images/image1.jpg";
import image2 from "./images/image2.jpg";
import image3 from "./images/image3.jpg";
import image5 from "./images/image5.jpg";
export default class Home extends Component {
  state = {
    display: false,
  };
  render() {
    return (
      <div>
        <meta charset="utf-8" />
        <nav className=" flex justify-between items-center md:m-8 p-3 md:border-2 border-gray-700 rounded-lg ">
          <span className="flex items-center">
            <img src={logo} alt="no logo" className="w-12 h-12" />
            <span className=" mx-2 text-dark font-semibold uppercase hover:text-black hover:no-underline tracking-widest">
              gat website
            </span>
          </span>
          <div className="home-nav">
            <Link
              className="px-4 text-gray-800 font-semibold uppercase  hover:text-black hover:no-underline tracking-widest"
              to="staff-login"
            >
              Staff
            </Link>
            <Link
              className="px-4 text-gray-800 font-semibold uppercase  hover:text-black hover:no-underline tracking-widest"
              to="cordinator-login"
            >
              Cordinator
            </Link>
            <Link
              className="px-4 text-gray-800 font-semibold uppercase  hover:text-black hover:no-underline tracking-widest"
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
              <span className="uppercase font-bold text-2xl text-light tracking-widest">
                about gat &#128515;
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
              <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-pink-500 bg-gray-300  hover:text-white hover:bg-pink-500 ">
                <span className="flex justify-center font-bold  text-pink-500">
                  <img
                    src="https://img.icons8.com/dotty/80/000000/tuition.png"
                    alt="nothing found"
                  />
                </span>
                Providing Excellent Education Through High Quality, Experienced
                and Committed Faculty.
              </p>
              <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-pink-500 bg-gray-300  hover:text-white hover:bg-pink-500 ">
                <span className="flex justify-center font-bold  text-pink-500">
                  <img
                    className="my-2"
                    src="https://img.icons8.com/wired/64/000000/book-shelf.png"
                    alt="nothing found"
                  />
                </span>
                Evolving creative processes for optimal Knowledge and Skill
                Transfer.
              </p>
              <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-pink-500 bg-gray-300  hover:text-white hover:bg-pink-500 ">
                <span className="flex justify-center font-bold  text-pink-500">
                  <img
                    src="https://img.icons8.com/dotty/80/000000/student-center.png"
                    alt="nothing found"
                  />
                </span>
                Building up state-of-the-art infrastructure at par with
                International standards.
              </p>
              <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-pink-500 bg-gray-300   hover:text-white hover:bg-pink-500">
                <span className="flex justify-center font-bold  text-pink-500">
                  <img
                    className="my-2"
                    src="https://img.icons8.com/pastel-glyph/64/000000/microscope.png"
                    alt="nothing found"
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
                  <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-orange-500 bg-gray-300  hover:text-white hover:bg-orange-500 ">
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
                  <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-green-500 bg-gray-300 hover:text-white hover:bg-green-500 ">
                    Create environment conducive for continuous learning through
                    quality teaching and learning processes supported by modern
                    infrastructure.
                  </p>
                  <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-green-500 bg-gray-300 hover:text-white hover:bg-green-500 ">
                    Promote Research and Innovation through collaboration with
                    industries.
                  </p>
                  <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-green-500 bg-gray-300 hover:text-white hover:bg-green-500 ">
                    Inculcate ethical values and environmental consciousness
                    through holistic education programs.
                  </p>
                </span>
              </span>
            </div>
            <div className="my-4">
              <p className="text-center tracking-widest text-lg font-bold text-white uppercase">
                watch us here &#128521;!!
              </p>
              <span className="flex justify-center ">
                <iframe
                  className="md:ml-4"
                  width="90%"
                  height="360"
                  title="gat video"
                  src="https://www.youtube.com/embed/54PaHnh9Pg0"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </span>
            </div>
          </div>
          <div>
            <span className="flex justify-center mb-2">
              <span className="uppercase font-bold text-2xl text-light tracking-widest">
                gallery
              </span>
            </span>
            <div className="gallery">
              <div className="image m-2  ">
                <img src={image1} alt="nothing found" />
              </div>
              <div className="image m-2 ">
                <img src={image2} alt="nothing found" />
              </div>
              <div className="image m-2 ">
                <img src={image3} alt="nothing found" />
              </div>
              <div className="image m-2 ">
                <img src={image5} alt="nothing found" />
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundImage: 'url("' + deptback + '")',
              backgroundPosition: "60%",
            }}
          >
            <span className="flex justify-center py-2">
              <p className="uppercase font-bold text-2xl text-light tracking-widest">
                about ise &#128525;
              </p>
            </span>
            <span className=" flex flex-col md:flex-row justify-between">
              <span>
                <p className="text-center tracking-widest text-lg font-bold text-white uppercase py-2">
                  department vision
                </p>
                <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-indigo-500 bg-gray-300 hover:text-white hover:bg-indigo-500 ">
                  To excel in teaching and research in the field of Information
                  Science and Engineering to meet emerging challenges of
                  society.
                </p>
              </span>
              <span>
                <p className="text-center tracking-widest text-lg font-bold text-white uppercase py-2">
                  department mission
                </p>
                <span className="flex  flex-col md:flex-row justify-evenly">
                  <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-red-500 bg-gray-300  hover:text-white hover:bg-red-500">
                    To inculcate strong academic foundation in the Information
                    Technology domain for successful career and lifelong
                    learning.
                  </p>
                  <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-red-500 bg-gray-300 hover:text-white hover:bg-red-500 ">
                    To strengthen research and development activities through
                    interaction with Industry.
                  </p>
                  <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-red-500 bg-gray-300 hover:text-white hover:bg-red-500">
                    To instill professional ethics and social values with
                    concern for environment.
                  </p>
                </span>
              </span>
            </span>
            <span>
              <p className="text-center tracking-widest text-lg font-bold text-white uppercase py-3">
                Program Educational Objectives
              </p>
              <span className="about-dept">
                <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-purple-600 bg-gray-300 hover:text-white hover:bg-purple-600">
                  Identify and develop IT solutions to solve societal problems.
                </p>
                <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-purple-600 bg-gray-300  hover:text-white hover:bg-purple-600">
                  Accelerate career path or engage in entrepreneurship with
                  leadership qualities, Professional ethics, soft skills and
                  teamwork.
                </p>
                <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-purple-600 bg-gray-300 hover:text-white hover:bg-purple-600">
                  Engage in improving professional knowledge through continuing
                  education and research in engineering or management.
                </p>
              </span>
            </span>
            <span>
              <p className="text-center tracking-widest text-lg font-bold text-white uppercase py-3">
                Program Specific Outcomes
              </p>
              <span className="about-dept">
                <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-yellow-500 bg-gray-300 hover:text-white hover:bg-yellow-500">
                  Analyze, develop, debug and test application software to meet
                  specified requirements.
                </p>
                <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-yellow-500 bg-gray-300 hover:text-white hover:bg-yellow-500">
                  Understand and analyze the system architecture, organization
                  of computer communication systems.
                </p>
                <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-yellow-500 bg-gray-300 hover:text-white hover:bg-yellow-500">
                  Understand the features of System Software in Information
                  Systems.
                </p>
                <p className="font-semibold tracking-wide leading-relaxed p-2  rounded-lg mx-6 border-b-4 border-yellow-500 bg-gray-300 hover:text-white hover:bg-yellow-500">
                  Design and develop applications for Information security.
                </p>
              </span>
            </span>
          </div>
          {
            //jdsfa;l
          }
        </div>
      </div>
    );
  }
}
