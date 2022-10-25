import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import CalendarApp from "./CalendarApp";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <CalendarApp />
  </StrictMode>
);
