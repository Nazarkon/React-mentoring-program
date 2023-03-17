import React, {useState} from "react";


const CounterNumber = (props) => {

    const { defaultValue } = props

    const [number, setCount] = useState(defaultValue || 0);

    const incrementValue = () => {
        setCount(number + 1)
    }

    const decrementValue = () => {
        setCount(number - 1);
    }

    const IncrementButtonStyle = {
        backgroundColor: "#4CAF50",
        border: "none",
        color: "white",
        padding: "15px 32px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "16px",
    }

    const DecrementButtonStyle = {
        backgroundColor: "#f44336",
        border: "none",
        color: "white",
        padding: "15px 32px",
        marginLeft: "10px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "16px",
    }

    return React.createElement('div', null,
    React.createElement('h1', null, `Count: ${number}`),
    React.createElement('button', { style: IncrementButtonStyle, onClick: incrementValue }, 'Increment'),
    React.createElement('button', { style: DecrementButtonStyle , onClick: decrementValue }, 'Decrement')
  );
}

export default CounterNumber