import { useRef, useState } from "react";

const saveFile = (file) => {
  const documentData = new FormData();
  documentData.append("file", file);
  fetch("/save", {
    method: "POST",
    body: documentData,
  }).then(async (res) => {
    const data = await res.json();
  });
};

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();
  const onFileSelect = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const onSubmit = () => {
    saveFile(file);
  };

  const downloadTemplate = () => {
    alert("template downloaded");
  };
  return (
    <>
      <div className="row justify-content-center">
        <h5 className="col-8">
          Please click the Upload button below to select a file to be processed
          into our system. You will have a chance to review the file before
          submitting. If needed, a template with the necessary columns can be
          downloaded using the Download Template button.
        </h5>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="text-center col-3">
          <a
            className="primary_button"
            onClick={() => fileInputRef.current.click()}
          >
            Select File for Upload
          </a>
        </div>
        <div className="text-center col-3">
          <a className="secondary_button" onClick={() => downloadTemplate()}>
            Download Template
          </a>
        </div>
      </div>
      {file && (
        <div className="row justify-content-center mt-4">
          <div className="col-4 file_details p-4">
            <div className="row">
              <h5 className="col-4">File Name:</h5>
              <h6 className="col">{file.name}</h6>
            </div>
            <div className="row">
              <h5 className="col-4">File Size:</h5>
              <h6 className="col">{Math.round(file.size / 1024)}kb</h6>
            </div>
            <div className="row justify-content-center mt-2">
              <div className="col-8 text-center">
                <a onClick={onSubmit} className="primary_button">
                  Submit
                </a>
              </div>
            </div>
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
    </>
  );
};

export default UploadPage;
