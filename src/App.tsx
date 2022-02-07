import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import About from "./components/About";
import Chat from "./components/Chat";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import { initialState, reducer } from "./Reducer";
import { ActionTypes, IAction, IGlobalContext, IGlobalState } from "./Types";

export const GlobalContext = React.createContext<IGlobalContext>({
  dispatch: (action: IAction) => {},
  state: initialState,
});

function App() {
  const [state, dispatch] = useReducer<any>(reducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        dispatch: dispatch,
        state: state as IGlobalState,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <ProtectedRoute path="/chat/:id">
            <Chat />
          </ProtectedRoute>
        </Switch>
        <Footer />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;
