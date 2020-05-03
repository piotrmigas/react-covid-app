const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const res = await fetch(changeableUrl);
    const { confirmed, recovered, deaths, lastUpdate } = await res.json();

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const res = await fetch(`${url}/daily`);
    const data = await res.json();

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const res = await fetch(`${url}/countries`);
    const { countries } = await res.json();

    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
