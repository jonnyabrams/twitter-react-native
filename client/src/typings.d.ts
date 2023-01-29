export type LoginType = {
  email: string;
  password: string;
};

export type UserType = {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  name?: string;
  coverPic?: string;
  profilePic?: string;
  website?: string;
};

export type RootStackParamList = {
  Root: undefined;
  NewTweet: undefined;
  // Fleet: undefined;
  // NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Notifications: undefined;
  Messages: undefined;
};

export type HomeNavigatorParamList = {
  HomeScreen: undefined;
};

export type AuthNavigatorParamList = {
  Login: undefined;
  Register: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type UserType = {
  id: string;
  name: string;
  username: string;
  image?: string;
};

export type TweetType = {
  _id: string;
  createdAt: string;
  userId: string;
  userUsername: string;
  userName?: string;
  userImg?: string;
  content: string;
  img?: string;
  likes?: string[];
  retweets?: string[];
};

export type PostTweetType = {
  content: string;
  img?: string;
};

export type FleetType = {
  id: string;
  createdAt: string;
  user: UserType;
  type: string;
  text?: string;
  image?: string;
};
