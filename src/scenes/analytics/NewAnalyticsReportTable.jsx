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



        <div className=" ">
     
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
                  <div className="text-xl py-3 px-6 mt-[-1rem] font-mono">
                    <p className="py-1">Attempted On: {formattedDate}</p>
                    <hr />
                    <p className="py-1">Rank:  {item.Rank}</p><hr />
                    <p className="py-1">Total Time Taken: {item.TotalTimeTaken}</p><hr />
                    <p className="py-1">TOTAL TIME: {item.TimeDuration}</p><hr />
                    <p className="py-1">Correct: {item.TotalCorrect}</p><hr />
                    <p className="py-1">Incorrect: {item.Totalincorrect}</p><hr />
                    <p className="py-1">Skipped: {item.Totalskipped}</p><hr />
                    <p className="py-1">Marks Obtained: {item.Total_Marks_obt}</p><hr />
                    <p className="py-1">Marks Percentage: {item.Overall_Prec.toFixed(2)}%</p><hr />
                  </div>
                )}
                {selectedGraph === "Apti" && (
                  <div className="text-xl py-3 px-6 mt-1 font-mono">
                    <p className="py-1">Attempted On: {formattedDate}</p>
                    <hr />
                    <p  className="py-1">Rank: {item.Rank}</p><hr />
                    <p className="py-1">Total Time Taken: {item.TotalTimeTaken}</p><hr />
                    <p className="py-1">TOTAL TIME: {item.TimeDuration}</p><hr />
                    <p className="py-1">Correct: {item.Apticorrect}</p><hr />
                    <p className="py-1">Incorrect: {item.Totalincorrect}</p><hr />
                    <p className="py-1">Skipped: {item.AptiSkipped}</p><hr />
                    <p className="py-1">Marks Obtained: {item.Apti}</p><hr />
                    <p className="py-1">Marks Percentage: {item.Apti_Prec.toFixed(2)}%</p><hr />
                  </div>
                )}
                {selectedGraph === "Pdp" && (
                  <div key={item._id} className=" text-xl py-3 px-6 mt-3 font-mono ">
                    <p className="py-1">Attempted On: {formattedDate}</p>
                    <hr />
                    <p  className="py-1">Rank: {item.Rank}</p><hr />
                    <p className="py-1">Total Time Taken: {item.Pdtime}</p><hr />
                    <p className="py-1">TOTAL TIME: {item.TimeDuration}</p><hr />
                    <p className="py-1">Correct: {item.PDcorrect}</p><hr />
                    <p className="py-1">Incorrect: {item.PDincorrect}</p><hr />
                    <p className="py-1">Skipped: {item.Totalskipped}</p><hr />
                    <p className="py-1">Marks Obtained: {item.Total_Marks_obt}</p><hr />
                    <p className="py-1">Marks Percentage: {item.Tech_Prec?.toFixed(2)}%</p><hr />
                  </div>
                )}
                {selectedGraph === "Technical" && (
                  <div className="text-xl py-3 px-6 mt-3 font-mono">
                    <p className="py-1">
                      Attempted On:{"   "}
                      {formattedDate}
                    </p>
                    <hr />
                    <p className="py-1">Rank:{item.Rank}</p><hr />
                    <p className="py-1">Total Time Taken:{item.Techtime}</p><hr />
                    <p className="py-1">TOTAL TIME:{item.TimeDuration}</p><hr />
                    <p className="py-1">Correct:{item.techcorrect}</p><hr />
                    <p className="py-1">Incorrect:{item.techincorrect}</p><hr />
                    <p className="py-1">Skipped:{item.TechSkipped}</p><hr />
                    <p className="py-1">Marks Obtained:{item.Tech}</p><hr />
                    <p className="py-1">Marks Percentage:{item.Tech_Prec?.toFixed(2)} %</p><hr />
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
