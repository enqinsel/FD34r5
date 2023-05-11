import React, { useState, useEffect } from "react";
import book1 from "../assets/images/carouselImg.svg";
function Carousel() {
  const [slideIndex, setSlideIndex] = useState(1);

  function currentSlide(n) {
    setSlideIndex(n);
  }

  useEffect(() => {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    // Varsayılan olarak sadece ilk resmi göster
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";

    // Varsayılan olarak sadece ilk noktayı seçili yap
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[slideIndex - 1].className += " active";
  });

  useEffect(() => {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    // Tüm resimleri gizle
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    // Seçilen resmi göster
    slides[slideIndex - 1].style.display = "block";

    // Seçilen noktayı seçili yap
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[slideIndex - 1].className += " active";
  }, [slideIndex]);

  return (
    <div className="slideshow-container w-3/4 ">
      <div className="mySlides fade relative">
        <img src={book1} alt="Nature" style={{ width: "100%" }} />
      </div>
      <div className="mySlides fade">
        <img src={book1} alt="Snow" style={{ width: "100%" }} />
      </div>
      <div className="mySlides fade">
        <img src={book1} alt="Mountains" style={{ width: "100%" }} />
      </div>

      <div style={{ textAlign: "center" }} className="mt-2">
        <span className="dot" onClick={() => currentSlide(1)} ></span>
        <span className="dot" onClick={() => currentSlide(2)}></span>
        <span className="dot" onClick={() => currentSlide(3)}></span>
      </div>
    </div>
  );
}



export default Carousel;
