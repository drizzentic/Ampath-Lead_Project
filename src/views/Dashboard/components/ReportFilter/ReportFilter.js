import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { FormControl, Select, InputLabel, MenuItem, Input, Checkbox, ListItemText, Grid, Typography, Button } from "@material-ui/core";
import { ageBrackets, locations, lsmOptions, countries, categories, gender } from "../../../../data";

const useStyles = makeStyles(() => ({
  root: {},
  filterContainer: {
    position: "relative",
    marginBottom: 25,
  },
  formControl: {
    width: "100%",
  },
}));

const ReportFilter = ({ filters, setFilters, getReport }) => {
  const history = useHistory();
  const {
    location: { search },
  } = history;
  const classes = useStyles();
  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const [category, setCategory] = React.useState("");
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    if (category) {
      const selectedProducts = getProducts(category);
      setProducts(selectedProducts.subcategories);
    }
    const params = new URLSearchParams();
    if (filters.productName) {
      params.append("product", filters.productName);
    } else {
      params.delete("product");
    }
    if (filters.country.length > 0) {
      params.append("country", filters.country);
    } else {
      params.delete("country");
    }

    history.push({ search: params.toString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, search, filters]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const getProducts = (category) => categories.find((val) => val.name === category);

  return (
    <div className={classes.filterContainer}>
      <Typography gutterBottom variant='h3'>
        Filters
      </Typography>
      <form autoComplete='off' noValidate style={{ marginBottom: 10 }}>
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id='category-label'>Category</InputLabel>
              <Select
                fullWidth
                id='category-label'
                input={<Input required variant='outlined' />}
                name='category'
                onChange={handleCategoryChange}
                value={category}
                variant='outlined'>
                {categories.map((category) => (
                  <MenuItem key={category.name} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id='product-label'>Product</InputLabel>
              <Select fullWidth id='product' input={<Input required />} name='productName' onChange={handleChange} value={filters.productName}>
                {products.map((product) => (
                  <MenuItem key={product.key} value={product.key}>
                    {product.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id='country-label'>Country</InputLabel>
              <Select
                fullWidth
                id='country-label'
                input={<Input required />}
                name='country'
                multiple
                onChange={handleChange}
                renderValue={(selected) => selected.map((val) => val).join(", ")}
                value={filters.country}>
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    <Checkbox checked={filters.country.map((val) => val).indexOf(country) > -1} />
                    <ListItemText primary={country} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id='location-label'>Location</InputLabel>
              <Select
                fullWidth
                id='location-label'
                input={<Input required />}
                name='urban_rural'
                multiple
                onChange={handleChange}
                renderValue={(selected) => selected.map((val) => val).join(", ")}
                value={filters.urban_rural}>
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    <Checkbox checked={filters.urban_rural.map((val) => val).indexOf(location) > -1} />
                    <ListItemText primary={location} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id='age-label'>Age Bracket</InputLabel>
              <Select
                fullWidth
                id='age-label'
                input={<Input required />}
                name='age_bracket'
                multiple
                onChange={handleChange}
                renderValue={(selected) => selected.map((val) => val).join(", ")}
                value={filters.age_bracket}>
                {ageBrackets.map((age) => (
                  <MenuItem key={age} value={age}>
                    <Checkbox checked={filters.age_bracket.map((val) => val).indexOf(age) > -1} />
                    <ListItemText primary={age} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id='lsm-label'>LSM</InputLabel>
              <Select
                fullWidth
                id='lsm-label'
                input={<Input required />}
                name='lsm'
                multiple
                onChange={handleChange}
                renderValue={(selected) => selected.map((val) => val.key).join(", ")}
                value={filters.lsm}>
                {lsmOptions.map((lsm) => (
                  <MenuItem key={lsm.key} value={lsm}>
                    <Checkbox checked={filters.lsm.map((val) => val.label).indexOf(lsm.label) > -1} />
                    <ListItemText primary={lsm.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id='gender-label'>Gender</InputLabel>
              <Select
                fullWidth
                id='gender-label'
                input={<Input required />}
                name='gender'
                multiple
                onChange={handleChange}
                renderValue={(selected) => selected.map((val) => val.label).join(", ")}
                value={filters.gender}>
                {gender.map((gn) => (
                  <MenuItem key={gn.key} value={gn}>
                    <Checkbox checked={filters.gender.map((val) => val.label).indexOf(gn.label) > -1} />
                    <ListItemText primary={gn.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Button color='primary' variant='outlined' fullWidth onClick={() => getReport()} disabled={!filters.productName}>
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

ReportFilter.propTypes = {
  productName: PropTypes.number,
  setFilters: PropTypes.func,
  filters: PropTypes.object,
  getReport: PropTypes.func,
};

export default ReportFilter;
