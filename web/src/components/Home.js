import { useState, useEffect } from 'react';

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
  
  return <>{repos ? <>{repos[0].id}</> : <>loading</>}</>;
};

export default Home;
