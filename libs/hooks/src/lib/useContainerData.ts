'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useState } from 'react';
import { GenericLoadingFlags } from '@digital-wolf/types';

type KeysWithBooleanValue<T> = {
  [K in keyof T]: T[K] extends boolean | undefined ? K : never;
}[keyof T];

interface ReduceActionAddToArray<T> {
  type: 'ADD_TO_ARRAY';
  payload: { key: KeyWithArrayValue<T>; item: unknown };
}

interface ReduceActionDeleteItemFromArray<T> {
  type: 'DELETE_ITEM_FROM_ARRAY';
  payload: { key: KeyWithArrayValue<T>; idKey: string | number; idValue: string | number };
}

interface ReduceActionUpdateItemInArray<T> {
  type: 'UPDATE_ITEM_IN_ARRAY';
  payload: { key: KeyWithArrayValue<T>; idKey: string | number; idValue: string | number; value: Partial<T[KeyWithArrayValue<T>]> };
}

interface ReduceActionUpdateObject<T> {
  type: 'UPDATE_OBJECT';
  payload: { key: keyof T; value: T[keyof T] };
}

interface ReduceAction<T> {
  type: 'SET_DATA' | 'UPDATE_DATA' | 'CLEAR';
  payload?: Partial<T>;
}

interface ReduceActionToggle<T> {
  type: 'TOGGLE';
  payload: keyof T;
}

interface ReduceManipulateState<T> {
  type: 'MANIPULATE_STATE';
  callback: (state: T) => T;
}

type ReduceActions<T> =
  | ReduceAction<T>
  | ReduceActionAddToArray<T>
  | ReduceActionDeleteItemFromArray<T>
  | ReduceActionUpdateObject<T>
  | ReduceActionUpdateItemInArray<T>
  | ReduceActionToggle<T>
  | ReduceManipulateState<T>;

function containerDataReducer<T>(state: T, action: ReduceActions<T>): T {
  switch (action.type) {
    case 'MANIPULATE_STATE':
      return action.callback(state);
    case 'SET_DATA':
      return { ...(action.payload as T) };
    case 'UPDATE_DATA':
      return { ...state, ...action.payload };
    case 'UPDATE_OBJECT':
      return { ...state, [action.payload.key]: { ...state[action.payload.key], ...action.payload.value } };
    case 'ADD_TO_ARRAY': {
      const keyAdd = action.payload.key;
      const item = action.payload?.item;
      const st = state[keyAdd] as [];
      return { ...state, [keyAdd]: [...st, item] };
    }
    case 'DELETE_ITEM_FROM_ARRAY': {
      const keyDelete = action.payload.key;
      const idKey = action.payload.idKey;
      const idValue = action.payload.idValue;
      const newArray = (state[keyDelete] as []).filter((item: any) => item[idKey] !== idValue);
      return { ...state, [keyDelete]: newArray };
    }
    case 'UPDATE_ITEM_IN_ARRAY': {
      const keyUpdate = action.payload.key;
      const idKeyUpdate = action.payload.idKey;
      const idValueUpdate = action.payload.idValue;
      const newArrayUpdate = (state[keyUpdate] as []).map((item: any) => {
        if (item[idKeyUpdate] === idValueUpdate) {
          return { ...item, ...action.payload.value };
        }
        return item;
      });
      return { ...state, [keyUpdate]: newArrayUpdate };
    }
    case 'TOGGLE':
      return { ...state, [action.payload]: !state[action.payload] };
    case 'CLEAR':
      return {} as T;
    default:
      return { ...state };
  }
}

export function useContainerData<T extends object = object, L extends object = GenericLoadingFlags>(
  initState: T,
  hydrationFunctions: (() => Promise<object>)[] = [],
  { initLoading = hydrationFunctions.length > 0 }: { initLoading?: boolean } = {}
) {
  const [state, dispatch] = useReducer(containerDataReducer<T>, initState);
  const [initialLoading, setInitialLoading] = useState(initLoading);
  const [loadingFlags, setLoadingFlags] = useState<L>(hydrationFunctions.reduce((acc, curr) => ({ ...acc, [curr.name]: initLoading }), {}) as L);

  useEffect(() => {
    async function fetchAllData() {
      try {
        setInitialLoading(true);
        const requests = hydrationFunctions.map(async (fnc) => {
          if (fnc.name) setLoadingFlags((prev) => ({ ...prev, [fnc.name]: true }));
          const res = await fnc();
          if (fnc.name) setLoadingFlags((prev) => ({ ...prev, [fnc.name]: false }));
          return res;
        });
        const dataArray = await Promise.all(requests);
        const data = dataArray.reduce((acc, current) => ({ ...acc, ...current }), {});
        setState(data as T);
      } finally {
        setInitialLoading(false);
      }
    }

    if (hydrationFunctions && hydrationFunctions.length > 0) fetchAllData();
  }, []);

  function setState(payload: T) {
    dispatch({ type: 'SET_DATA', payload });
  }

  function toggle(payload: KeysWithBooleanValue<T>) {
    dispatch({ type: 'TOGGLE', payload });
  }

  function updateState(payload: Partial<T>) {
    dispatch({ type: 'UPDATE_DATA', payload });
  }

  function updateObjectInState(key: keyof T, value: T[keyof T]) {
    dispatch({ type: 'UPDATE_OBJECT', payload: { key, value } });
  }

  function addToArrayInState(key: KeyWithArrayValue<T>, payload: unknown) {
    dispatch({ type: 'ADD_TO_ARRAY', payload: { key, item: payload } });
  }

  function deleteFromArrayInState(key: KeyWithArrayValue<T>, idKey: string | number, idValue: string | number) {
    dispatch({ type: 'DELETE_ITEM_FROM_ARRAY', payload: { key, idKey, idValue } });
  }

  function updateArrayItemInState(key: KeyWithArrayValue<T>, idKey: string | number, idValue: string | number, value: Partial<T[KeyWithArrayValue<T>]>) {
    dispatch({ type: 'UPDATE_ITEM_IN_ARRAY', payload: { key, idKey, idValue, value } });
  }

  function manipulateState(callback: (state: T) => T) {
    dispatch({ type: 'MANIPULATE_STATE', callback });
  }

  function updateLoadingFlag(key: keyof L, value: boolean) {
    setLoadingFlags((oldLoadingFlags) => ({ ...oldLoadingFlags, [key]: value }));
  }

  function clearState() {
    dispatch({ type: 'CLEAR' });
  }

  return {
    state: state,
    initialLoading,
    toggle,
    setState,
    updateState,
    updateObjectInState,
    clearState,
    addToArrayInState,
    deleteFromArrayInState,
    updateArrayItemInState,
    manipulateState,
    updateLoadingFlag,
    loadingFlags: loadingFlags,
  };
}

type KeyWithArrayValue<T> = {
  [K in keyof T]: T[K] extends any[] | undefined ? K : never;
}[keyof T];
