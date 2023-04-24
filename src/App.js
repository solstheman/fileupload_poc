import "./App.css";
import { useState } from "react";
import UploadPage from "./UploadPage";
import ReviewPage from "./ReviewPage";
import DevelopPage from "./DevelopPage";

const App = () => {
  const [page, setPage] = useState("upload");

  const getCurrentPage = () => {
    switch (page) {
      case "upload":
      default:
        return <UploadPage />;
      case "review":
        return <ReviewPage />;
      case "develop":
        return <DevelopPage />;
    }
  };

  return (
    <div className="row">
      <div className="col-3 nav_panel">
        <div className="row">
          <div className="col-12 text-center">
            <img src="https://care-harmony.com/wp-content/uploads/2022/02/careharmony_logo.png"></img>
          </div>
        </div>
        <div className="row justify-content-left nav_row">
          <div className="col-12 nav_item" onClick={() => setPage("upload")}>
            Upload Patient Data
          </div>
          <div className="col-12 nav_item" onClick={() => setPage("review")}>
            Review Patients
          </div>
          <div className="col-12 nav_item" onClick={() => setPage("develop")}>
            Developers
          </div>
        </div>
      </div>
      <div className="col-9 p-4 page_container">{getCurrentPage()}</div>
    </div>
  );
};

export default App;
