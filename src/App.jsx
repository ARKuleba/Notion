import React from 'react';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './routes/Login';
import Register from './routes/Register';
import Notes from './routes/Notes';
import Logout from './routes/Logout';
import About from './routes/About';
import Layout from './routes/Layout';
import AddNote from './routes/AddNote';
import EditNote from './routes/EditNote';
import NoteInfo from './routes/NoteInfo';
import NotFound from './routes/NotFound';
import FirstPage from './routes/FirstPage';
import store, { persistor } from './redux';
import { PersistGate } from 'redux-persist/integration/react';

const routes = [
  {
    path: "/",
    element: <Register />,
    errorElement: <NotFound />
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />
  },
  {
    path: "/layout",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/layout",
        element: <FirstPage />,
        errorElement: <NotFound />
      },
      {
        path: "/layout/about",
        element: <About />,
        errorElement: <NotFound />
      },
      {
        path: "/layout/notes",
        element: <Notes />,
        errorElement: <NotFound />
      },
      {
        path: "/layout/logout",
        element: <Logout />,
        errorElement: <NotFound />
      },
      {
        path: "/layout/addNote",
        element: <AddNote />,
        errorElement: <NotFound />
      },
      {
        path: "/layout/editNote/:id",
        element: <EditNote />,
        errorElement: <NotFound />
      },
      {
        path: "/layout/noteInfo/:id",
        element: <NoteInfo />,
        errorElement: <NotFound />
      },
    ]
  },
];

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <RouterProvider router={router}>
              <Outlet />
          </RouterProvider>
      </PersistGate>
    </Provider>
  );
}