import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h2 className="text-danger"> PATH NOT FOUND!</h2>
      <Link to="/">GoHome</Link>
    </>
  );
};

export default NotFound;
