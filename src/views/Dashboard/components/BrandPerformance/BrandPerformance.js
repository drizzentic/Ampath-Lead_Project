import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardHeader, CardContent, Divider, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { data } from "./chart";

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    position: "relative",
  },
  actions: {
    justifyContent: "flex-end",
  },
  loader: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center'
  }
}));

const BrandPerformance = (props) => {
  const { className, brandlift, loading, error, blank, ...rest } = props;
  const classes = useStyles();
  const [labels, setLabels] = useState([]);
  const [series, setSeries] = useState([]);
  const chart = useRef();

  useEffect(() => {
    const summary = data(brandlift);
    setLabels(summary.labels);
    setSeries(summary.datasets);
  }, [brandlift]);
  
  const options = {

    title: {
        text: '',
        categories: labels,
    },

    yAxis: {
        title: {
            text: 'Brandlift %'
        }
    },
    xAxis: {	
      text: '',	
      categories: labels,	
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    series: series,

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title='Brand Performance' />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          {loading ? (
            <div className={classes.loader}>
              <CircularProgress disableShrink />
            </div>
          ) : (
            <HighchartsReact ref={chart} highcharts={Highcharts} options={options} />
          )}
          { error && !loading && (
            <Alert className={classes.alert} severity='error'>
            There was an error. Please try again later.
          </Alert>
          )}
          {blank && !loading && <Alert severity='info'>{blank}</Alert>}
        </div>
      </CardContent>
    </Card>
  );
};

BrandPerformance.propTypes = {
  blank: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default BrandPerformance;
