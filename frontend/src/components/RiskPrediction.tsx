import { useState } from "react";
import axios from "axios";


interface PredictionResult {

  risk_score:number;

  risk_level:string;

  confidence:number;

  risk_drivers:string[];

}



function RiskPrediction(){


  const [formData,setFormData] = useState({

    rainfall:"",
    temperature:"",
    humidity:"",
    population:"",
    density:"",
    poverty_rate:""

  });



  const [result,setResult] =
    useState<PredictionResult | null>(null);



  const [loading,setLoading] =
    useState(false);



  const handleChange = (
    e:React.ChangeEvent<HTMLInputElement>
  )=>{


    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });


  };




  const predictRisk = async()=>{


    try{


      setLoading(true);



      const response = await axios.post(

        "http://127.0.0.1:8000/predict",

        {

          rainfall:Number(formData.rainfall),

          temperature:Number(formData.temperature),

          humidity:Number(formData.humidity),

          population:Number(formData.population),

          density:Number(formData.density),

          poverty_rate:Number(formData.poverty_rate)

        }

      );



      setResult(
        response.data
      );


    }

    catch(error){

      console.error(error);


      alert(
        "Unable to connect to SentinelAI API"
      );

    }

    finally{

      setLoading(false);

    }


  };




  return (

    <div className="bg-white rounded-xl shadow p-6 mt-10">


      <h2 className="text-2xl font-bold mb-6">

        AI Risk Prediction

      </h2>




      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


        {
          Object.keys(formData).map(
            (field)=>(

              <input

                key={field}

                name={field}

                value={
                  formData[
                    field as keyof typeof formData
                  ]
                }

                onChange={handleChange}

                placeholder={field.replace("_"," ")}

                className="border rounded-lg p-3"

              />

            )
          )
        }


      </div>




      <button

        onClick={predictRisk}

        disabled={loading}

        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"

      >

        {
          loading
          ?
          "Analyzing..."
          :
          "Predict Risk"
        }


      </button>




      {
        result &&

        <div className="mt-8 border rounded-xl p-5">


          <h3 className="text-xl font-bold">

            Prediction Result

          </h3>




          <p className="mt-3 text-3xl font-bold">

            {result.risk_level}

          </p>




          <p className="mt-3">

            Confidence:

            {" "}

            <strong>

              {result.confidence}%

            </strong>

          </p>




          <div className="mt-5">


            <h4 className="font-semibold">

              Main Risk Drivers

            </h4>



            <ul className="mt-3 list-disc ml-6">


              {
                result.risk_drivers.map(

                  (driver,index)=>(

                    <li key={index}>

                      {driver}

                    </li>

                  )

                )
              }


            </ul>


          </div>



        </div>

      }



    </div>

  )

}


export default RiskPrediction;