import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Screan from "../components/screan/Screan";
import Profile from "../components/profile/Profile";
import ScreanSkeleton from "../util/ScreanSkeleton";

import { connect } from "react-redux";
import { getScreans } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getScreans();
  }
  render() {
    const { screans, loading } = this.props.data;
    let recentScreansMarkup = !loading ? (
      screans.map((screan) => <Screan key={screan.screanId} screan={screan} />)
    ) : (
      <ScreanSkeleton />
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentScreansMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreans: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreans })(home);
