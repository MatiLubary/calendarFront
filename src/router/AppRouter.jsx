import React from 'react'
import { Route, Routes, Navigate} from 'react-router-dom'
import { LoginPage } from '../auth';
import { CalendaerPage } from '../calendar';

export const AppRouter = () => {


    const authStatus = 'not-authenticated';





  return (
    <Routes>
        
        {
            (authStatus === 'not-authenticated') ? <Route path='/auth/*' element={<LoginPage />}/> : <Route path='/*' element={<CalendaerPage />} />
        } 
        <Route path='/*' element={ <Navigate to='/auth/login' /> } />

    </Routes>
  )
}
