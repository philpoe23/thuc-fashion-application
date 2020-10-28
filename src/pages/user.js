import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Screan from "../components/screan/Screan";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";

import ScreanSkeleton from "../util/ScreanSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    screanIdParam: null,
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const screanId = this.props.match.params.screanId;

    if (screanId) this.setState({ screanIdParam: screanId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { screans, loading } = this.props.data;
    const { screanIdParam } = this.state;

    const screansMarkup = loading ? (
      <ScreanSkeleton />
    ) : screans === null ? (
      <p>No screans from this user</p>
    ) : !screanIdParam ? (
      screans.map((screan) => <Screan key={screan.screanId} screan={screan} />)
    ) : (
      screans.map((screan) => {
        if (screan.screanId !== screanIdParam)
          return <Screan key={screan.screanId} screan={screan} />;
        else return <Screan key={screan.screanId} screan={screan} openDialog />;
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {screansMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
