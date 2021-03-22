import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 10
  },
  actions: {
    justifyContent: "flex-end",
  }
}));

const ViewMore = ({ products }) => {

  const classes = useStyles();

  return (
    <div className={classes.content}>
      {
        products.length ? (
          <Table>
            <TableBody>
              {products.map((product, key) => (
                <TableRow hover key={product.product_service + key}>
                  <TableCell>{product.product_service}</TableCell>
                  <TableCell align='right'>{product.last_30days.toFixed(2) || 0}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ): ''
      }
    </div>
  );
};

ViewMore.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array
};

export default ViewMore;
