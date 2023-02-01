import Repo from './Repo';
import { useState, useContext } from 'react';
import { Context } from '../Context';
import ReactMarkdown from 'react-markdown';

const List = ({ repos }) => {
  const [filtered, setFiltered] = useState(repos);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const { commit, setCommit, readMe, setReadMe } = useContext(Context);
  repos.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const uniqueLanguages = [...new Set(repos.map((repo) => repo.language))].map(
    (language) => language
  );

  const filterLanguage = (language) => {
    setFiltered(repos.filter((repo) => repo.language === language));
  };

  const handleRepoClick = (repo) => {
    setSelectedRepo(repo);

    fetch(`${repo.commits_url.replace('{/sha}', '')}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        setCommit({ data: data[0].commit });
      });

    fetch(
      `https://raw.githubusercontent.com/${repo.full_name}/master/README.md`
    )
      .then((res) => {
        if (res.status === 200) {
          return res.text();
        }
      })
      .then((data) => {
        setReadMe(data);
      });
  };
  return (
    <>
      <button onClick={() => setFiltered(repos)}>Show All</button>
      {uniqueLanguages.map((language, index) => {
        return (
          <button key={index} onClick={() => filterLanguage(language)}>
            {language}
          </button>
        );
      })}

      {filtered &&
        filtered.map((repo) => {
          return <Repo key={repo.id} repo={repo} onClick={handleRepoClick} />;
        })}
      {selectedRepo && <div>selected repo</div>}
      {commit && (
        <>
          <div>{commit.data.author.name}</div>
          <div>{commit.data.author.date}</div>
          <div>{commit.data.message}</div>
        </>
      )}
      {readMe && (
        <>
          <ReactMarkdown>{readMe}</ReactMarkdown>
        </>
      )}
    </>
  );
};

export default List;
