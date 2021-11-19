import React from "react";
// This will require to npm install axios
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Edit = () => {
  const [personName, setPersonName] = useState("");
  const [personPosition, setpersonPosition] = useState("");
  const [personLevel, setPersonLevel] = useState("");
  const navigate = useNavigate();

  const id = useParams().id;

  useEffect(() => {
    axios
      .get("http://localhost:5000/record/" + id)
      .then((response) => {
        const data = response.data;
        setPersonName(data.person_name);
        setPersonLevel(data.person_level);
        setpersonPosition(data.person_position);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  // These methods will update the state properties.
  const onChangePersonName = (e) => setPersonName(e.target.value);
  const onChangePersonPosition = (e) => setpersonPosition(e.target.value);
  const onChangePersonLevel = (e) => setPersonLevel(e.target.value);

  // This function will handle the submission.
  const onSubmit = (e) => {
    e.preventDefault();
    const newEditedperson = {
      person_name: personName,
      person_position: personPosition,
      person_level: personLevel,
    };
    console.log(newEditedperson);

    // This will send a post request to update the data in the database.
    axios
      .post("http://localhost:5000/update/" + id, newEditedperson)
      .then((res) => console.log(res.data));

    navigate("/");
  };

  return (
    <div>
      <h3 align="center">Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Person's Name: </label>
          <input
            type="text"
            className="form-control"
            value={personName}
            onChange={onChangePersonName}
          />
        </div>
        <div className="form-group">
          <label>Position: </label>
          <input
            type="text"
            className="form-control"
            value={personPosition}
            onChange={onChangePersonPosition}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityLow"
              value="Intern"
              checked={personLevel === "Intern"}
              onChange={onChangePersonLevel}
            />
            <label className="form-check-label">Intern</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityMedium"
              value="Junior"
              checked={personLevel === "Junior"}
              onChange={onChangePersonLevel}
            />
            <label className="form-check-label">Junior</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityHigh"
              value="Senior"
              checked={personLevel === "Senior"}
              onChange={onChangePersonLevel}
            />
            <label className="form-check-label">Senior</label>
          </div>
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
