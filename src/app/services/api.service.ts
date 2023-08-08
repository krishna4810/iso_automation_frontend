import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  ApiResponse, HiraActivity, HiraFormFields,
  LoggedInUserData,
  loginData,
  loginResponse,
  Role,
  UserData,
  UserRole
} from "../model/interfaces";
import {API_BASE_URL, API_LOGIN, AUTHENTICATION_API_BASE_URL} from "../model/constants";
import {forkJoin, map, Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {StateService} from "./state.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient, private stateService: StateService) {
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
    });
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
    this.httpClient.get<any>(`${API_BASE_URL}/getHira`).subscribe( res => {
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
