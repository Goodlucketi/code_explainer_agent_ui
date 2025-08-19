import { useState } from "react";
import ExplainForm from "./components/ExplainForm";
import Navbar from "./components/Navbar";
import Result from "./components/Result";

function App() {
  // State for result and loading
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <Navbar />
      <div className="md:flex justify-between gap-10 w-10/12 mx-auto">
        {/* Pass the real state setters */}
        <ExplainForm setResult={setResult} setLoading={setLoading} />

        {/* Pass result + loading state down to Result */}
        <Result result={result} loading={loading} />
      </div>
    </>
  );
}

export default App;
