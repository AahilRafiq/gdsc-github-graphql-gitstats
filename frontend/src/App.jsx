import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Home from "./pages/Home.jsx";
import Popup from "./components/Popup.jsx";

export default function App() {
  const [userData, setUserData] = useState(null);
  const [isDataReceived, setIsDataReceived] = useState(false);

  useEffect( () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");

    if (code) {
      const reqbody = {
        url: "http://localhost:5000/graphql",
        method: "POST",
        data: {
          query: `
            {
              userQuery(code : "${code}")
            }
          `,
        },
      }

      axios(reqbody).then((res) => {
        console.log(res.data.data.userQuery);
        setUserData(res.data.data.userQuery);

        setIsDataReceived(true);
      }).catch((err) => {
        console.log(err);
        alert("Error Occured")
      })
    }
  }, []);
  
  return (
    <>
      <Popup isDataReceived={isDataReceived} />
      <Home userData={JSON.parse(userData)} isDataReceived={isDataReceived}/>
    </>
  );
}
