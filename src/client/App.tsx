import { Provider } from "mobx-react";
import * as React from "react";
import { createStore } from "./stores/createStore";
import Quiz from "./components/Quiz/Quiz";

const questionStore = createStore();

export const App = () => (
  <Provider {...questionStore}>
    <Quiz></Quiz>
  </Provider>
);
