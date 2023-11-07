import React from "react";

const WeatherCard = ({ temp, summary, title }) => {
    return (
        <div className="card">
            {title && <h4>{title}</h4>}
            <p>{temp}</p>
            <p>{summary}</p>
        </div>
    );
};

export default WeatherCard;
