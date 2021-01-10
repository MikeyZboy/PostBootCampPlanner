import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function FormPropsTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="First Name"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Last Name"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Email"
          autoComplete="current-email"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          type="Password"
          autoComplete="current-password"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Bootcamp"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Your Primary Goal"
          variant="outlined"
        />
      </div>
    </form>
  );
}
