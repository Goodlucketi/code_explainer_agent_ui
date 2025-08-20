import React from "react";

interface ResultProps {
  result: string;
  loading: boolean;
}

const Result: React.FC<ResultProps> = ({ result, loading }) => {
  if (loading) {
    return (
        <div className="p-4 bg-white rounded-md shadow-md mt-4 border border-gray-300 rounded-md md:w-8/12 h-auto overflow-y-auto">
        <p className="whitespace-pre-wrap">Explaining your code, Please wait...</p>
        </div>
    );
  }

//   if (!result) {
//     return null;
//   }

  return (
    <div className="p-4 bg-white rounded-md shadow-md mt-4 border border-gray-300 rounded-md md:w-8/12 h-auto overflow-y-auto">
      <h3>Explanation</h3>
      <p className="whitespace-pre-wrap">{result}</p>
    </div>
  );
};

export default Result;
