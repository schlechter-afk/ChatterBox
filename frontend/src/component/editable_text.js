import React from "react";
import PropTypes from "prop-types";
// import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { yellow } from "@material-ui/core/colors";

var editfirst;
var editlast;
var edituser;
var editcontact;
var editage;

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: 6,
    color: yellow,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    backgroundColor : "skyblue",
    fontSize: 30,
    opacity: 1,
    borderBottom: 0,
    "&:before": {
      borderBottom: 0
    }
  },
  disabled: {
    color: "black",
    borderBottom: 0,
    "&:before": {
      borderBottom: 0
    }
  },
  btnIcons: {
    marginLeft: 10
  }
});

class EditableTextField extends React.Component {
  state = {
    email: "johndoe@domain.com",
    editMode: false,
    mouseOver: false,
  };

  handleChange = event => {
    console.log("inside handle change");
    console.log(this.props.namecl);
    this.setState({ [event.target.name]: event.target.value });
    if(this.props.namecl == "firstcl")
    {
      console.log("editfirst is " + event.target.value);
      editfirst = event.target.value;
      console.log("editfirst is " + event.target.value);
    }
    if(this.props.namecl == "lastcl")
    {
      console.log("editlast is " + event.target.value);
      editlast = event.target.value;
      console.log("editlast is " + event.target.value);
    }
    if(this.props.namecl == "usercl")
    {
      console.log("edituser is " + event.target.value);
      edituser = event.target.value;
      console.log("edituser is " + event.target.value);
    }
    if(this.props.namecl == "contactcl")
    {
      console.log("editcontact is " + event.target.value);
      editcontact = event.target.value;
    }
    if(this.props.namecl == "agecl")
    {
      console.log("editage is " + event.target.value);
      editage = event.target.value;
    }
  };

  handleMouseOver = event => {
    if (!this.state.mouseOver) {
      this.setState({ mouseOver: true });
    }
  };

  handleMouseOut = event => {
    // The problem is here!!!
    if (this.state.mouseOver) {
      this.setState({ mouseOver: false });
    }
  };

  handleClick = () => {
    this.setState({
      editMode: true,
      mouseOver: false
    });
  };

  render() {
    const { classes, value, namecl } = this.props;

    return (
      <div className={classes.container}>
        {/* <div
          style={{
            textAlign: "left",
            color: "red",
            fontSize: "16px",
            width: "100%",
            backgroundColor: "yellow",
            padding: "5px",
            lineHeight: "25px"
          }}
        >
          <ul>
            <li>Email: {JSON.stringify(this.state.email)}</li>
            <li>editMode: {JSON.stringify(this.state.editMode)}</li>
            <li>mouseOver: {JSON.stringify(this.state.mouseOver)}</li>
          </ul>
        </div> */}
        <TextField
          name="email"
          defaultValue={value}
          margin="normal"
          error={this.state.email === ""}
          onChange={this.handleChange}
          disabled={!this.state.editMode}
          className={classes.textField}
          onMouseEnter={this.handleMouseOver}
          onMouseLeave={this.handleMouseOut}
          InputProps={{
            classes: {
              disabled: classes.disabled
            },
            endAdornment: this.state.mouseOver ? (
              <InputAdornment position="end">
                <IconButton onClick={this.handleClick}>
                  <Edit />
                </IconButton>
              </InputAdornment>
            ) : (
              ""
            )
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(EditableTextField);
export {editage,edituser,editlast,editfirst,editcontact};