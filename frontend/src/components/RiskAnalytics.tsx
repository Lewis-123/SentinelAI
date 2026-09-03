import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";


function RiskAnalytics(){


  const riskData = [

    {
      name:"Low",
      value:25
    },

    {
      name:"Medium",
      value:45
    },

    {
      name:"High",
      value:30
    }

  ];



  const environmentalData = [

    {
      month:"Jan",
      rainfall:120,
      temperature:30
    },

    {
      month:"Feb",
      rainfall:90,
      temperature:32
    },

    {
      month:"Mar",
      rainfall:60,
      temperature:35
    },

    {
      month:"Apr",
      rainfall:40,
      temperature:36
    }

  ];



  return (

    <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">



      {/* Risk Distribution */}

      <div className="bg-white rounded-xl shadow p-6">


        <h2 className="text-xl font-bold mb-5">

          Risk Distribution

        </h2>



        <ResponsiveContainer width="100%" height={300}>


          <PieChart>


            <Pie

              data={riskData}

              dataKey="value"

              nameKey="name"

              outerRadius={100}

              label

            >


              {
                riskData.map(
                  (entry,index)=>(

                    <Cell key={index}/>

                  )
                )
              }


            </Pie>


            <Tooltip />


          </PieChart>


        </ResponsiveContainer>


      </div>




      {/* Environmental Trends */}

      <div className="bg-white rounded-xl shadow p-6">


        <h2 className="text-xl font-bold mb-5">

          Environmental Trends

        </h2>



        <ResponsiveContainer width="100%" height={300}>


          <BarChart data={environmentalData}>


            <CartesianGrid strokeDasharray="3 3"/>


            <XAxis dataKey="month"/>


            <YAxis/>


            <Tooltip/>



            <Bar

              dataKey="rainfall"

              fill="#2563eb"

            />


            <Bar

              dataKey="temperature"

              fill="#dc2626"

            />


          </BarChart>


        </ResponsiveContainer>


      </div>



    </div>

  )

}


export default RiskAnalytics;