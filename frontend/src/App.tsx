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

import Register from "./pages/Register";

import Landing from "./pages/Landing";



import Dashboard from "./components/Dashboard";









export default function App(){


    return (


        <AuthProvider>


            <BrowserRouter>


                <Routes>



                    {/* Public Landing Page */}

                    <Route

                        path="/"

                        element={

                            <Landing/>

                        }

                    />





                    {/* Authentication */}

                    <Route

                        path="/login"

                        element={

                            <Login/>

                        }

                    />





                    <Route

                        path="/register"

                        element={

                            <Register/>

                        }

                    />








                    {/* Protected Dashboard */}

                    <Route

                        path="/dashboard"

                        element={


                            <ProtectedRoute>


                                <Dashboard/>


                            </ProtectedRoute>


                        }

                    />





                    {/* Fallback */}

                    <Route

                        path="*"

                        element={

                            <Landing/>

                        }

                    />



                </Routes>


            </BrowserRouter>


        </AuthProvider>


    );

}