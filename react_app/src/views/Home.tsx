import { Link } from "react-router-dom";
import "@/assets/styles/Home.css";

const Home = () => {
  return (
    <>
      <h2 className="fw-bold myText"> Home Page</h2>
      <Link to="/about">Go to About Page</Link>
    </>
  );
};

export default Home;
