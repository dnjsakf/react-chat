/* React */
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

/* Router */
import { useHistory, useLocation } from 'react-router';

/* Material UI */
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

/* Another Modules */
import clsx from 'clsx';

/* Custom Components */
import { CircularProgress } from '@components/Progress';
import { BaseTreeView } from '@components/TreeView';

/* Styles Hook */
const useStyles = makeStyles( theme => ({
  root: {
  },
  sticky: {
    top: "unset",
  },
  divider: {
    margin: theme.spacing(1, 0)
  },
}));

/* Sub Component */
const Navigator = props => {
  /* Props */
  const {
    ...rest
  } = props;
  
  /* Router Hook */
  const location = useLocation();
  
  /* Renderer */
  return (
    <div>
      <span>{ location.pathname }</span>
    </div>
  );
}

/* Main Component */
const SideBarNav = props => {
  /* Props */
  const {
    className,
    items,
    ...rest
  } = props;
  
  /* State */
  const [ selected, setSelected ] = useState( null );
  
  /* Styles Hook */
  const classes = useStyles();
  
  /* Router Hook */
  const history = useHistory();
  const location = useLocation();
  
  /* Handlers */
  const handleClick = useCallback( item => {    
    setSelected( item );    
  }, []);
  
  /* Side Effects */
  useEffect(()=>{
    if( selected && selected.href ){
      history.push( selected.href );
    }
  }, [ selected ]);
  
  /* Renderer */
  return (
    <React.Fragment>
      <Navigator />
      <BaseTreeView
        items={ items }
        onClick={ handleClick }
        selected={ selected }
      />
    </React.Fragment>
  );  
}

/* Main Component Settings */
SideBarNav.propTypes = {
  className: PropTypes.string,
};
SideBarNav.defaultProps = {
  items: [
    {
      id: "Home",
      group: "",
      name: "Home",
      label: "홈",
      href: "/home",
      icon: "Image",
      subItems: []
    },
    {
      id: "Skills",
      group: "",
      name: "Skills",
      label: "기술 스택",
      href: "",
      icon: "Code",
      subItems: [
        {
          id: "Skills/ELK",
          group: "Skills",
          name: "ELK",
          label: "ELK 스택",
          href: "/skills/elk",
          icon: "Code"
        },
        {
          id: "Skills/ETL",
          group: "Skills",
          name: "ETL",
          label: "ETL",
          href: "/skills/etl",
          icon: "Code" 
        },
        {
          id: "Skills/Crawler",
          group: "Skills",
          name: "Crawler",
          label: "크롤링",
          href: "/skills/crawler",
          icon: "Code" 
        },
        {
          id: "Skills/CELERY",
          group: "Skills",
          name: "CELERY",
          label: "CELERY",
          href: "/skills/celery",
          icon: "Code"
        },
      ]
    },
    {
      id: "Settings",
      group: "",
      name: "Settings",
      label: "설정",
      href: "/settings",
      icon: "Settings",
      subItems: []
    }
  ]
}

/* Exports */
export default SideBarNav;