import '../styles/popup.css'
import Button from 'react-bootstrap/Button';

const clientid = "8d71564a476c3c8a3833";

export default function Popup({ isDataReceived }) {

  async function loginWithGithub() {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${clientid}`
    );
  }

  return !isDataReceived ? (
    <div className='popup '>
      <div className='popup-container'>
        <p>Sign in with Github to continue</p>
        <Button variant="outline-primary" onClick={loginWithGithub}>SignIn</Button>{' '}
      </div>
    </div>
  ) : (
    ""
  );
}
