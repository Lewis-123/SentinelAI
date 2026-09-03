import { useEffect, useState } from "react";

import axios from "axios";


import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from "recharts";



interface HistoryRecord {


    id:number;

    risk_level:string;

    confidence:number;

    timestamp:string;


}



function RiskHistory(){


    const [history,setHistory] =
        useState<HistoryRecord[]>([]);



    const fetchHistory = async()=>{


        try{


            const response =
                await axios.get(
                    "http://127.0.0.1:8000/history"
                );


            setHistory(
                response.data.history
            );


        }

        catch(error){

            console.error(
                "Failed loading history",
                error
            );

        }


    };



    useEffect(()=>{


        fetchHistory();


    },[]);




    const chartData = history.map(
        (item)=>({

            date:
            new Date(
                item.timestamp
            ).toLocaleDateString(),


            confidence:
            item.confidence,


            risk:
            item.risk_level === "HIGH"
            ? 3
            :
            item.risk_level === "MEDIUM"
            ? 2
            :
            1

        })
    );




    const riskCounts = {


        LOW: history.filter(
            item=>item.risk_level==="LOW"
        ).length,


        MEDIUM: history.filter(
            item=>item.risk_level==="MEDIUM"
        ).length,


        HIGH: history.filter(
            item=>item.risk_level==="HIGH"
        ).length

    };



    const distribution = [

        {
            name:"LOW",
            value:riskCounts.LOW
        },

        {
            name:"MEDIUM",
            value:riskCounts.MEDIUM
        },

        {
            name:"HIGH",
            value:riskCounts.HIGH
        }

    ];




    return (

        <div className="bg-white rounded-xl shadow p-6 mt-10">


            <h2 className="text-2xl font-bold mb-6">

                Risk History Analytics

            </h2>



            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


                <div>


                    <h3 className="font-semibold mb-3">

                        Risk Trend

                    </h3>


                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <LineChart
                            data={chartData}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />


                            <XAxis
                                dataKey="date"
                            />


                            <YAxis/>


                            <Tooltip/>


                            <Line

                                type="monotone"

                                dataKey="risk"

                                strokeWidth={3}

                            />


                        </LineChart>


                    </ResponsiveContainer>


                </div>




                <div>


                    <h3 className="font-semibold mb-3">

                        Risk Distribution

                    </h3>


                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <BarChart
                            data={distribution}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />


                            <XAxis
                                dataKey="name"
                            />


                            <YAxis/>


                            <Tooltip/>


                            <Bar
                                dataKey="value"
                            />


                        </BarChart>


                    </ResponsiveContainer>


                </div>


            </div>



        </div>

    )

}



export default RiskHistory;