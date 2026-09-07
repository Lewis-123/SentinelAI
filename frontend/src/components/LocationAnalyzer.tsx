import { useState } from "react";





const LOCATIONS = [

    "Nairobi",

    "Mombasa",

    "Kisumu",

    "Nakuru",

    "Eldoret",

    "Garissa",

    "Kitale",

    "Kakamega",

    "Machakos",

    "Meru",

    "Nyeri",

    "Malindi",

    "Kilifi",

    "Narok",

    "Isiolo",

    "Turkana"

];







export default function LocationAnalyzer() {


    const [location, setLocation] = useState("");

    const [suggestions, setSuggestions] = useState<string[]>([]);

    const [result, setResult] = useState<any>(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");








    function handleChange(

        value: string

    ) {


        setLocation(value);



        if (!value) {

            setSuggestions([]);

            return;

        }



        const matches = LOCATIONS.filter(

            city =>

                city

                .toLowerCase()

                .includes(

                    value.toLowerCase()

                )

        );



        setSuggestions(matches);

    }








    function selectLocation(

        city: string

    ) {


        setLocation(city);

        setSuggestions([]);

    }









    async function analyzeLocation() {


        if (!location) {

            return;

        }




        setLoading(true);

        setError("");

        setResult(null);





        try {


            const token = localStorage.getItem(

                "token"

            );



            const response = await fetch(

                `http://127.0.0.1:8000/analyze/${location}`,

                {

                    headers: {

                        Authorization:

                        `Bearer ${token}`

                    }

                }

            );





            const data = await response.json();





            if (!response.ok) {


                throw new Error(

                    data.detail ||

                    "Analysis failed"

                );

            }





            setResult(data);




        }

        catch(err:any){


            setError(

                err.message

            );


        }

        finally{


            setLoading(false);


        }


    }








    return (

        <div className="card">


            <h2>

                AI Risk Analyzer

            </h2>





            <div style={{position:"relative"}}>


                <input

                    value={location}

                    onChange={(e)=>

                        handleChange(

                            e.target.value

                        )

                    }

                    placeholder="Search Kenyan city..."

                />





                {suggestions.length > 0 && (


                    <div className="suggestions">


                        {suggestions.map(

                            city => (


                                <div

                                    key={city}

                                    className="suggestion"

                                    onClick={()=>

                                        selectLocation(

                                            city

                                        )

                                    }

                                >

                                    {city}


                                </div>


                            )

                        )}


                    </div>


                )}



            </div>







            <button

                onClick={analyzeLocation}

                disabled={loading}

            >

                {loading

                ? "Analyzing..."

                : "Analyze"}

            </button>







            {error && (

                <p className="error">

                    {error}

                </p>

            )}








            {result && (


                <div className="analysis-result">


                    <h3>

                        {result.location}

                    </h3>



                    <p>

                        County:

                        <b>

                        {" "}

                        {result.county}

                        </b>

                    </p>



                    <p>

                        Risk Level:

                        <b>

                        {" "}

                        {result.risk_level}

                        </b>

                    </p>



                    <p>

                        Risk Score:

                        <b>

                        {" "}

                        {result.risk_score}/100

                        </b>

                    </p>




                    <p>

                        Confidence:

                        <b>

                        {" "}

                        {result.confidence}%

                        </b>

                    </p>





                    <h4>

                        Environmental Indicators

                    </h4>



                    <p>

                    Temperature:

                    {" "}

                    {result.features?.temperature}

                    </p>



                    <p>

                    Rainfall:

                    {" "}

                    {result.features?.rainfall}

                    </p>



                    <p>

                    Humidity:

                    {" "}

                    {result.features?.humidity}

                    </p>



                    <p>

                    NDVI:

                    {" "}

                    {result.features?.ndvi}

                    </p>



                </div>


            )}


        </div>

    );

}