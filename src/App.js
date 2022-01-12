import { FormControl, Select, MenuItem, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getWorldwideData = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then(response => response.json())
        .then(data => {
          setCountryInfo(data);
        });
    }
    getWorldwideData();
  }, []);

  useEffect(() => {
    // async --> send a request, wait for it, then do something with the response
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries").then(
        (response) => {
          response.json().then((data) => {
            const countries = data.map((country) => ({
              name: country.country,
              value: country.countryInfo.iso2,
            }));
            const sortedData = sortData(data);
            setCountries(countries);
            setTableData(sortedData);
          });
        }
      )
    };

    getCountriesData();
    
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    // https://disease.sh/v3/covid-19/all
    // https://disease.sh/v3/covid-19/countries/[countryCode]

    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url).then((response) => {
      response.json().then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
    }
    );
  };


  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID 19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              {/* Loop through all the countries and show a drop down list of options */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country, index) => (
                <MenuItem key={index} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" total={countryInfo.cases} cases={countryInfo.todayCases} />
          <InfoBox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered} />
          <InfoBox title="Deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths} />
        </div>

        {/* Header */}
        {/* Title + Select input dropdown field */}

        {/* InfoBoxs */}
        {/* InfoBoxs */}
        {/* InfoBoxs */}

        {/* Table */}
        {/* Graph */}

        {/* Map */}
        <Map />
      </div>
      <div className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </div>
    </div>
  );
}

export default App;
