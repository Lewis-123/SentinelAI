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





import DashboardLayout from "./components/dashboard/DashboardLayout";



import Dashboard from "./components/Dashboard";

import RiskMap from "./components/RiskMap";

import RiskHistory from "./components/dashboard/RiskHistory";

import AlertPanel from "./components/dashboard/AlertPanel";









export default function App(){



    return (



        <AuthProvider>





            <BrowserRouter>





                <Routes>







                    {/* =========================
                        PUBLIC ROUTES
                    ========================== */}





                    <Route


                        path="/"


                        element={

                            <Landing/>

                        }


                    />









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















                    {/* =========================
                        PROTECTED DASHBOARD AREA
                    ========================== */}





                    <Route



                        path="/dashboard"



                        element={


                            <ProtectedRoute>


                                <DashboardLayout/>


                            </ProtectedRoute>


                        }



                    >






                        {/* Default dashboard page */}



                        <Route


                            index


                            element={

                                <Dashboard/>

                            }


                        />








                        {/* Risk Map */}



                        <Route


                            path="map"


                            element={

                                <RiskMap/>

                            }


                        />









                        {/* Prediction History */}



                        <Route


                            path="history"


                            element={

                                <RiskHistory/>

                            }


                        />









                        {/* Alerts */}



                        <Route


                            path="alerts"


                            element={

                                <AlertPanel/>

                            }


                        />






                    </Route>












                    {/* =========================
                        FALLBACK
                    ========================== */}





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