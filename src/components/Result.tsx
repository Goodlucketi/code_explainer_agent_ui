import React from "react";

interface ResultProps {
  result: string;
  loading: boolean;
}

const Result: React.FC<ResultProps> = ({ result, loading }) => {
  if (loading) {
    return <p>Explaining your code... please wait.</p>;
  }

//   if (!result) {
//     return null;
//   }

  return (
    <div className="p-4 bg-white rounded-md shadow-md mt-4 border border-gray-300 rounded-md md:w-8/12 overflow-y-auto h-96">
      <h3>Explanation</h3>
      <pre className="whitespace-pre-wrap">{result}</pre>
    </div>
  );
};

export default Result;
