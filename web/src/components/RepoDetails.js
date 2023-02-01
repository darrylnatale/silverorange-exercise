import { Context } from '../Context';
import { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const RepoDetails = () => {
  const { commit, readMe, setCommit, setReadMe } = useContext(Context);

  return (
    <DetailsContainer>
      <CloseButton
        onClick={() => {
          setCommit(null);
          setReadMe(null);
        }}
      >
        X
      </CloseButton>
      {commit && (
        <>
          <div>Author: {commit.data.author.name}</div>
          <div>Last Committed: {commit.data.author.date}</div>
          <div>Commit Message: {commit.data.message}</div>
        </>
      )}
      {readMe && (
        <ReadMeContainer>
          <ReactMarkdown>{readMe}</ReactMarkdown>
        </ReadMeContainer>
      )}
    </DetailsContainer>
  );
};

export default RepoDetails;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CloseButton = styled.button`
  background-color: white;
  border: none;
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  right: 0;
  top: 0;
`;

const ReadMeContainer = styled.div`
  padding: 20px;
`;
