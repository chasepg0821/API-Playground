import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState } from "react";

import Maps from "./tabs/maps/Maps";
import Weather from "./tabs/weather/Weather";
import "./App.css";
import { Typography } from "@mui/material";
import Countries from "./tabs/countries/Countries";
import Currency from "./tabs/currency/Currency";

const TABS = [
    {
        label: "Open Weather"
    },
    {
        label: "Google Maps Platform"
    },
    {
        label: "Countries"
    },
    {
        label: "Currency Conversion"
    }
];

const renderTabContent = (tabIndex) => {
    switch (tabIndex) {
        case 1:
            return <Maps />;
        case 2:
            return <Countries />;
        case 3:
            return <Currency />;
        default:
            return <Weather />;
    }
};

function App() {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (e) => {
        e.preventDefault();
        console.log("Changing tabIndex to:", e.target.id);
        setTabIndex(parseInt(e.target.id));
    };

    const renderTab = (tab, index) => {
        const active = index === tabIndex;
        return (
            <div
                className={active ? "page-tab active" : "page-tab"}
                key={index}
                id={index}
                onClick={active ? null : handleTabChange}>
                {tab.label}
            </div>
        );
    };

    return (
        <div className="App">
            <header className="nav">
                <Typography variant="h1" component="h1">
                    API Project
                </Typography>
                <nav>
                    {TABS.map((tab, index) => {
                        return renderTab(tab, index);
                    })}
                </nav>
            </header>
            <main>{renderTabContent(tabIndex)}</main>
        </div>
    );
}

export default App;
