import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css";
import { updatePlan } from "../../Redux/actions/plan";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

var timeouts = [];

const Title = ({ token, planData, updatePlan, planIndex, planID }) => {
  const [data, setData] = useState({
	currentTitle: "",
    editingTitle: false,
	newTitle: "",
  });

  useEffect(() => {
    initialState();
	return function cleanup() {
	  for (var i = 0; i < timeouts.length; i++) {
	    window.clearTimeout(timeouts[i]);
      }   
    };
  }, [planData]);

  const initialState = () => {
    setData({ ...data, currentTitle: planData[planIndex].name, editingTitle: false, newTitle: "" });
  };

  const closeSaveTitleAlert = () => {
    document.getElementById("titleSavedAlert").style.display = "none";
  };

  const closeFailedTitleAlert = () => {
    document.getElementById("titleFailedSave").style.display = "none";
  };

  const startEditing = () => {
	setData({
      ...data,
	  editingTitle: true,
	  newTitle: data.currentTitle,
    });
  }

  const onChangeTitle = (e) => {
    setData({ ...data, newTitle: e.target.value });
  };

  const saveTitle = async () => {
    var url = "/api/coursePlan/updatePlan/" + planID;
    const config = {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
    };

    var body = JSON.stringify({ name: data.newTitle });

    await axios
      .post(url, body, config)
      .catch((err) => {
        console.error(err);
		document.getElementById("titleFailedSave").style.display = "flex";
        timeouts.push(window.setTimeout(closeFailedTitleAlert, 5000));
      })
      .then((result) => {
        updatePlan(result.data, planData, planIndex);
		document.getElementById("titleSavedAlert").style.display = "flex";
        timeouts.push(window.setTimeout(closeSaveTitleAlert, 5000));
		setData({
	      ...data,
		  currentTitle: data.newTitle,
		  editingTitle: false,
	    });
      });
  };

  const cancelTitle = () => {
	setData({
      ...data,
	  editingTitle: false,
    });
  }

  return (
    <div>
	  <Alert
        onClose={() => {
          document.getElementById("titleSavedAlert").style.display = "none";
        }}
        severity="success"
        id="titleSavedAlert"
      >
        Title saved!
      </Alert>
      <Alert
        onClose={() => {
          document.getElementById("titleFailedSave").style.display = "none";
        }}
        severity="error"
        id="titleFailedSave"
      >
        Error: Title was not saved.
      </Alert>
      {data.editingTitle ? 
		<div id="title">
		  <TextField
          id="titleInput"
          label=""
          variant="standard"
          value={data.newTitle}
          onChange={onChangeTitle}
          />
		  <IconButton
          onClick={saveTitle}>
            <CheckIcon />
          </IconButton>
		  <IconButton
          onClick={cancelTitle}>
            <ClearIcon />
          </IconButton></div>
		:
		<div id="title"><h1>{data.currentTitle}</h1>
		<IconButton
        onClick={startEditing}>
          <CreateIcon/>
        </IconButton></div>
	  }
    </div>
  );
};

Title.propTypes = {
  token: PropTypes.string,
  updatePlan: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  planData: state.planReducer.planData,
});

export default connect(mapStateToProps, { updatePlan })(Title);
