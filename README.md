# Gitstats - get stats of a github user using github graphql api

### check it live at : https://gitstats-wec-gdsc.netlify.app/
### check demo video : https://drive.google.com/file/d/12i6_uLCrmLvgVUpci15CXHHYjWfnISUy/view?usp=drive_link
* **Note**⚠️ : backend is hosted at render.com for free , so it might take a while to load data or sometimes spin down due to inactivity , 😿please wait for sometime for it spin up again
* ![image](https://github.com/AahilRafiq/gdsc-github-graphql-gitstats/assets/128609469/fca36939-f525-40d7-be1a-0b493e2bb3ff)


## How to use App
* Sign in with github into the application
* Enter a Correct username for which we need to see stats
* Wait for it to display the stats

## Basic idea of how application works
* Inorder to interact with github Graphql api , a bearer token is required
* This application utilizes github's Oauth service to get the user's bearer token which will be used to make further requests to graphql api of github
* But as bearer token is sensitive and should not be exposed to frontend , the request for bearer token is made at backend
* Once token is received at backend , it is encrypted using a secret key and sent back to frontend
* Now the user send's the username for which they want to see the stats , the encrypted token is also sent back along with this
* Backend decrypts the token and uses the username received username and makes an api request to github graphql api
* Once data is received , its sent to frontend to render

### Tech stack :
  * Reactjs - Vite for frontend
  * Nodejs - express-graphql for backend
  * Frontend deployed on netlify
  * Backend deployed on render.com

  
