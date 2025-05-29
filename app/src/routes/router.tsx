import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router';
import Layout from '../pages/Layout';
import CreateUser from '../pages/usuario/criar/CreateUser';
import EditUser from '../pages/usuario/editar/EditUser';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} path='/'>
      <Route path='/usuario'>
        <Route path='criar' element={<CreateUser />} />
        <Route path=':id' element={<EditUser />} />
      </Route>
    </Route>
  )
);
