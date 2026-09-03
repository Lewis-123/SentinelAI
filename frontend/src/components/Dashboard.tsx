import RiskPrediction from "./RiskPrediction";
import RiskAnalytics from "./RiskAnalytics";
import RiskMap from "./RiskMap";


function Dashboard(){

  return (

    <div className="min-h-screen bg-gray-100 p-8">


      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          SentinelAI

        </h1>


        <p className="text-gray-600 mt-2">

          AI-powered Community Risk Intelligence Platform

        </p>


      </div>




      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="font-semibold">
            Environmental Monitoring
          </h2>


          <p className="text-3xl font-bold text-green-600 mt-3">
            Active
          </p>

        </div>




        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="font-semibold">
            AI Engine
          </h2>


          <p className="text-3xl font-bold text-blue-600 mt-3">
            Online
          </p>

        </div>




        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="font-semibold">
            Alerts
          </h2>


          <p className="text-3xl font-bold text-red-600 mt-3">
            0
          </p>

        </div>


      </div>




      <RiskAnalytics />



      <RiskMap />



      <RiskPrediction />


    </div>

  )

}


export default Dashboard;