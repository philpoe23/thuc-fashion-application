import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// REdux
import { connect } from "react-redux";
import { likeScrean, unlikeScrean } from "../../redux/actions/dataActions";

export class LikeButton extends Component {
  likedScrean = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screanId === this.props.screanId
      )
    )
      return true;
    else return false;
  };
  likeScrean = () => {
    this.props.likeScrean(this.props.screanId);
  };
  unlikeScrean = () => {
    this.props.unlikeScrean(this.props.screanId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedScrean() ? (
      <MyButton tip="Undo like" onClick={this.unlikeScrean}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeScrean}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screanId: PropTypes.string.isRequired,
  likeScrean: PropTypes.func.isRequired,
  unlikeScrean: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeScrean,
  unlikeScrean,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
