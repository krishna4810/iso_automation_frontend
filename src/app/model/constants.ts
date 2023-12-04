import {FunctionRanking, HiraActivity, LoggedInUserData, sideNav, Status} from "./interfaces";

// export const AUTH_TOKEN: string | null =
export const API_KEY: string = "api_key=%2Fapi%2FUser%2FAuthenticate";
export const PRIMARY_COLOR: string = '#089046';
export const API_BASE_URL: string = "http://127.0.0.1:8000/api";
export const AUTHENTICATION_API_BASE_URL: string = "https://api.drukgreen.bt/api";
export const API_LOGIN: string = "User/Authenticate";

export const STATUS: string[] = [
  'Awaiting IMS Focal\'s Approval',
  'Requested Changes by IMS Focal',
  'Awaiting Reviewer\'s Approval',
  'Requested Changes by Reviewer',
  'Awaiting QCAD Approval',
  'Requested Changes by QCAD',
  'Pre-Activity Details Accepted',
  'Approved',
]
export const ROUTINE_ACTIVITY: any[] = [
  {
    name: "Routine Activity"
  },
  {
    name: "Non-Routine Activity"
  }
]
export const HIRA_LIKELIHOOD: FunctionRanking[] = [
  {
    name: 'Low: May Occur in 3 years or occurred in last 3 years',
    value: 1
  },
  {
    name: 'Medium: May Occur every year or occurred in last 1 year',
    value: 2
  },
  {
    name: 'High: Multiple occurrences per year or occurred multiple times in last 1 year',
    value: 3
  }
]

export const HIRA_IMPACT: FunctionRanking[] = [
  {
    name: 'Low: First aid or medical aid required or near miss',
    value: 1
  },
  {
    name: 'Medium: Loss of working days or partial permanent disability',
    value: 2
  },
  {
    name: 'High: Permanent disability or fatality',
    value: 3
  }
]

export const EAI_LIKELIHOOD: FunctionRanking[] = [
  {
    name: 'Low: Impact not expected but could still occur',
    value: 1
  },
  {
    name: 'Medium: Impact can occur at regular intervals more than once a year',
    value: 2
  },
  {
    name: 'High: Impact can occur through everyday activity',
    value: 3
  }
]

export const EAI_IMPACT: FunctionRanking[] = [
  {
    name: 'Low: Degradation air, water and soil quality',
    value: 1
  },
  {
    name: 'Medium: Consumption of natural resources',
    value: 2
  },
  {
    name: 'High: Ecological damage and human health affect',
    value: 3
  }
]

export const ARR_LIKELIHOOD: FunctionRanking[] = [
  {
    name: 'Low: Problem unlikely to occur in 3 years',
    value: 1
  },
  {
    name: 'Medium: Problem may occur every year',
    value: 2
  },
  {
    name: 'High: Multiple occurrences of problem per year',
    value: 3
  }
]

export const ARR_IMPACT: FunctionRanking[] = [
  {
    name: 'Low: Revenue loss up to Nu. 1 million',
    value: 1
  },
  {
    name: 'Medium: Revenue loss up to 10 million',
    value: 2
  },
  {
    name: 'High: Revenue loss above Nu. 10 million',
    value: 3
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
    link: '/home/creators',
    permission: 'create_creators'
  },
  // {
  //   id: 4,
  //   name: "Forms",
  //   icon: 'library_books',
  //   link: '/home/forms',
  //   permission: 'make_forms'
  // },
  // {
  //   id: 5,
  //   name: "Workflow",
  //   icon: 'timeline',
  //   permission: 'change_workflow'
  // },
]

export interface StoreState {
  users: any[];
  creators: any[];
  loggedInUserData: LoggedInUserData;
  hiraList: HiraActivity[]
  eaiList: any[]
  arrList: any[]
  singleFunction: any[]
}
