import { useState } from "react";

const getPatient = (email, successCallback, failureCallback) => {
  fetch("/patient", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: new Headers({
      "content-type": "application/json",
    }),
  })
    .then(async (res) => {
      const data = await res.json();
      if (data.length > 0) {
        successCallback(data[0]);
      } else {
        failureCallback("No data found for user " + email);
      }
    })
    .catch((error) => {
      failureCallback(error.message);
    });
};

const ReviewPage = () => {
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);

  const successCallback = (result) => {
    setPatientInfo(result);
  };

  const failureCallback = (error) => {
    setError(error);
  };

  const submit = () => {
    if (!email) {
      setError("Email Address is required");
    } else {
      getPatient(email, successCallback, failureCallback);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="row justify-content-center">
            <h5 className="col-8">
              Please type a patient's email into the input below and click
              submit to see their information.
            </h5>
          </div>
          <div className="row justify-content-center align-items-center mt-4">
            <div className="col-4 text-center">
              <input
                type="text"
                placeholder="Patient Email Address"
                id="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
              />
            </div>
            <div className="col-2 text-center">
              <a className="primary_button" onClick={submit}>
                Submit
              </a>
            </div>
          </div>
          {error && (
            <div className="row text-danger justify-content-center mt-2">
              <div className="col-6 text-center">{error}</div>
            </div>
          )}
        </div>
        {patientInfo && <div className="row">{patientInfo.email}</div>}
      </div>
    </div>
  );
};

export default ReviewPage;
