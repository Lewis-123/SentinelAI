import { useState } from "react";
import axios from "axios";


function RiskPrediction(){


    const [formData, setFormData] = useState({

        rainfall: "",
        temperature: "",
        humidity: "",
        population: "",
        density: "",
        poverty_rate: ""

    });



    const [result, setResult] = useState("");



    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {


        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });


    };



    const predictRisk = async () => {


        try {


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
                response.data.risk_level
            );


        }

        catch(error){

            console.error(error);

            setResult(
                "API Connection Failed"
            );

        }


    };



    return (

        <div className="bg-white p-6 rounded-xl shadow mt-8">


            <h2 className="text-2xl font-bold mb-5">
                AI Risk Prediction
            </h2>



            {
            Object.keys(formData).map((field)=>(


                <input

                key={field}

                name={field}

                value={
                    formData[field as keyof typeof formData]
                }

                onChange={handleChange}

                placeholder={field}

                className="border p-3 rounded w-full mb-3"

                />


            ))

            }



            <button

            onClick={predictRisk}

            className="bg-blue-600 text-white px-6 py-3 rounded"

            >

            Predict Risk

            </button>



            {

            result &&

            <div className="mt-5 text-xl font-bold">

                Prediction:
                {" "}
                {result}

            </div>

            }


        </div>

    )

}


export default RiskPrediction;