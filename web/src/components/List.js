import Repo from './Repo';
import { useState, useContext } from 'react';
import { Context } from '../Context';
import RepoDetails from './RepoDetails';
import styled from 'styled-components';

const List = ({ repos }) => {
  const [filtered, setFiltered] = useState(repos);

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
    fetch(`${repo.commits_url.replace('{/sha}', '')}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          setCommit();
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
      <FilterButtonContainer>
        <FilterButton onClick={() => setFiltered(repos)}>Show All</FilterButton>
        {uniqueLanguages.map((language, index) => {
          return (
            <FilterButton key={index} onClick={() => filterLanguage(language)}>
              {language}
            </FilterButton>
          );
        })}
      </FilterButtonContainer>
      <Container>
        <ReposContainer>
          {filtered &&
            filtered.map((repo) => {
              return (
                <Repo key={repo.id} repo={repo} onClick={handleRepoClick} />
              );
            })}
        </ReposContainer>
        {(commit || readMe) && (
          <RepoDetailsContainer>
            <RepoDetails />
          </RepoDetailsContainer>
        )}
      </Container>
    </>
  );
};

export default List;

const FilterButtonContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  width: 45%;
`;

const FilterButton = styled.button`
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;

  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const ReposContainer = styled.div`
  border-radius: 10px;
  width: 45%;
  padding: 10px;
`;

const RepoDetailsContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  margin-left: 20px;
  width: 45%;
  padding: 25px;
`;
