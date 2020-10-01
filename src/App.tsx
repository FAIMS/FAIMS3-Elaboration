import React, { Fragment, useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import './App.css';
import schema from './schema/tree.json';
import uischema from './schema/treeui.json';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';

const styles = createStyles({
  container: {
    padding: '1em',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
});

export interface AppProps extends WithStyles<typeof styles> {}

const data = {};

const App = ({ classes }: AppProps) => {
  const [displayDataAsString, setDisplayDataAsString] = useState('');
  const [standaloneData, setStandaloneData] = useState(data);

  useEffect(() => {
    setDisplayDataAsString(JSON.stringify(standaloneData, null, 2));
  }, [standaloneData]);

  return (
    <Fragment>
      <Grid
        container
        justify={'center'}
        spacing={1}
        className={classes.container}
      >
        <Grid item sm={6}>
          <Typography variant={'h3'} className={classes.title}>
            Bound data
          </Typography>
          <div className={classes.dataContent}>
            <pre id='boundData'>{displayDataAsString}</pre>
          </div>
        </Grid>
        <Grid item sm={6}>
          <div className={classes.demoform}>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={standaloneData}
              renderers={materialRenderers}
              cells={materialCells}
              onChange={({ errors, data }) => setStandaloneData(data)}
            />
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(App);
