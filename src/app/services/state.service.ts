import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ObservableStore} from "@codewithdan/observable-store";
import {StoreState} from "../model/constants";
import {LoggedInUserData} from "../model/interfaces";

@Injectable({
  providedIn: 'root'
})
export class StateService extends ObservableStore<StoreState>{

  constructor() {
    const initialState = {
      users: undefined,
      creators: undefined,
      loggedInUserData: undefined,
      hiraList: undefined,
      eaiList: undefined,
      arrList: undefined,
      singleFunction: undefined
    }
    super({ trackStateHistory: true });
    this.setState(initialState, 'INIT_STATE');
  }

  addUser(userData: any[]) {
    this.setState({ users: userData }, 'ADD_USER_DATA');
  }

  addCreator(userData: any[]) {
    this.setState({ creators: userData }, 'ADD_USER_DATA');
  }

  loggedInUserData(data: LoggedInUserData) {
    this.setState({ loggedInUserData: data }, 'LOGGED_IN_USER_DATA');
  }

  addHiraList(data: any[]) {
    this.setState({hiraList: data}, 'ADD_HIRA_LIST')
  }

  addEaiList(data: any[]) {
    this.setState({eaiList: data}, 'ADD_EAI_LIST')
  }

  addArrList(data: any[]) {
    this.setState({arrList: data}, 'ADD_ARR_LIST')
  }

  addSingleFunction(data: any) {
    this.setState({singleFunction: data}, 'ADD_SINGLE_FUNCTION')
  }
}
