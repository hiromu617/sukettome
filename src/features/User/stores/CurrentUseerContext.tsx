import React, { useContext, useState } from 'react';
import { User } from '..';

export type CurrentUserState = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const CurrentUserContext = React.createContext<CurrentUserState>({} as CurrentUserState);

export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};

type CurrentUserProviderProps = {
  children: React.ReactNode;
};

export const CurrentUserProvider: React.FC<CurrentUserProviderProps> = (props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser: currentUser, setCurrentUser: setCurrentUser }}
    >
      {props.children}
    </CurrentUserContext.Provider>
  );
};
