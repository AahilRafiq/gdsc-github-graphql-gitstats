import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import '../styles/home.css'
import Alert from 'react-bootstrap/Alert';

export default function Home({ userData , isDataReceived}) {

    if(isDataReceived) {
      userData = userData.data.viewer;
    }

  return ( isDataReceived &&
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">GitStats</Navbar.Brand>
        </Container>
      </Navbar>
    <div className="main-profile-container">
      {/* User card */}
      <Card style={{ width: '16rem' }}>
      <Card.Img variant="top" src={userData.avatarUrl} />
      <Card.Body>
        <Card.Title>{userData.name}</Card.Title>
        <Card.Text>
            {userData.bio}
        </Card.Text>
        <Button variant="primary" onClick={() => {window.location.assign(userData.url)}}>Goto Profile</Button>
      </Card.Body>
    </Card>

      <div className="extra-profile-stats">
        <h5>
            Total contributions : {userData.contributionsCollection.totalCommitContributions}
        </h5>
        <h5>
            Followers : {userData.followers.totalCount} 
        </h5>
        <h5>
            Following : {userData.following.totalCount}
        </h5>
      </div>
    </div>

    {/* top repos and user repos */}
    <div className="repo-container">
        <h2>Top repositories</h2>
        <p>User's own repos and other repos he/she contributed to </p>
        {userData.topRepositories.nodes.map((repo) => (
            repo && (
                <Alert key="light" variant="light">
                    {repo.name}
                    <Button variant="primary" size="sm" className="btn-margin" onClick={()=>window.location.assign(repo.url)}>Link</Button>
                </Alert>
            )
        ))}
    </div>
    <div className="repo-container">
        <h2>Users repositories</h2>
        <p>User's repos </p>
        {userData.repositories.nodes.map((repo) => (
            repo && (
                <Alert key="light" variant="light">
                    {repo.name}
                    <Button variant="primary" size="sm" className="btn-margin" onClick={()=>window.location.assign(repo.url)}>Link</Button>
                </Alert>
            )
        ))}
    </div>

    </>
  );
}
