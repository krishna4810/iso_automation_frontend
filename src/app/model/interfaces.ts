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
  activity_name: string;
  address: string;
  completion_date: string | null;
  created_at: string;
  date: string;
  department: string;
  doc_number: string;
  creator_name: string;
  existing_control: string | null;
  gross_impact: number;
  gross_likelihood: number;
  gross_ranking: string;
  gross_ranking_value: number;
  hazard: string;
  id: string;
  plant: string;
  residual_impact: number | null;
  residual_likelihood: number | null;
  residual_ranking: string | null;
  residual_ranking_value: number | null;
  routine_activity: string | null;
  start_date: string;
  mitigation_measures: string | null;
  further_action_required: string | null;
  sub_activity_name: string;
  unit: string;
  updated_at: string;
  workers_involved: string | null;
  year: string;
  status: string;
}

export interface HiraFormFields {
  id?: number,
  name: string,
  column_value: string,
  category: number
}

export interface Status {
  value: string,
  action: string
}



