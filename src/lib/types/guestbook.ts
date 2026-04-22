export type Guestbook = {
  id: string;
  text: string;
  name: string;
  email: string;
  image: string;
  username: string;
  createdAt: Date;
};

export type Text = Guestbook['text'];
