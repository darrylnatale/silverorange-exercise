import { Context } from '../Context';
import { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

const RepoDetails = () => {
  const { commit, readMe } = useContext(Context);

  return (
    <>
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

export default RepoDetails;
