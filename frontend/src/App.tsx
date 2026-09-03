import {
 BrowserRouter,
 Routes,
 Route
} from "react-router-dom";


import {
 AuthProvider
} from "./auth/AuthContext";


import Login from "./auth/Login";


import ProtectedRoute from "./auth/ProtectedRoute";


import Dashboard from "./components/Dashboard";





export default function App(){


return (

<AuthProvider>


<BrowserRouter>


<Routes>


<Route

path="/login"

element={<Login/>}

/>



<Route

path="/dashboard"

element={

<ProtectedRoute>

<Dashboard/>

</ProtectedRoute>

}

/>



</Routes>


</BrowserRouter>


</AuthProvider>


);


}