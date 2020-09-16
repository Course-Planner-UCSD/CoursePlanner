import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css";
import { updatePlan } from "../../Redux/actions/plan";
import Alert from "@material-ui/lab/Alert";

const Notes = ({ token, planData, updatePlan, planIndex, planID }) => {
  const [data, setData] = useState({
    text: "",
  });

  useEffect(() => {
    initialState();
    closeFailedNotesAlert();
  }, [planData]);

  const initialState = () => {
    setData({ ...data, text: planData[planIndex].notes });
  };

  const textboxChange = (value) => {
    setData({ ...data, text: value });
  };

  const closeSaveNotesAlert = () => {
    document.getElementById("notesSavedAlert").style.display = "none";
  };

  const closeFailedNotesAlert = () => {
    document.getElementById("notesFailedSave").style.display = "none";
  };

  const saveNotes = async () => {
    var url = "/api/coursePlan/updatePlan/" + planID;
    const config = {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
    };

    var body = JSON.stringify({ notes: data.text });

    await axios
      .post(url, body, config)
      .catch((err) => {
        console.error(err);
        document.getElementById("notesFailedSave").style.display = "flex";
        window.setTimeout(closeFailedNotesAlert, 10000);
      })
      .then((result) => {
        updatePlan(result.data, planData, planIndex);
        document.getElementById("notesSavedAlert").style.display = "flex";
        window.setTimeout(closeSaveNotesAlert, 10000);
      });
  };

  return (
    <div>
      <Alert
        onClose={() => {
          document.getElementById("notesSavedAlert").style.display = "none";
        }}
        severity="success"
        id="notesSavedAlert"
      >
        Notes saved!
      </Alert>
      <Alert
        onClose={() => {
          document.getElementById("notesFailedSave").style.display = "none";
        }}
        severity="error"
        id="notesFailedSave"
      >
        Error: Notes were not saved.
      </Alert>
      <Card id="notes">
        <h2 className="text" id="notesText">
          Notes
        </h2>
        <ReactQuill
          value={data.text}
          className="textbox"
          onChange={textboxChange}
        />
        <Button
          variant="contained"
          color="primary"
          className="save"
          onClick={saveNotes}
          id="saveNotesButton"
        >
          Save Notes
        </Button>
      </Card>
    </div>
  );
};

Notes.propTypes = {
  token: PropTypes.string,
  updatePlan: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  planData: state.planReducer.planData,
});

export default connect(mapStateToProps, { updatePlan })(Notes);
