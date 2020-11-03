import React, { useState } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Row, Button, Alert,Container } from "react-bootstrap"

import { useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

import {db} from "../firebase";

export default function TagSelection() {
  const [prefs, setPrefs] = useState([]);
  const [error, setError] = useState("")
  const history = useHistory()

  const { currentUser } = useAuth();

  const handleFormat = (event, newPrefs) => {
    setPrefs(newPrefs);
  };

  const addUserPreference = async (e) => {
    if(prefs.length === 0) {
      return alert("at least one selection is required");}
    else {
      try{
        setError("");
        // eslint-disable-next-line no-unused-vars
        const insertPrefs = await(db.collection('userpref').doc(currentUser.email).set({"pref": prefs}))
        localStorage.setItem("Janus-tags",[...prefs]);
        history.push("/NewsFeed")
      } catch (error) {
        setError("Failed to connect to database");
      } finally{
      e.currentTarget.disabled = false;
      }
    }
  }


  return (
    <><Container
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "100vh" }}
  >
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Row>
    {error && <Alert variant="danger">{error}</Alert>}
    <ToggleButtonGroup value={prefs} onChange={handleFormat}>
      <ToggleButton value="US Elections">US Elections</ToggleButton>
      <ToggleButton value="Health">Health</ToggleButton>
      <ToggleButton value="Business">Business</ToggleButton>
      <ToggleButton value="Science">Science</ToggleButton>
      <ToggleButton value="Tech">Tech</ToggleButton>
      <ToggleButton value="World News">World News</ToggleButton>
    </ToggleButtonGroup></Row>
    <Row><div className="text-center mb-4">Personalize your feed to continue</div></Row>
      <Row><Button block="true" size="lg" variant="primary" onClick={addUserPreference}>Confirm</Button></Row>
      </div></Container>
</>

  );
}
