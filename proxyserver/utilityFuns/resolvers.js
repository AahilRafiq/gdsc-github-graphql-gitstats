import { encryptMessage , decryptMessage } from "./encryptors.js";
import { reqAccessTokenBody ,graphqlQueryBody} from "./reqbodies.js";
import axios from "axios";

// Resolver logic
const root = {
    userToken: async ({ code }) => {
      try {
        // 1. Get access token from GitHub
        const response = await axios(reqAccessTokenBody(code));
        const userToken = response.data.access_token;
  
        // 2. Encrypt it and send it back to client
        return encryptMessage(userToken);
        
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    userQuery: async ({clientToken , username}) => {
        try {
            // decrypt clientToken
            const userToken = await decryptMessage(clientToken);
            const res = await axios(graphqlQueryBody(userToken , username));
            console.log(res.data);
            return JSON.stringify(res.data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};

export default root;