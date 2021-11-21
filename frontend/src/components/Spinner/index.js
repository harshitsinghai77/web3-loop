import Loader from "react-loader-spinner";

export const SpinnerComponent = () => (
  <div className="text-center mb-5 mt-5">
    <Loader type="MutatingDots" color="#00BFFF" height={80} width={80} />
  </div>
);

export const SpinnerComponentTailSpin = () => (
  <Loader type="TailSpin" color="#00BFFF" height={30} width={30} />
);
