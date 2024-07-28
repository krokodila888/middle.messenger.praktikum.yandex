export type TSigninResponse = {
  reason?: string;
} | string;

export type TSignupResponse = {
  id?: number;
  reason?: string;
};
  
export type TSigninRequest = {
  login: string;
  password: string;
};
  
  export type TUserRequest = {
    login: string;
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
    password: string;
  };
  
  export type TChatUserData = {
    login: string;
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
    avatar: string | null
  };
  
  export type TLastMessage = {
    user: TChatUserData,
    time: string,
    content: string
  }
  
  export type TUserDataResponce = {
    login: string;
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
    password: string;
  } | {
    reason?: string;
  };
  
  export type TChatInfo = {
    id: number,
    title: string,
    avatar: string | null,
    unread_count: number,
    created_by: number,
    last_message: TLastMessage
  } | {
    reason?: string;
  };