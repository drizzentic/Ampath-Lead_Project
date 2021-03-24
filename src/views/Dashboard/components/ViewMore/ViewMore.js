import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 10,
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const ViewMore = (props) => {
  const classes = useStyles();
  let products = props.products;
  let type = props.type;
  return (
    <div className={classes.content}>
      {products.length ? (
        <Table>
          <TableBody>
            {products.map((product, key) => (
              <TableRow hover key={product.product_service + key}>
                <TableCell>{product.product_service}</TableCell>
                {TC(product, type)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        ""
      )}
    </div>
  );
};
let TC = (product, type) => {
  var cell;
  if (type === "percentage_change") {
    cell = `${product?.percentage_change.toFixed(2) || 0}`;
  } else {
    cell = `${product?.current.toFixed(2) || 0}`;
  }
  return <TableCell align="right">{cell}%</TableCell>;
};
ViewMore.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array,
};

export default ViewMore;