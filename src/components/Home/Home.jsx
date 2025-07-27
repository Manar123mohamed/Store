
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import img1 from "../../assets/imgs/5e88832151b7daa99ada27d5fd677c86.jpg";
import img2 from "../../assets/imgs/1417bc192ed562b532d53bb9ca8c3c4d.jpg";
import img3 from "../../assets/imgs/05074cbeb4a4c36e080b3f1f1cf27d14.jpg";
import img4 from "../../assets/imgs/9210e6e5e4f1da2a943715809248fff5.jpg";
import card1 from "../../assets/imgs/card.jpg";
import card2 from "../../assets/imgs/card2.jpg";


import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  const sliderRef = useRef();
  const [sliderInstanceRef, slider] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 10,
    },
    created(s) {
      sliderRef.current = s;
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      sliderRef.current?.next();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="m-0">
 
  <div className="min-h-screen dark:bg-black m-0 flex items-center justify-center text-center px-4">
    <div > 
      <h1 className="text-4xl font-bold mb-4  text-green-700">Welcome to Our Online Store</h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
        Discover a wide variety of products tailored just for you. From the latest fashion trends
        to essential electronics, we bring you the best quality and unbeatable prices. Start your
        shopping journey with us today and enjoy a seamless experience.
      </p>
      <button className=" bg-green-600 px-5 py-3 rounded-2xl mt-3 text-white">
        <NavLink to="/category">Shopping Now</NavLink>
      </button>
    </div>
  </div>

    
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
  <div className="w-full aspect-square">
    <img src={img1} alt="first img" className="w-full h-full object-cover rounded hover:scale-105 transition-transform duration-300" />
  </div>
  <div className="w-full aspect-square">
    <img src={img2} alt="second img" className="w-full h-full object-cover rounded hover:scale-105 transition-transform duration-300" />
  </div>
  <div className="w-full aspect-square">
    <img src={img3} alt="third img" className="w-full h-full object-cover rounded hover:scale-105 transition-transform duration-300" />
  </div>
  <div className="w-full aspect-square">
    <img src={img4} alt="forth img" className="w-full h-full object-cover rounded hover:scale-105 transition-transform duration-300" />
  </div>
</div>


<div className="bg-white mt-20 py-10 px-4 sm:px-6 lg:px-16 dark:bg-black">
  <div className="flex flex-col lg:flex-row items-center gap-8">
    
    
    <div className="flex-1">
      <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
        Online Fashion Shopping Collage
      </h2>
      <p className="text-2xl text-green-600 mb-4">
        Premium Photo – Download this Premium
      </p>
      <ul className="list-disc pl-5 space-y-2 text-lg text-gray-700 dark:text-gray-200">
        <li>New arrivals in our summer collection</li>
        <li>Exclusive offers this week only</li>
        <li>Trending fashion accessories</li>
        <li>Up to 50% off selected items</li>
        <li>Free shipping on orders over $50</li>
      </ul>
      <NavLink to="/products">
        <button className="mt-6 px-6 py-2 text-lg font-semibold border-2 border-green-700 text-green-700 rounded dark:text-white hover:bg-green-600 hover:text-white transition duration-300">
          Go to Products
        </button>
      </NavLink>
    </div>

    
    <div className="w-full lg:w-1/2 max-w-md">
      <img
        src={card2}
        alt="Fashion Collage"
        className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"/>
    </div>
    
  </div>
</div>

  
 
</div>

  );
}
