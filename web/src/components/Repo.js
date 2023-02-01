import { useState } from 'react';

const Repo = ({
  name,
  description,
  forksCount,
  language,
  fullName,
  commitsUrl,
}) => {
  const [commit, setCommit] = useState();
  const [readMe, setReadMe] = useState();

  const handleClick = (url, full_name) => {
    if (commit) {
      setCommit();
      setReadMe();
    } else {
      fetch(`${url.replace('{/sha}', '')}`)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          setCommit(data[0].commit);
        });

      fetch(`https://raw.githubusercontent.com/${full_name}/master/README.md`)
        .then((res) => {
          if (res.status === 200) {
            return res.text();
          }
        })
        .then((data) => {
          setReadMe(data);
        });
    }
  };

  return (
    <div>
      <button onClick={() => handleClick(commitsUrl, fullName)}>
        <span>{name}</span>
        <span>{description}</span>
        <span>{forksCount} forks</span>
        <span>Language: {language}</span>
      </button>
      {commit && (
        <>
          <div>{commit.author.name}</div>
          <div>{commit.author.date}</div>
          <div>{commit.message}</div>
        </>
      )}
      {readMe && (
        <>
          <div>{readMe}</div>
        </>
      )}
    </div>
  );
};

export default Repo;
