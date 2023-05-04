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
  bio: string | null;
  name: string | null;
  login: string;
  email: string | null;
  node_id: string;
  avatar_url: string;
};
