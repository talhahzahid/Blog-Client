import React from "react";
import { FaApple } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import mainbanner1 from "/public/hero_iphone16pro_avail__fnf0f9x70jiy_large.jpg";
import mainbanner from "/public/hero_iphone16_avail__euwzls69btea_large.jpg";
const App = () => {
  return (
    <div className="">
      <div className="flex justify-center gap-10 items-center p-4 bg-[#171718] text-white">
        <div>
          <h1 className="text-xl">
            <FaApple />
          </h1>
        </div>
        <div className="space-x-4">
          <p className="inline">Store</p>
          <p className="inline">Mac</p>
          <p className="inline">IPad</p>
          <p className="inline">IPone</p>
          <p className="inline">Watch</p>
          <p className="inline">Vision</p>
          <p className="inline">AirPods</p>
          <p className="inline">TV & Home</p>
          <p className="inline">Entertainment</p>
          <p className="inline">Accessories</p>
          <p className="inline">Support</p>
        </div>
        <div className="flex gap-4">
          <h1 className="text-xl font-bold">
            <IoSearchOutline />
          </h1>
          <h1 className="text-xl">
            <AiOutlineShopping />
          </h1>
        </div>
      </div>
<img src={mainbanner1} alt="" />
<img src={mainbanner} alt="" />
    </div>
  );
};

export default App;
