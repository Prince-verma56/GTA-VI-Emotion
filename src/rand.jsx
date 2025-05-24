import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'

function App() {
  const [showContent, setShowContent] = useState(false);

  const svgRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 1.8,
      transformOrigin: "50% 50%",
      ease: "power4.inOut",
    }).to(
      ".vi-mask-group",
      {
        scale: 10,
        duration: 2,
        transformOrigin: "50% 50%",
        opacity: 0,
        ease: "expo.inOut",
        onComplete: () => {
          // Remove the entire SVG overlay smoothly
          svgRef.current?.remove();
          setShowContent(true);
          tl.kill();
        },
      },
      "<"
    ); // Start this animation at the same time as previous ends
  });

  return (
    <>
      <div
        ref={svgRef}
        className="svg fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-black"
      >
        <svg
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
        >
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="/bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {showContent && (
        <div className="main w-full h-full">
          <div className="landing w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10]  w-full py-10 px-10 ">
              <div className="logo flex items-center gap-7 ">
                <div className="lines flex flex-col  gap-[5px]">
                  <div className="line w-15 h-2 bg-white"></div>
                  <div className="line w-8 h-2 bg-white"></div>
                  <div className="line w-5 h-2 bg-white"></div>
                </div>
                <h3 className="text-5xl -mt-[5px] text-white">Rockstar</h3>
              </div>
            </div>

            <div className="imagesdiv relative w-full h-screen">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt=""
              />

              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt=""
              />
              <img
                className="absolute -bottom-[50%] left-1/2 -translate-x-1/2 scale-[.6] "
                src="./girlbg.png"
                alt=""
              />
            </div>

            <div className="btmbar w-full text-white absolute bottom-0 left-0 z-[10] px-10 py-10 bg-gradient-to-t  from-black to-transparent">
              <div className="flex gap-4">
                <i className="ri-arrow-down-line  text-2xl"></i>
                <div className="font-[Helvetica Now Display] text-2xl ">Scroll Down</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
