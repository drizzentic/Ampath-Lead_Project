import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardHeader, CardContent, Divider, Table, TableBody, TableCell, TableRow, CardActions, Button, CircularProgress } from "@material-ui/core";
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import { Alert } from "@material-ui/lab";
import ViewMore from '../ViewMore/ViewMore';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 10,
  },
  inner: {
    minWidth: 800,
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
  },
  status: {
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: "flex-end",
  },
  difference: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  differenceIcon: {
    color: theme.palette.error.main,
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1),
  },
  loader: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center'
  }
}));

const FastestDeclining = (props) => {
  const { className, products, error, loading, blank, ...rest } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState([]);

  const handleClickOpen = () => {
    setSelectedValue(products);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedValue([]);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={
          <div className={classes.difference}>
              <TrendingDownIcon className={classes.differenceIcon} />
          </div>
        }
        title="Fastest Declining - Last 30 Days"
      />
      <Divider />
      <CardContent className={classes.content}>
        {loading ? (
          <div className={classes.loader}>
            <CircularProgress disableShrink />
          </div>
        ) : (
          products.length && !open ? (
            <Table>
              <TableBody>
                {[...products].slice(0,5).map((product, key) => (
                  <TableRow hover key={product.product_service + key}>
                    <TableCell>{product.product_service}</TableCell>
                    <TableCell align='right'>{product.percentage_change.toFixed(2) || 0}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ): ''
        )}
        {error && !loading && (
          <Alert className={classes.alert} severity='error'>
            There was an error. Please try again later.
          </Alert>
        )}
        {blank && !loading && <Alert severity='info'>{blank}</Alert>}
      </CardContent>
      {open && (
        <ViewMore handleClose={handleClose} products={selectedValue}/>
      )}
      <CardActions className={classes.actions}>
        {open ? (
          <Button
            color="primary"
            size="small"
            variant="text"
            onClick={() => handleClose()}
          >
            Close <ArrowDropUpIcon />
          </Button>
        ) : (
          <Button
            color="primary"
            size="small"
            variant="text"
            onClick={() => handleClickOpen()}
          >
            View More <ArrowDropDownIcon />
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

FastestDeclining.propTypes = {
  blank: PropTypes.string,
  className: PropTypes.string,
  products: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default FastestDeclining;
