import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NotFound from "./NotFound";
import gip from "../img/giphy.gif";

const PersonDetail = () => {
  const [person, setPerson] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  console.log(id);

  const getPerson = () => {
    setLoading(true);
    fetch(`https://reqres.in/api/users/${id}`)
      .then((res) => {
        if (!res.ok) {
          setError(true);
          setLoading(false);
          throw new Error(`User can not be found`);
        }
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setPerson(data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getPerson();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <img src={gip} alt="" />
      </div>
    );
  } else if (error) {
    return <NotFound />;
  } else {
    return (
      <div className="container text-center mt-4">
        <img className="rounded" src={person?.avatar} alt="img" />

        <h6>
          {person?.first_name} {person?.last_name}
        </h6>
        <p>{person?.email}</p>
        <div>
          <button className="btn btn-danger" onClick={() => navigate(-1)}>
            Back
          </button>
          <button className="btn btn-success" onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      </div>
    );
  }
};

export default PersonDetail;
