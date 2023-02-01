const Repo = ({ repo, fullName, commitsUrl, onClick }) => {
  return (
    <div>
      <button onClick={() => onClick(repo)}>
        <span>{repo.name}</span>
        <span>{repo.description}</span>
        <span>{repo.forksCount} forks</span>
        <span>Language: {repo.language}</span>
      </button>
    </div>
  );
};

export default Repo;
