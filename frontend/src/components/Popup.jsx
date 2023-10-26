import "../styles/popup.css";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";

const clientid = import.meta.env.VITE_CLIENT_ID;

export default function Popup({ isDataReceived, isTokenReceived ,reqUserData , userToken , isCodeReceived }) {
  const [username, setUsername] = useState("");
  const [displayMessage, setDisplayMessage] = useState("Enter Username to see their stats");
  const [initialDisplaymsg, setInitialDisplaymsg] = useState("Sign in with Github to continue");

  useEffect(() => {
    if (isCodeReceived) {
      setInitialDisplaymsg("Please wait... this might take a while ...contacting backend server");
    }
  } , [isCodeReceived])

  // redirects to github oauth page
  async function loginWithGithub() {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${clientid}`
    );
  }

  return !isDataReceived ? (
    !isTokenReceived ? (
      <div className="popup ">
        <div className="popup-container">
          <p>{initialDisplaymsg}</p>
          <Button variant="outline-primary" onClick={() => loginWithGithub()}>
            SignIn
          </Button>{" "}
        </div>
      </div>
    ) : (
      <div className="popup">
        <div className="popup-container">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{displayMessage}</Form.Label>
              <Form.Control type="text" onChange={e => {setUsername(e.target.value)}}/>
            </Form.Group>
          </Form>
              <Button variant="outline-primary" onClick={() =>{ reqUserData(username , userToken) , setDisplayMessage("Please wait...")}}>
            Submit
            </Button>{" "}
        </div>
      </div>
    )
  ) : (
    ""
  );
}
