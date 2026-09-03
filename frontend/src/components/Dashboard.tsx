import RiskPrediction from "./RiskPrediction";


function Dashboard() {

  return (

    <div className="min-h-screen bg-gray-100 p-8">


      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-900">

          SentinelAI

        </h1>


        <p className="text-gray-600 mt-2 text-lg">

          AI-powered Community Risk Intelligence Platform

        </p>

      </div>



      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">



        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-gray-600 font-semibold">

            Environmental Monitoring

          </h2>


          <p className="text-3xl font-bold mt-3 text-green-600">

            Active

          </p>


          <p className="text-sm text-gray-500 mt-2">

            Climate and environmental indicators

          </p>

        </div>




        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-gray-600 font-semibold">

            AI Predictions

          </h2>


          <p className="text-3xl font-bold mt-3 text-blue-600">

            Ready

          </p>


          <p className="text-sm text-gray-500 mt-2">

            Machine learning risk classification

          </p>

        </div>




        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-gray-600 font-semibold">

            Active Alerts

          </h2>


          <p className="text-3xl font-bold mt-3 text-red-600">

            0

          </p>


          <p className="text-sm text-gray-500 mt-2">

            Community risk notifications

          </p>

        </div>


      </div>




      {/* Prediction Section */}

      <div className="mt-10">

        <RiskPrediction />

      </div>




    </div>

  );

}


export default Dashboard;