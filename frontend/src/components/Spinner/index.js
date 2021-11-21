import Loader from "react-loader-spinner";

const SpinnerComponent = () => (
  <div className="text-center mb-5 mt-5">
    <Loader type="MutatingDots" color="#00BFFF" height={80} width={80} />
  </div>
);

export default SpinnerComponent;
