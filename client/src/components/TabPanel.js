import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import Achievements from '../pages/Achievements'
import Lessons from '../pages/Lessons'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab to="/home" label="Home" icon={<HomeIcon />} {...a11yProps(0)} />
          <Tab to="/lessons" label="Learnings" icon={<MenuBookIcon />} {...a11yProps(1)} />
          <Tab label="Resources" icon={<PersonPinIcon />} {...a11yProps(2)} />
          <Tab
            to="/achievements"
            label="Achievements"
            icon={<CollectionsBookmarkIcon />}
            {...a11yProps(3)}
            
          />
          <Tab label="Sign Out" icon={<ExitToAppIcon />} {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Home
      </TabPanel>
      <TabPanel to="/lessons" value={value} index={1}>
        Lessons
      </TabPanel>
      <TabPanel value={value} index={2}>
        Resources
      </TabPanel>
      <TabPanel value={value} index={3}>
        Achievements
      </TabPanel>
      <TabPanel value={value} index={4}>
        Sign Out
      </TabPanel>
    </div>
  );
}
