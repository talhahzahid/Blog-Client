import React from "react";
import { FaApple } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import mainbanner1 from "/public/hero_iphone16pro_avail__fnf0f9x70jiy_large.jpg";
import mainbanner from "/public/hero_iphone16_avail__euwzls69btea_large.jpg";
const App = () => {
  return (
    <div className="">

      {/* navbar */}
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
{/* main 1  */}
      <div className="relative w-full h-[90vh]">
        <img
          src={mainbanner1}
          alt="IPhone 13 Pro Max"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex justify-center mt-[3rem] text-center text-white px-4">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-shadow-lg">
              IPhone 13 Pro Max
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-shadow-lg">
              Hello, Apple Intelligence
            </h2>
            <button className="border border-[#0071e3] p-2 w-[7rem] bg-[#0071e3] m-3 rounded-2xl">
              Learn More
            </button>
            <button className="border border-[#0071e3] hover:bg-[#0071e3] p-2 w-[4rem] m-3 rounded-2xl">
              Buy
            </button>
          </div>
        </div>
      </div>
    {/* main 2 */}
      <div className="relative w-full h-[90vh]">
        <img src={mainbanner} alt="" className=" w-full h-full object-cover " />
        <div className="absolute inset-0 flex justify-center text-center mt-[3rem] text-white">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-shadow-lg">
              IPhone 12 Pro Max
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-shadow-lg">
              Hello, Apple Intelligence
            </h2>
            <button className="border border-[#0071e3] p-2 w-[7rem] bg-[#0071e3] m-3 rounded-2xl">
              Learn More
            </button>
            <button className="border border-[#0071e3] hover:bg-[#0071e3] p-2 w-[4rem] m-3 rounded-2xl">
              Buy
            </button>
          </div>
        </div>
      </div>



      
    </div>
  );
};

export default App;
