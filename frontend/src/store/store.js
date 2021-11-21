import { React, createContext, useReducer } from "react";
import * as types from "./types";

const initialState = {
  web3Provider: null,
  liverpeerStream: {},
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case types.SET_WEB3_PROVIDER:
        return { ...state, web3Provider: action.value };

      case types.STREAM_CREATED:
        return {
          ...state,
          liverpeerStream: {
            ...state.liverpeerStream,
            streamId: action.payload.streamId,
            playbackId: action.payload.playbackId,
            streamKey: action.payload.streamKey,
          },
        };
      case types.VIDEO_STARTED:
        return {
          ...state,
          liverpeerStream: {
            ...state.liverpeerStream,
            streamIsActive: true,
          },
        };
      case types.VIDEO_STOPPED:
        return {
          ...state,
          liverpeerStream: {
            ...state.liverpeerStream,
            streamIsActive: false,
          },
        };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
