import {
  Action,
  ActionCreator,
  ActionCreatorsMapObject,
} from "@reduxjs/toolkit";
import { Dispatch } from "react";

const bindActionCreator =
  <A extends Action>(actionCreator: ActionCreator<A>, dispatch: Dispatch<A>) =>
  (...args: any[]) =>
    dispatch(actionCreator(...args));

export function bindActionCreators<A, M extends ActionCreatorsMapObject<A>>(
  actionCreators: M,
  dispatch: Dispatch<A>,
): M;

export function bindActionCreators(
  actionCreators: ActionCreatorsMapObject,
  dispatch: Dispatch<any>,
) {
  const boundActionCreators: ActionCreatorsMapObject = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
  }
  return boundActionCreators;
}
