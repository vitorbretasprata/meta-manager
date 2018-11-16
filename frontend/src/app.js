import React  from "react";
import createReactClass from "create-react-class";

const App = ({ nome, sobrenome}) => (
    <h3>Olá {`${nome} ${sobrenome}`}</h3>
)

export default App
