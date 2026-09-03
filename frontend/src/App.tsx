import {

    BrowserRouter,

    Routes,

    Route

} from "react-router-dom";



import {

    AuthProvider

} from "./auth/AuthContext";



import ProtectedRoute from "./auth/ProtectedRoute";

import Login from "./auth/Login";



import Landing from "./pages/Landing";

import Register from "./pages/Register";



import Dashboard from "./components/Dashboard";







export default function App(){


    return (


        <AuthProvider>


            <BrowserRouter>


                <Routes>


                    <Route

                        path="/"

                        element={<Landing/>}

                    />




                    <Route

                        path="/login"

                        element={<Login/>}

                    />




                    <Route

                        path="/register"

                        element={<Register/>}

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