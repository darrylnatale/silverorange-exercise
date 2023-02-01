import Repo from './Repo';
import { useState } from 'react';

const List = ({ repos }) => {
  const [filtered, setFiltered] = useState(repos);

  repos.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const uniqueLanguages = [...new Set(repos.map((repo) => repo.language))].map(
    (language) => language
  );
  console.log(uniqueLanguages);

  const filterLanguage = (language) => {
    setFiltered(repos.filter((repo) => repo.language === language));
  };

  return (
    <>
      {uniqueLanguages.map((language, index) => {
        return (
          <button key={index} onClick={() => filterLanguage(language)}>
            {language}
          </button>
        );
      })}

      {filtered ? (
        filtered.map((repo) => {
          return (
            <Repo
              key={repo.id}
              name={repo.name}
              description={repo.description}
              forksCount={repo.forks_count}
              language={repo.language}
              fullName={repo.full_name}
            />
          );
        })
      ) : (
        <>hi</>
      )}
    </>
  );
};

export default List;
