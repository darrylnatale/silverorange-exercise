import { useState, useEffect } from 'react';
import List from './List';

const Home = () => {
  const [repos, setRepos] = useState();

  useEffect(() => {
    fetch('http://localhost:4000/repos')
      .then((res) => res.json())
      .then((data) => {
        setRepos(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {repos ? (
        <>
          <List repos={repos} />
        </>
      ) : (
        <>loading</>
      )}
    </>
  );
};

export default Home;
