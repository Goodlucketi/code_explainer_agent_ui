import React, { useState } from "react";
import axios from "axios";

interface ExplainFormProps {
  setResult: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExplainForm: React.FC<ExplainFormProps> = ({ setResult, setLoading }) => {
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
      className="p-4 bg-white rounded-md w-full md:w-6/12 mb-10 md:mb-0"
    >
      <textarea
        rows={10}
        cols={80}
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
          className="border border-gray-300 rounded-md p-2 shadow-md w-full"
        />
      </div>

      <button
        type="submit"
        className="mt-4 p-3 bg-blue-500 text-white rounded-md w-full"
      >
        Explain Code
      </button>
    </form>
  );
};

export default ExplainForm;
