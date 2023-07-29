import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from 'react'
import { fs } from '../../Config/Config'
import { IndividualCategory } from "../Cards/IndividualCategory";

var setting = {
  dots: false,
  infinite: false,
  arrows: false,
  slidesToShow: 12, 
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1441,
      settings: {
        slidesToShow: 10,
      }
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 8,
      }
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 6,
      }
    },
    {
      breakpoint: 598,
      settings: {
        slidesToShow: 5,
      }
    },
    {
      breakpoint: 426,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 321,
      settings: {
        slidesToShow: 3,
      }
    }
  ]
};

const MultiItemCategory = (props) => {

  // state of products
  const [category, setCategory] = useState([]);
  const categoryArray = [];
  // getting products function
  const getCategory = async () => {
    const category = await fs.collection('Category').orderBy('categorynumber', 'asc').get();

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
    <div style={{ marginTop: "16px" }} >
      {category.length > 0 && <Slider {...setting}>
        {
          category.map((individualCategory, addToCategory) => (
            <IndividualCategory key={individualCategory.ID} individualCategory={individualCategory} addToCategory={addToCategory} />
          ))
        }

      </Slider>
      }
    </div>

  );
};


export default MultiItemCategory;