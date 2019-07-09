import React from "react";

const FormError = ({ errorMsg, isError }) => (
    <div className="formErrors">
      {!!isError ? (
          <p className="errorMessage">{errorMsg}</p>
      ) : ''}  
    </div>
)

export default FormError;