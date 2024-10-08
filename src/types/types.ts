/* eslint-disable @typescript-eslint/no-explicit-any */
import { WSTransport } from './../tools/Websocket';

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

export type TCreareChatRequest = {
  title: string;
};
  
export type TUserRequest = {
  login: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  password: string;
};

export type TEditPasswordRequest = {
  oldPassword: string;
  newPassword: string;
}

export type TEditUserRequest = {
  login: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
};

export type TUpdateUserResponce = {
  login: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  id: number;
  avatar: string;
  display_name: string;
}
  
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
    reason?: string;
  };
  
  export type TChatInfo = {
    id: number;
    title: string;
    avatar: string | null;
    unread_count: number;
    created_by: number;
    last_message: TLastMessage;
    reason?: string;
  };

export type TChatInfo1 = {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  last_message: TLastMessage;
  reason?: string;
};

export type TErrorMessage = {
  reason: string
}

export type TChatResponse = TChatInfo[] | [] | TErrorMessage;

export type TDeleteCharResponce = {
  userId: number,
  result: {
    id: number,
    title: string,
    avatar: string,
    created_by: number
  }
}

export type TChatDeleteRequest = {
  chatId: number
}

export type TUserChatData = {
  chatid?: number,
  login?: string,
}

export type TSearchUserResponse = [
  {login: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  id: number;
  avatar: string;
  display_name: string;
  reason?: string;
}];

export type TTokenResponce = {
  token: string
}

export type TOtherUserType = {
  id: number;
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  avatar: string,
  role: string
}

export type TChatInfo2 = {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  last_message: TLastMessage;
  users?: TOtherUserType[]
};

export type Chats = TChatInfo2[]

export type WSConnection = {
  [key: number]: WSTransport
}

export type TDeleteUserRequest = {
  users: number[],
  chatId: number
}

export type TStore = {
    user: {
      avatar: string,
      email: string,
      first_name: string,
      id: number, 
      login: string,
      phone: string,
      second_name: string,
      display_name: string,
    },
    first_name: string,
    chats: TChatInfo2[],
    currentChat: {
      id: number,
      title: string,
      avatar: string,
      unread_count: number,
      created_by: string,
      last_message: {
        id: number,
        time: string,
        content: string,
      },
      users: TOtherUserType[]
    },
    messages: TMessage,
    registerError: TErrorMessage,
    loginError: TErrorMessage,
    getuserError: TErrorMessage,
    getchatsError: TErrorMessage,
    avatarError: TErrorMessage,
    createChatError: TErrorMessage,
    getUsersError: TErrorMessage,
};

export type TChangeChatAvatarRequest = {
  avatar: FormData;
  chatId: number;
}

export type TMessage = {
  chat_id: number,
  content: string,
  file: string,
  id: number,
  is_read: boolean,
  time: string,
  type: string,
  user_id: number,
}
