import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

import { ReportFilter, BrandPerformance, FastestGrowing, FastestDeclining, HighestRanking, LowestRanking } from "./components";

import { getBrandlift } from "api/brandliftService";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    width: "100%",
  },
  listContainer: {
    marginTop: 20,
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();

  const [filters, setFilters] = useState({
    productName: "",
    country: [],
    age_bracket: [],
    lsm: [],
    urban_rural: [],
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    gender: [],
  });

  const [brandlift, setBrandlift] = useState([]);
  const [fastestGrowing, setFastestGrowing] = useState([]);
  const [fastestDeclining, setFastestDeclining] = useState([]);
  const [highestRanking, setHighestRanking] = useState([]);
  const [lowestRanking, setLowestRanking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [blank, setBlank] = useState("");

  const getReport = async () => {
    setLoading(true);
    setError("");
    setBlank("");
    try {
      const response = await getBrandlift(filters);
      setLoading(false);
      if (response.status === 200) {
        setBrandlift(response.data.brandlift);
        setFastestGrowing(response.data.fastestGrowing);
        setFastestDeclining(response.data.fastestDeclining);
        setHighestRanking(response.data.highestRanking);
        setLowestRanking(response.data.lowestRanking);
      } else if (response.status === 500) {
        resetData();
        setBlank("No data available.");
      } else {
        setError("There is a problem");
        resetData();
      }
    } catch (err) {
      setLoading(false);
      setError("There is a problem");
      resetData();
      setBlank("");
    }
  };

  const resetData = () => {
    setBrandlift([]);
    setFastestGrowing([]);
    setFastestDeclining([]);
    setHighestRanking([]);
    setLowestRanking([]);
  };

  return (
    <div className={classes.root}>
      <ReportFilter filters={filters} setFilters={setFilters} getReport={getReport} />
      <BrandPerformance loading={loading} brandlift={brandlift} error={error} blank={blank} />
      <Grid container spacing={4} className={classes.listContainer}>
        <Grid item lg={6} sm={6} xl={6} xs={12}>
          <FastestGrowing products={fastestGrowing} loading={loading} error={error} blank={blank} />
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={12}>
          <FastestDeclining products={fastestDeclining} loading={loading} error={error} blank={blank} />
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={12}>
          <HighestRanking products={highestRanking} loading={loading} error={error} blank={blank} />
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={12}>
          <LowestRanking products={lowestRanking} loading={loading} error={error} blank={blank} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
