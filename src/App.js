import "./App.css";
import { useRef, useState } from "react";

const saveFile = (file) => {
  const documentData = new FormData();
  documentData.append("file", file);
  fetch("/save", {
    method: "POST",
    body: documentData,
  }).then(async (res) => {
    const data = await res.json();
    console.log(data);
  });
};

const App = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const onFileSelect = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const onSubmit = () => {
    saveFile(file);
  };

  return (
    <div className="row">
      <div className="col-3 nav_panel">
        <div className="row">
          <div className="col-12 text-center">
            <img src="https://care-harmony.com/wp-content/uploads/2022/02/careharmony_logo.png"></img>
          </div>
        </div>
      </div>
      <div className="col-9">
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
              <div className="row" onClick={onSubmit}>
                <button>Submit</button>
              </div>
            </div>
          )}
          <div className="d-none">
            <input
              accept=".csv"
              type="file"
              ref={fileInputRef}
              onChange={onFileSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
