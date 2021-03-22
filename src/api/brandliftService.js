import axios from "axios";

const API_URL = "https://mdundo-backend-cafnvqlpja-ey.a.run.app/api/brandlift";

export const getBrandlift = async (values) => {
  const params = {
    months: 3,
  };

  if (values.country.length) {
    params.country = getParams(values.country);
  }
  if (values.age_bracket.length) {
    params.age_bracket = getParams(values.age_bracket);
  }
  if (values.lsm.length) {
    params.lsm = getParams(values.lsm.map(v => v.key));
  }
  if (values.urban_rural.length) {
    params.urban_rural = getParams(values.urban_rural);
  }
  if (values.gender.length) {
    params.urban_rural = getParams(values.gender.map(v => v.key));
  }

  try {
    return await axios.get(`${API_URL}/${values.productName}`, { params });
  } catch (err) {
    return err.response;
  }
};

// eslint-disable-next-line no-unused-vars
const getMonths = (startDate, endDate) => {
  let months;
  months = (startDate.getFullYear() - endDate.getFullYear()) * 12;
  months += startDate.getMonth() - endDate.getMonth();
  return months;
};

const getParams = values => values.map(v => JSON.stringify(v)).join(',');
