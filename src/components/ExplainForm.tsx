import React, { useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa6";


interface ExplainFormProps {
  setResult: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading:boolean;
}

const ExplainForm: React.FC<ExplainFormProps> = ({ setResult, setLoading, loading }) => {
  const [code, setCode] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      let response;

      if (code.trim()) {
        // Send to /explain-code
        const formData = new FormData();
        formData.append("code", code);

        response = await axios.post<{ result: string }>(
          "https://code-explainer-agent.onrender.com/explain",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else if (file) {
        // Send to /explain-file
        const formData = new FormData();
        formData.append("file", file);

        response = await axios.post<{ result: string }>(
          "https://code-explainer-agent.onrender.com/explain-file",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        alert("Please paste code or upload a file.");
        return;
      }

      setResult(response.data.result);
    } catch (err: any) {
      setResult("Error: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="py-4 bg-white rounded-md w-full md:w-6/12 mb-5 md:mb-0"
    >
      <textarea
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
          setFile(null); // clear file if typing
        }}
        className="w-full p-4 border border-gray-300 rounded-md overflow-y-auto"
      />

      <div className="mt-4 md:flex items-center gap-4">
        <label
          htmlFor="file-upload"
          className="block text-sm font-medium text-gray-700 text-lg mb-2"
        >
          Or Upload a file
        </label>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
              setCode(""); // clear textarea if file selected
            }
          }}
          className="border border-gray-200 rounded-md p-2 shadow-md w-full"
        />
      </div>

       <button
        type="submit"
        disabled={loading}
        className={`mt-4 p-3 bg-blue-500 text-white rounded-md w-full flex items-center justify-center gap-2 transition-all duration-300 ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Loading...
          </>
        ) : (
          "Explain Code"
        )}
      </button>
    </form>
  );
};

export default ExplainForm;
