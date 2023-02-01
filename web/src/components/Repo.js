const Repo = ({ name, description, forksCount, language, fullName }) => {
  return (
    <div>
      {name}
      {description}
      {forksCount}
      {language}
      {fullName}
    </div>
  );
};

export default Repo;
