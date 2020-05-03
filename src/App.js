import React from "react";
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import styles from "./App.module.css";
import { fetchData } from "./api";
import image from "./img/image.png";
import Loader from "react-loader-spinner";

class App extends React.Component {
  state = {
    data: {},
    country: "",
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const data = await fetchData();
    this.setState({ data, loading: false });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);
    this.setState({ data, country: country });
  };

  render() {
    const { data, country, loading } = this.state;

    if (loading)
      return (
        <div className={styles.loader}>
          <Loader type="Watch" height={35} width={35} />
        </div>
      );

    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
