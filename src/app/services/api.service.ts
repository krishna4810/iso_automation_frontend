import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  ApiResponse, HiraFormFields,
  LoggedInUserData,
  loginData,
  loginResponse,
  Role,
  UserData,
  UserRole
} from "../model/interfaces";
import {API_BASE_URL, API_LOGIN, AUTHENTICATION_API_BASE_URL, STATUS} from "../model/constants";
import {forkJoin, map, Observable, throwError} from "rxjs";
import {switchMap, catchError, tap} from "rxjs/operators";
import {StateService} from "./state.service";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  status: string[] = STATUS;
  constructor(private authService: AuthService, private httpClient: HttpClient, private stateService: StateService) {
  }

  // USER API CALLS
  login(loginData: loginData): Observable<loginResponse> {
    return this.httpClient.post<loginResponse>(
      `${AUTHENTICATION_API_BASE_URL}/${API_LOGIN}`, loginData);

  }

  addUser(userName: string): Observable<ApiResponse> {
      return this.httpClient.post<ApiResponse>(
      `${API_BASE_URL}/addUser`, {user_name: userName});
  }

  getPermissions(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${API_BASE_URL}/getRoles`);
  }

  updatePermission(permissions: Role[]): Observable<ApiResponse> {
    return this.httpClient.put<ApiResponse>(`${API_BASE_URL}/updateRoles`, permissions);
  }

  checkRoles(userName: String | null): Observable<UserRole> {
    return this.httpClient.get<UserRole>(`${API_BASE_URL}/checkRoles/${userName}`);
  }

  getUserData(employeeId: number): Observable<UserData> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
    });

    return this.httpClient.get<UserData>(`${AUTHENTICATION_API_BASE_URL}/User/${employeeId}`, {
      headers: headers
    }).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }
  getLoggedInUserDataWithRoles(userName: string | null) {
    this.checkRoles(userName).pipe(
      switchMap((role: UserRole) => {
        const employeeId =userName?.match(/\d+/g)?.map(Number) ;
        // @ts-ignore
        return this.getUserData(parseInt(employeeId)).pipe(
          map((userData: UserData) => {
            return {
              role: role,
              userData: userData
            };
          })
        );
      })
    ).subscribe((combinedData: LoggedInUserData) => {
      this.stateService.loggedInUserData(combinedData);
    });
  }

  getUsers() {
    const data = this.httpClient.get<any>(`${API_BASE_URL}/getUsers`).pipe(
      switchMap((users: any[]) => {
        const getUserDataObservables = users.map((user: any) =>
          this.getUserData(user.user_name.match(/\d+/g)?.map(Number))
        );
        return forkJoin(getUserDataObservables).pipe(
          map((userDataArray: UserData[]) => {
            const combinedData = users.map((user: any, index: number) => ({
              ...user,
              ...userDataArray[index]
            }));
            return combinedData;
          })
        );
      })
    );
    data.subscribe(res => {
      this.stateService.addUser(res);
    });
  }

  addUserWithRole(user_name: string, role_id: number): Observable<any> {
    return this.httpClient.post<ApiResponse>(
      `${API_BASE_URL}/createOrUpdateUser`, {user_name: user_name, role_id: role_id});
  }

  // HIRA API CALLS

  getHira() {
    let payload: any;
    let roleStatus: string;
    this.stateService.stateChanged.subscribe(state => {
      if (state.loggedInUserData.role.id == 4) {
        roleStatus = this.status[0];
      } else if (state.loggedInUserData.role.id == 5) {
        roleStatus = this.status[1];
      } else if (state.loggedInUserData.role.id == 6) {
        roleStatus = this.status[3];
      } else if (state.loggedInUserData.role.id == 7) {
        roleStatus = this.status[4];
      } else if (state.loggedInUserData.role.id == 8) {
        roleStatus = this.status[6];
      }
      payload = {
        role_id: state.loggedInUserData.role.id,
        user_id: state.loggedInUserData.userData.UserId,
        plant: state.loggedInUserData.userData.Plant,
        department: state.loggedInUserData.userData.Department,
        division: state.loggedInUserData.userData.Division,
        status: roleStatus,
      }
    });
    this.httpClient.get<any>(`${API_BASE_URL}/getHira`, {params: payload}).subscribe( res => {
      this.stateService.addHiraList(res);
      }
    );
  }
  getDocumentNumber(payload: any): Observable<any> {
    return this.httpClient.get(`${API_BASE_URL}/getDocumentNumber`, { params: payload });
  }

  addHiraActivity(payload: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${API_BASE_URL}/addHira`, payload);
  }

  getHiraForms(): Observable<HiraFormFields[]>{
    return this.httpClient.get<HiraFormFields[]>(`${API_BASE_URL}/getHiraForms`);
  }

  removeHiraField(column: any, id: any): Observable<any>{
    let param = {column: column, id: id};
    return this.httpClient.delete(`${API_BASE_URL}/deleteField`, {params: param});
  }

  addHiraField(payload: any): Observable<any>{
    return this.httpClient.post(`${API_BASE_URL}/addNewField`, payload);
  }
}
