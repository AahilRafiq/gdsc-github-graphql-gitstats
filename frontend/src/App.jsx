import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Home from "./pages/Home.jsx";
import Popup from "./components/Popup.jsx";

export default function App() {
  const [userData, setUserData] = useState(null);
  const [isTokenReceived, setIsTokenReceived] = useState(false);
  const [isDataReceived, setIsDataReceived] = useState(false);
  const [userToken, setUserToken] = useState("");

  //runs when the code from github oauth is received
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");

    if (code) {
      const reqbody = {
        url: "https://gdsc-gitstats.onrender.com/graphql",
        method: "POST",
        data: {
          query: `
            {
              userToken(code : "${code}")
            }
          `,
        },
      };

      // gets encrypted token from backend
      axios(reqbody)
        .then((res) => {
          console.log(res.data.data.userToken);
          setUserToken(res.data.data.userToken);
          setIsTokenReceived(true);
        })
        .catch((err) => {
          console.log(err);
          alert("Error Occured");
        });
    }
  }, []);

  // gets user data from backend for given username
  async function reqUserData(username, token) {
    try {
      const reqbody = {
        url: "https://gdsc-gitstats.onrender.com/graphql",
        method: "POST",
        data: {
          query: `
            {
              userQuery(clientToken:"${token}" ,username : "${username}")
            }
          `,
        },
      };
      const res = await axios(reqbody);
      const receivedData = JSON.parse(res.data.data.userQuery);

      // if user is found then set the data
      if (receivedData.data.user !== null) {
        setUserData(receivedData.data.user);
        setIsDataReceived(true);
      } else {
        alert("User not found");
      }
    } catch (err) {
      console.log(err);
      alert("Error Occured");
    }
  }

  return (
    <>
      <Popup
        isDataReceived={isDataReceived}
        isTokenReceived={isTokenReceived}
        reqUserData={reqUserData}
        userToken={userToken}
      />
      <Home userData={userData} isDataReceived={isDataReceived} />
    </>
  );
}
