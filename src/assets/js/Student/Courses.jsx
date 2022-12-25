import React, { useRef, useState } from "react";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { CourcesDB } from "../../../dummyData";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// install Virtual module
SwiperCore.use([Virtual, Navigation, Pagination]);

function Courses() {
  const [swiperRef, setSwiperRef] = useState(null);
  const [input, setInput] = useState();

  const appendNumber = useRef(CourcesDB.length + 1);
  // Create array with student cources slides
  const [slides, setSlides] = useState(
    CourcesDB.map((p, index) => (
      <React.Fragment>
        <div className="card">
          <img src={p.photo} alt={p.CourcesName} />
          <div className="info">
            <h5>{p.CourcesName}</h5>
            <div className="box-footer between-flex width-full">
              <p>DR : {p.CourcesTeacher}</p>
              <i class="fa-solid fa-arrow-right rd-half color-white"></i>
            </div>
          </div>
        </div>
      </React.Fragment>
    ))
  );

  const append = () => {
    setSlides([
      ...slides,
      <React.Fragment>
        <div className="card">
          <img src={require("../../img/Courses/html.png")} alt="" />
          <div className="info">
            <h5>{input}</h5>
            <div className="box-footer between-flex width-full">
              <p>DR : AHMED</p>
              <i class="fa-solid fa-arrow-right rd-half color-white"></i>
            </div>
          </div>
        </div>
      </React.Fragment>,
    ]);
  };

  const slideTo = (index) => {
    swiperRef.slideTo(index - 1, 0);
  };

  return (
    <React.Fragment>
      <div
        className="student-courses-container"
        data-aos="fade-down"
        data-aos-easing="ease-in-out"
        data-aos-duration="1000"
      >
        <h1 className="main-titel">
          <div className="div-circle"></div>
          <div className="div-circle"></div>
          <span> Student Courses</span>{" "}
        </h1>
        <div className="header between-flex">
          <input
            type="text"
            className="width-full"
            placeholder="Enter The Course ID"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <i class="fa-solid fa-plus" onClick={() => append()}></i>
        </div>
        <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            "@1.00": {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            "@1.50": {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          modules={[Pagination]}
        >
          {slides.map((slideContent, index) => (
            <SwiperSlide key={slideContent} virtualIndex={index}>
              {slideContent}
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="append-buttons">
          <button onClick={() => slideTo(1)} className="prepend-slide">
            <i class="fa-solid fa-arrow-left rd-half color-white"></i>
          </button>
          <button
            onClick={() => slideTo(CourcesDB.length)}
            className="slide-250"
          >
            <i class="fa-solid fa-arrow-right rd-half color-white"></i>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Courses;
