import { Route, Routes } from 'react-router'
import { Layout } from './components/Layout/Layout'
import { NotesPage } from './components/Pages/NotesPage/NotesPage'
import { NotePage } from './components/Pages/NotePage/NotePage'
import { Paths } from './constants/path'
import { CreateNote } from './components/Pages/CreateNote/CreateNote'

import "../src/components/init";
import './App.scss';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path={Paths.notes} element={<Layout />}>
          <Route index element={<NotesPage />} />
          <Route path={`${Paths.note}/:id`} element={<NotePage />} />
          <Route path={Paths.create} element={<CreateNote />} />
        </Route>
      </Routes>
    </>
  )
}
