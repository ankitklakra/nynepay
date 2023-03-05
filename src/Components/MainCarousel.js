import React, { Component } from "react";
import Slider from "react-slick";
import "./carousel.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import * as IoIcons from "react-icons/io";
export default class Responsive extends Component {

    render() {

        const PreviousBtn = (props) => {
            const { className, onClick } = props;
            return (
                <div className={className} onClick={onClick}>
                    <IoIcons.IoIosArrowBack className="mc-icons" />
                </div>
            );
        };
        const NextBtn = (props) => {
            const { className, onClick } = props;
            return (
                <div className={className} onClick={onClick} >
                    <IoIcons.IoIosArrowForward className="mc-icons" />
                </div>
            );
        };

        var settings = {
            prevArrow: <PreviousBtn />,
            nextArrow: <NextBtn />,
            centerMode: true,
            autoplay: true,
            autoplaySpeed: 4000,
            pauseOnHover: true,
            dots: false,
            infinite: true,
            swipeToSlide: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        dots: false,
                        arrows: true
                    }
                },
                {
                    breakpoint: 769,
                    settings: {
                        dots: true,
                        arrows: false
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        dots: true,
                        arrows: false
                    }
                }
            ]
        };
        return (
            <div className="carousel">
                <br></br>
                <Slider {...settings}>
                    <div>
                        <img
                            className="d-block w-100 "
                            src="https://i.postimg.cc/CxkpjFqB/png-20220910-164857-0000.png"
                            alt="First slide"
                        />
                    </div>
                    <div>
                        <img
                            className="d-block w-100"
                            src="https://i.postimg.cc/6QgYxqFs/perfume1.png"
                            alt="Second slide"
                        />
                    </div>
                    <div>
                        <img
                            className="d-block w-100"
                            src="https://i.postimg.cc/8czr6KXc/20220910-165107-0000.png"
                            alt="Third slide"
                        />
                    </div>
                    <div>
                        <img
                            className="d-block w-100"
                            src="https://i.postimg.cc/Gh1mVSxy/20220910-165632-0000.png"
                            alt="Fourth slide"
                        />
                    </div>

                </Slider>
                <br></br>
            </div>
        );
    }
}