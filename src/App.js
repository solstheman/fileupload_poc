import { useRef, useState } from "react";

const App = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const onFileSelect = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <div className="text-center mt-4">
      <button onClick={() => fileInputRef.current.click()}>Upload</button>
      {file && (
        <div className="row justify-content-center">
          <div className="col align-self-end">
            {file.name} - {Math.round(file.size / 1024)}kb
          </div>
          <div
            className="col-1 align-self-start cursor-pointer"
            onClick={() => setFile(null)}
            role="button"
          >
            X
          </div>
        </div>
      )}
      <div className="d-none">
        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          onChange={onFileSelect}
        />
      </div>
    </div>
  );
};

export default App;
