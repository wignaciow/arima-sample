export interface ParsedToken {
  sub?: string;
  preferred_username?: string;
  realm_access?: {
    roles?: string[];
  };
  user_code?: string;
  userCode?: string;
};

export interface AuthUser {
  id: string;
  userCode?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  roles: string[];
}


