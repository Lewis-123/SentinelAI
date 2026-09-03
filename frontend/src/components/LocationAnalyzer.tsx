import { useState } from "react";



interface RiskResult {

    location: string;

    risk_level: string;

    risk_score: number;

    confidence: number;

    model_prediction?: string;


    environment?: {

        ndvi: number;

        rainfall_anomaly: number;

    };


    features?: {

        temperature: number;

        rainfall: number;

        humidity: number;

        population: number;

        density: number;

        poverty_rate: number;

        ndvi: number;

        rainfall_anomaly: number;

    };

}



export default function LocationAnalyzer() {


    const [location, setLocation] = useState("");

    const [result, setResult] = useState<RiskResult | null>(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");





    async function analyzeLocation() {


        if (!location) {

            setError(
                "Please enter a location"
            );

            return;

        }



        try {


            setLoading(true);

            setError("");



            const response = await fetch(

                `http://127.0.0.1:8000/analyze/${location}`

            );



            if (!response.ok) {


                throw new Error(
                    "Risk analysis failed"
                );

            }



            const data = await response.json();



            setResult(data);



        } catch (err) {


            setError(

                err instanceof Error

                    ? err.message

                    : "Unknown error"

            );


        } finally {


            setLoading(false);

        }

    }





    function getRiskColor(

        level: string

    ) {


        if (level === "HIGH") {

            return "red";

        }


        if (level === "MEDIUM") {

            return "orange";

        }


        return "green";

    }





    return (

        <div className="p-6 space-y-6">


            <h2 className="text-2xl font-bold">

                SentinelAI Risk Analyzer

            </h2>




            <div className="flex gap-3">


                <input

                    type="text"

                    placeholder="Enter location e.g. Nairobi"

                    value={location}

                    onChange={(e) =>
                        setLocation(e.target.value)
                    }

                    className="border rounded px-4 py-2 w-72"

                />



                <button

                    onClick={analyzeLocation}

                    className="bg-blue-600 text-white px-5 py-2 rounded"

                >

                    Analyze

                </button>



            </div>





            {loading && (

                <p>

                    Analyzing environmental risk...

                </p>

            )}






            {error && (

                <p className="text-red-600">

                    {error}

                </p>

            )}







            {result && (

                <div className="border rounded-xl p-6 space-y-5 shadow">


                    <div>


                        <h3 className="text-xl font-semibold">

                            {result.location}

                        </h3>


                        <p>

                            Risk Classification:

                            <span

                                style={{

                                    color: getRiskColor(

                                        result.risk_level

                                    ),

                                    fontWeight: "bold",

                                    marginLeft: "8px"

                                }}

                            >

                                {result.risk_level}

                            </span>

                        </p>


                    </div>






                    <div className="grid grid-cols-2 gap-5">



                        <div className="border rounded p-4">


                            <h4 className="font-semibold">

                                Risk Score

                            </h4>


                            <p className="text-3xl font-bold">

                                {result.risk_score}

                                /100

                            </p>


                        </div>





                        <div className="border rounded p-4">


                            <h4 className="font-semibold">

                                Model Confidence

                            </h4>


                            <p className="text-3xl font-bold">

                                {result.confidence}%

                            </p>


                        </div>



                    </div>








                    {result.environment && (

                        <div className="border rounded p-4">


                            <h4 className="font-semibold mb-3">

                                Environmental Indicators

                            </h4>



                            <p>

                                NDVI:

                                {" "}

                                {result.environment.ndvi}

                            </p>



                            <p>

                                Rainfall Anomaly:

                                {" "}

                                {result.environment.rainfall_anomaly}

                            </p>



                        </div>

                    )}









                    {result.features && (

                        <div className="border rounded p-4">


                            <h4 className="font-semibold mb-3">

                                Risk Drivers

                            </h4>



                            <ul className="space-y-1">


                                <li>

                                    Temperature:

                                    {" "}

                                    {result.features.temperature}°C

                                </li>


                                <li>

                                    Rainfall:

                                    {" "}

                                    {result.features.rainfall}

                                </li>



                                <li>

                                    Vegetation Health (NDVI):

                                    {" "}

                                    {result.features.ndvi}

                                </li>



                                <li>

                                    Rainfall Stress:

                                    {" "}

                                    {result.features.rainfall_anomaly}

                                </li>



                                <li>

                                    Poverty Rate:

                                    {" "}

                                    {result.features.poverty_rate}%

                                </li>



                            </ul>


                        </div>

                    )}



                </div>

            )}



        </div>

    );

}