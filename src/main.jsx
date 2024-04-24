import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErrorPage from "./Error";
import Contact from "./Contact";
import { getContactLoader, getContactsLoader } from "./loader/contactsLoader";
import {
  createContactsAction,
  deleteContactAction,
  editContactActon,
  updateContactFavoriteAction,
} from "./actions/contactsAction";
import EditContact from "./Edit";
import Index from "./Index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: getContactsLoader,
    action: createContactsAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: getContactLoader,
            action: updateContactFavoriteAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: getContactLoader,
            action: editContactActon,
          },
          {
            path: "contacts/:contactId/destroy",
            action: deleteContactAction,
            //if throwing any error for this action then it catch and show errorElement error
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
