import Lottie from "lottie-react";
import loading from "@/assets/lottie/heart-beat.json"

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* <h2 className="text-6xl">L</h2> */}
      <div className="max-w-[50px]">
        <Lottie animationData={loading}></Lottie>
        <div className="flex justify-center">
          <h2 className="opacity-75 font-semibold text-white mt-4">Loading...</h2>
        </div>
      </div>
      {/* <h2 className="text-6xl">...........</h2> */}
    </div>
  );
};

export default Loading;
