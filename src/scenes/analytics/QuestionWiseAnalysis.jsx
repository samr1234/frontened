import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionWiseAnalysis = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const url = 'http://192.168.1.22:3002/api/questions';
        const response = await axios.get(url);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="flex items-center shadow-green-00 shadow-md border ml-10 mt-20 max-w-[1020px] drop-shadow-sm">
      <div className="max-w-[1020px] mx-auto mt-10 max-h-[500px] overflow-x-auto">
        <h2 className="text-3xl font-bold text-red-500 mb-4 text-center">Question Wise Analysis</h2>
        <table className="w-full border-collapse border border-gray-500">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4 border border-gray-500">S. No.</th>
              <th className="py-2 px-4 border border-gray-500">Subject</th>
              <th className="py-2 px-4 border border-gray-500">Topic</th>
              <th className="py-2 px-4 border border-gray-500">Question Type</th>
              <th className="py-2 px-4 border border-gray-500">Question Text</th>
              <th className="py-2 px-4 border border-gray-500">Option 1</th>
              <th className="py-2 px-4 border border-gray-500">Option 2</th>
              <th className="py-2 px-4 border border-gray-500">Option 3</th>
              <th className="py-2 px-4 border border-gray-500">Option 4</th>
              <th className="py-2 px-4 border border-gray-500">Right Answer</th>
              <th className="py-2 px-4 border border-gray-500">Explanation</th>
              <th className="py-2 px-4 border border-gray-500">Correct Marks</th>
              <th className="py-2 px-4 border border-gray-500">Negative Marks</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.sNo} className="border-t border-gray-500">
                <td className="py-2 px-4 border border-gray-500">{question.sNo}</td>
                <td className="py-2 px-4 border border-gray-500">{question.subject}</td>
                <td className="py-2 px-4 border border-gray-500">{question.topic}</td>
                <td className="py-2 px-4 border border-gray-500">{question.questionType}</td>
                <td className="py-2 px-4 border border-gray-500">{question.questionText}</td>
                <td className="py-2 px-4 border border-gray-500">{question.option1}</td>
                <td className="py-2 px-4 border border-gray-500">{question.option2}</td>
                <td className="py-2 px-4 border border-gray-500">{question.option3}</td>
                <td className="py-2 px-4 border border-gray-500">{question.option4}</td>
                <td className="py-2 px-4 border border-gray-500">{question.rightAnswer}</td>
                <td className="py-2 px-4 border border-gray-500">{question.explanation}</td>
                <td className="py-2 px-4 border border-gray-500">{question.correctMarks}</td>
                <td className="py-2 px-4 border border-gray-500">{question.negativeMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionWiseAnalysis;
