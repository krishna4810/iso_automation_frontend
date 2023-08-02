import {FunctionRanking, LoggedInUserData, sideNav} from "./interfaces";

// export const AUTH_TOKEN: string | null =
export const API_KEY: string = "api_key=%2Fapi%2FUser%2FAuthenticate";
export const PRIMARY_COLOR: string = '#089046';
export const API_BASE_URL: string = "http://127.0.0.1:8000/api";
export const AUTHENTICATION_API_BASE_URL: string = "https://api.drukgreen.bt/api";
export const API_LOGIN: string = "User/Authenticate";

export const ROUTINE_ACTIVITY: any[] = [
  {
    name: "Routine Activity"
  },
  {
    name: "Non-Routine Activity"
  }
]
export const FUNCTION_RATING_DETAILS: FunctionRanking[] = [
  {
    name: 'High',
    value: 3
  },
  {
    name: 'Medium',
    value: 2
  },
  {
    name: 'Low',
    value: 1
  }

]


export const NAV_ITEMS: sideNav[] = [
  {
    id: 0,
    name: "Dashboard",
    link: '/home/dashboard',
    icon: 'dashboard',
    permission: 'dashboard'
  },
  {
    id: 1,
    name: "Master Data",
    link: '/home/masterData',
    icon: 'business',
    permission: 'master_data'
  },
  {
    id: 2,
    name: "Function Details",
    icon: 'grain',
    link: '/home/functionalDetails',
    permission: 'view_function'
  },
  {
    id: 3,
    name: "Creators",
    icon: 'person_add',
    permission: 'create_creators'
  },
  {
    id: 4,
    name: "Forms",
    icon: 'library_books',
    link: '/home/forms',
    permission: 'make_forms'
  },
  // {
  //   id: 5,
  //   name: "Workflow",
  //   icon: 'timeline',
  //   permission: 'change_workflow'
  // },
]

export interface StoreState {
  users: any[];
  loggedInUserData: LoggedInUserData;
  hiraList: any[]
}
