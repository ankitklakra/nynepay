import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import React, { useState, useEffect } from 'react'
import { fs } from '../../Config/Config'
import * as IoIcons from "react-icons/io";
import { IndividualProductCarousel } from "../Cards/IndividualProductCarousel";


const PreviousBtn = (props) => {
  console.log(props);
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <IoIcons.IoIosArrowBack style={{ color: "black", fontSize: "30px", }} />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <IoIcons.IoIosArrowForward style={{ color: "black", fontSize: "30px", }} />
    </div>
  );
};

const carouselProperties = {
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  slidesToShow:4,
  centerMode:true,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 1,
        centerMode: false,
        arrows:false
      },
    },
    {
      breakpoint: 426,
      settings: {
        slidesToShow: 1,
        centerMode: false,
        arrows:false
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        centerMode: false,
        arrows:false
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        centerMode: false,
      },
    },
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 4,
        centerMode:false,
      },
    },
  ],
};

const ElectronicsCarousel = () => {

  // state of products
  const [category, setCategory] = useState([]);

  // getting products function
  const getCategory = async () => {
    const category = await fs.collection('Electronic').get();
    const categoryArray = [];
    for (var snap of category.docs) {
      var data = snap.data();
      data.ID = snap.id;
      categoryArray.push({
        ...data
      })
      if (categoryArray.length === category.docs.length) {
        setCategory(categoryArray);
      }
    }
  }

  useEffect(() => {
    getCategory();
  }, [])


  return (
    <div style={{ margin: "30px" }} className="carousel">
      <h1>Electronic  </h1>
      <Slider {...carouselProperties}>
        {
          category.map((individualProductCarousel, addToCart) => (
            <IndividualProductCarousel key={individualProductCarousel.ID} individualProductCarousel={individualProductCarousel}
              addToCart={addToCart}
            />
          ))
        }
      </Slider>
    </div>
  );
};

export default ElectronicsCarousel;