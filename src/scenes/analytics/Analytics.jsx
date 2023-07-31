import React, { useContext,useState } from "react";
import { UserContext } from "../../UserContext.jsx";
import { Navigate } from "react-router-dom";
import NewAnalytics from "./NewAnalytics";
import Leaderboard from "./Leaderboard.jsx";
import GoalWise from "./GoalWise.jsx";
import QuestionWiseAnalysis from "./QuestionWiseAnalysis.jsx";

const Analytics = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { loading, user } = useContext(UserContext);

  if (!user && !loading) {
    // Redirect the user to the login page
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex items-center gap-10 shadow-md border ml-10 mt-20 w-3/4">
      <div className="flex flex-col max-h-[630px] overflow-y-auto ">
      
      <NewAnalytics selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <Leaderboard />
      <GoalWise selectedDate={selectedDate} />
        <QuestionWiseAnalysis />
      </div>
    </div>
  );
};

export default Analytics;
