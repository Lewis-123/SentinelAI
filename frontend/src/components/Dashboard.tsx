import RiskPrediction from "./RiskPrediction";

import RiskAnalytics from "./RiskAnalytics";

import RiskMap from "./RiskMap";

import Alerts from "./Alerts";

import RiskHistory from "./RiskHistory";

import LocationAnalyzer from "./LocationAnalyzer";



function Dashboard() {


    return (

        <div className="min-h-screen bg-gray-100 p-8">


            {/* Header */}

            <div className="mb-8">


                <h1 className="text-4xl font-bold text-gray-900">

                    SentinelAI

                </h1>


                <p className="text-gray-600 mt-2">

                    AI-powered Community Risk Intelligence Platform

                </p>


            </div>





            {/* System Status Cards */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">



                <div className="bg-white rounded-xl shadow p-6">


                    <h2 className="font-semibold text-gray-700">

                        Environmental Monitoring

                    </h2>


                    <p className="text-3xl font-bold text-green-600 mt-3">

                        Active

                    </p>


                    <p className="text-sm text-gray-500 mt-2">

                        Weather and climate data connected

                    </p>


                </div>





                <div className="bg-white rounded-xl shadow p-6">


                    <h2 className="font-semibold text-gray-700">

                        AI Risk Engine

                    </h2>


                    <p className="text-3xl font-bold text-blue-600 mt-3">

                        Online

                    </p>


                    <p className="text-sm text-gray-500 mt-2">

                        Machine learning model operational

                    </p>


                </div>





                <div className="bg-white rounded-xl shadow p-6">


                    <h2 className="font-semibold text-gray-700">

                        Alert System

                    </h2>


                    <p className="text-3xl font-bold text-red-600 mt-3">

                        Active

                    </p>


                    <p className="text-sm text-gray-500 mt-2">

                        Monitoring community risks

                    </p>


                </div>


            </div>





            {/* Analytics Section */}

            <RiskAnalytics />





            {/* Geographic Intelligence */}

            <RiskMap />





            {/* Historical Analysis */}

            <RiskHistory />





            {/* Alert Center */}

            <Alerts />





            {/* Automated Location Analysis */}

            <LocationAnalyzer />





            {/* Manual Feature Prediction */}

            <RiskPrediction />



        </div>

    );

}



export default Dashboard;