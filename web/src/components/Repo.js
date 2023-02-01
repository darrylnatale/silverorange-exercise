import styled from 'styled-components';

const Repo = ({ repo, onClick }) => {
  return (
    <div>
      <Button onClick={() => onClick(repo)}>
        <LeftSpan>{repo.name}</LeftSpan>
        <LeftSpan>{repo.language}</LeftSpan>
        <LeftSpan>{repo.description}</LeftSpan>
        <RightSpan>
          {repo.forks_count} fork{repo.forks_count > 1 && 's'}
        </RightSpan>
      </Button>
    </div>
  );
};

export default Repo;

const Button = styled.button`
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  margin: 10px;
  padding: 10px 20px;
  width: 100%;
`;

const LeftSpan = styled.span`
  flex-basis: 33.33%;
  text-align: left;
`;

const RightSpan = styled.span`
  flex-basis: 33.33%;
  text-align: right;
`;
