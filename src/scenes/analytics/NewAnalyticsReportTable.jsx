import React, { useState, useEffect } from "react";
import axios from "axios";

function NewAnalyticsReport({ data, selectedGraph }) {
  const [data1, setData1] = useState();
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  console.log("selectedGraph::: from new ", selectedGraph);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:3001/getSingleData";

      let data = await axios.get(url, {
        params: {
          _limit: entriesPerPage,
        },
      });
      console.log("data:::::::", data);

      if (data) {
        setData1(data.data);
        //  console.log("data1::::",data1)
      }
    };
    fetchData();
  }, [entriesPerPage]);

  console.log("data1:::", data1);

  return (
    <div className="mainClass container w-96">
      <div className=" ">
        {/* <p>ATTEMPTED ON</p>
            <p>RANK</p>
            <p>TOTAL TIME TAKEN</p>
            <p>TOTAL TIME</p>
            <p>CORRECT</p>
            <p>INCORRECT</p>
            <p>SKIPPED</p>
            <p>MARKS OBTAINED</p> */}
        {/* <p>MARKS Percentage</p> */}

        <div className="hover:bg-green-100 rounded-xl">
          {data.map((item) => {
            const dateObject = new Date(item.Date);
            const formattedDate = dateObject.toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
            return (
              <>
                {selectedGraph === "Total" && (
                  <div className="text-2xl py-3 px-6">
                    <p className="py-1">ATTEMPTED ON: {formattedDate}</p>
                    <hr />
                    <p>RANK: {item.Rank}</p>
                    <p>TOTAL TIME TAKEN: {item.TotalTimeTaken}</p>
                    <p>TOTAL TIME: {item.TimeDuration}</p>
                    <p>CORRECT: {item.TotalCorrect}</p>
                    <p>INCORRECT: {item.Totalincorrect}</p>
                    <p>SKIPPED: {item.Totalskipped}</p>
                    <p>MARKS OBTAINED: {item.Total_Marks_obt}</p>
                    <p>MARKS Percentage: {item.Overall_Prec.toFixed(2)}%</p>
                  </div>
                )}
                {selectedGraph === "Apti" && (
                  <div className="text-2xl py-3 px-6">
                    <p className="py-1">ATTEMPTED ON: {formattedDate}</p>
                    <hr />
                    <p>RANK: {item.Rank}</p>
                    <p>TOTAL TIME TAKEN: {item.TotalTimeTaken}</p>
                    <p>TOTAL TIME: {item.TimeDuration}</p>
                    <p>CORRECT: {item.Apticorrect}</p>
                    <p>INCORRECT: {item.Totalincorrect}</p>
                    <p>SKIPPED: {item.AptiSkipped}</p>
                    <p>MARKS OBTAINED: {item.Apti}</p>
                    <p>MARKS Percentage: {item.Apti_Prec.toFixed(2)}%</p>
                  </div>
                )}
                {selectedGraph === "Pdp" && (
                  <div key={item._id} className=" text-2xl py-3 px-6  ">
                    <p className="py-1">ATTEMPTED ON: {formattedDate}</p>
                    <hr />
                    <p>RANK: {item.Rank}</p>
                    <p>TOTAL TIME TAKEN: {item.Pdtime}</p>
                    <p>TOTAL TIME: {item.TimeDuration}</p>
                    <p>CORRECT: {item.PDcorrect}</p>
                    <p>INCORRECT: {item.PDincorrect}</p>
                    <p>SKIPPED: {item.Totalskipped}</p>
                    <p>MARKS OBTAINED: {item.Total_Marks_obt}</p>
                    <p>MARKS Percentage: {item.Tech_Prec?.toFixed(2)}%</p>
                  </div>
                )}
                {selectedGraph === "Technical" && (
                  <div className="text-2xl py-3 px-6">
                    <p className="py-1">
                      ATTEMPTED ON:{"   "}
                      {formattedDate}
                    </p>
                    <hr />
                    <p>RANK:{item.Rank}</p>
                    <p>TOTAL TIME TAKEN:{item.Techtime}</p>
                    <p>TOTAL TIME:{item.TimeDuration}</p>
                    <p>CORRECT:{item.techcorrect}</p>
                    <p>INCORRECT:{item.techincorrect}</p>
                    <p>SKIPPED:{item.TechSkipped}</p>
                    <p>MARKS OBTAINED:{item.Tech}</p>
                    <p>MARKS Percentage:{item.Tech_Prec?.toFixed(2)} %</p>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
      {/* <Leaderboard/> */}
    </div>
  );
}

export default NewAnalyticsReport;
