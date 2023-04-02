export type FileCommitHistory = {
  sha: string;
  commit: Commit;
  node_id: string;
};

type Commit = {
  message: string;
  author: {
    name: string;
    date: string;
    email: string;
  };
};

export type GithubUser = {
  id: number;
  bio: null | string;
  name: null | string;
  login: string;
  email: null | string;
  node_id: string;
  avatar_url: string;
};
