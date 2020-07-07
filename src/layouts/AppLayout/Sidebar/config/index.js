import React from 'react';
import EventIcon from '@material-ui/icons/Event';
import HomeIcon from '@material-ui/icons/Home';

const navConfig = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    href: '/',
  },
  {
    title: 'Calender',
    icon: <EventIcon />,
    href: '/calender',
  },
];

export { navConfig };