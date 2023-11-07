import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import "./Weather.css";

const Weather = () => {
    const [londonState, setLondonState] = useState();
    const [tokyoState, setTokyoState] = useState();
    const [loading, setLoading] = useState(true);

    const fetchLondon = async () => {
        await fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=51.5072&lon=0.1276&appid=${process.env.REACT_APP_WEATHER_KEY}&exclude=minutely,daily,hourly,alerts&units=imperial`
        )
            .then((resp) => {
                return resp.json();
            })
            .then((json) => {
                setLondonState(json.current);
            });
    };

    const fetchTokyo = async () => {
        await fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=51.5072&lon=0.1276&appid=${process.env.REACT_APP_WEATHER_KEY}&exclude=minutely,current,hourly,alerts&units=imperial`
        )
            .then((resp) => {
                return resp.json();
            })
            .then((json) => {
                setTokyoState(json.daily);
            });
    };

    const fetchData = async () => {
        await fetchLondon();
        await fetchTokyo();
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderLondonWeather = () => {
        return (
            <div className="weather-section">
                <h2>London Current</h2>
                <div className="card-container">
                    <WeatherCard
                        temp={Math.floor(londonState.temp) + " F"}
                        summary={londonState.weather[0].description}
                        title="London, UK"
                    />
                </div>
            </div>
        );
    };

    const renderTokyoFiveDay = () => {
        return (
            <div className="weather-section">
                <h2>Tokyo 5 Day</h2>
                <div className="card-container">
                    {tokyoState.slice(0, 5).map((day) => {
                        const date = new Date(day.dt * 1000);

                        return (
                            <WeatherCard
                                title={date.toDateString()}
                                temp={
                                    Math.floor(day.temp.min) +
                                    " F <> " +
                                    Math.floor(day.temp.max) +
                                    " F"
                                }
                                summary={day.summary}
                            />
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <>
            {!loading && renderLondonWeather()}
            {!loading && renderTokyoFiveDay()}
        </>
    );
};

export default Weather;
