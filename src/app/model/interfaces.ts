export interface loginData {
  UserName: string,
  Password: string
}

export interface loginResponse {
  AuthToken: string
  IsAuthenticated: boolean
}

export interface sideNav {
  id: number,
  name: string,
  link?: string,
  icon: string
  permission: string
}

export interface ApiResponse {
  message:string
}

export interface UserRole{
  [key: string]: number | string;
  user_name: string;
  id: number;
  role_name: string;
  add_user: number;
  master_data: number;
  make_forms: number;
  change_workflow: number;
  can_comment: number;
  generate_report: number;
  create_function: number;
  view_function: number;
  edit_function: number;
  create_creators: number;
  can_approve: number;
  view_report: number;
}

export interface Role {
  id: number;
  role_name: string;
  add_user: number;
  update_master_data: number;
  make_forms: number;
  change_workflow: number;
  can_comment: number;
  generate_report: number;
  create_function: number;
  view_function: number;
  edit_function: number;
  create_creators: number;
  can_approve: number;
  view_report: number;
  created_at: string;
  updated_at: string;
}

export interface UserData {
  UserId: number;
  Name: string;
  Email: string;
  Designation: string;
  Department: string;
  Plant: string;
  Unit: string;
  Division: string;
  Grade: string;
  Mobile: string | null;
  OfficePhone: string | null;
  IPPhone: string | null;
  UserName: string;
}

export interface FunctionRanking {
  name: string;
  value: number;
}

export interface LoggedInUserData {
  role: UserRole;
  userData: UserData;
}

export interface DocumentNumber {
  year?: string,
  unit?: string,
  department?: string,
  plant?: string
}

export interface HiraActivity {
  activityName?: string;
  address?: string;
  date?: string;
  department?: string;
  docNumber?: string;
  g_impact?: number;
  g_likelihood?: number;
  g_ranking?: string;
  hazard?: string;
  plant?: string;
  startDate?: Date;
  subActivityName?: string;
  unit?: string;
}

export interface HiraFormFields {
  id?: number,
  name: string,
  column_value: string,
  category: number
}



