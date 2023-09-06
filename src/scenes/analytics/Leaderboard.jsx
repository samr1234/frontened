import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const url = '/getCourseData';
        const response = await axios.get(url);
        setLeaderboardData(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, []);

  // Calculate the current entries to display based on the current page
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = leaderboardData.slice(indexOfFirstEntry, indexOfLastEntry);

  // Function to handle page navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div  className="flex items-center shadow-green-00  shadow-md border ml-10 mt-20   max-w-[1020px] drop-shadow-sm "
             
            >
    <div className="container mx-auto mt-4 max-h-[700px]" >
      <div className="text-3xl font-bold text-red-500 mb-4 text-center">Leaderboard</div>
      <div className="w-full ">
        <table className="w-full border-collapse border border-gray-500 table-fixed ">
          <colgroup>
            <col style={{ width: '10%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '25%' }} />
          </colgroup>
          <thead>
            <tr className="bg-gray-200 text-left ">
              <th className="py-2 px-4 border border-gray-500">Rank</th>
              <th className="py-2 px-4 border border-gray-500">Name</th>
              <th className="py-2 px-4 border border-gray-500">Average</th>
              <th className="py-2 px-4 border border-gray-500">Total Correct</th>
              <th className="py-2 px-4 border border-gray-500">Total Incorrect</th>
              <th className="py-2 px-4 border border-gray-500">Total Time Taken</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((student, index) => (
              <tr key={index} className="border-t border-gray-500">
                <td className="py-2 px-4 border border-gray-500">{student.Rank}</td>
                <td className="py-2 px-4 border border-gray-500">{student.studentId?.name || ''}</td>
                <td className="py-2 px-4 border border-gray-500">{student.Average.toFixed(2)}</td>
                <td className="py-2 px-4 border border-gray-500">{student.TotalCorrect}</td>
                <td className="py-2 px-4 border border-gray-500">{student.TotalIncorrect}</td>
                <td className="py-2 px-4 border border-gray-500">{student.TotalTimeTaken}</td>
              </tr>
            ))}
            {/* Display empty rows for remaining entries on the current page */}
            {currentEntries.length < entriesPerPage && (
              <>
                {Array(entriesPerPage - currentEntries.length)
                  .fill(null)
                  .map((_, index) => (
                    <tr key={`empty-${index}`} className="border-t border-gray-500">
                      <td className="py-2 px-4 border border-gray-500"></td>
                      <td className="py-2 px-4 border border-gray-500"></td>
                      <td className="py-2 px-4 border border-gray-500"></td>
                      <td className="py-2 px-4 border border-gray-500"></td>
                      <td className="py-2 px-4 border border-gray-500"></td>
                      <td className="py-2 px-4 border border-gray-500"></td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-end my-4   ">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="py-2 px-4 border text-white bg-gradient-to-r from-blue-500 to-purple-500 border-white mr-2 hover:bg-green-700   "
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastEntry >= leaderboardData.length}
          className="py-2 px-4 border text-white border-white bg-gradient-to-r from-blue-500 to-purple-500  bg-blue-200 "
        >
          Next
        </button>
      </div>
    </div>
    </div>

  );
};

export default Leaderboard;
