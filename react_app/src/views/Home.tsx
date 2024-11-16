import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h2 className="fw-bold"> Home Page</h2>
      <Link to="/about">Go to About Page</Link>
    </>
  );
};

export default Home;
