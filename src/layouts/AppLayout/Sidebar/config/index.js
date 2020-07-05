import React from 'react';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const navConfig = [
  {
    title: 'Home',
    icon: <InboxIcon />,
    href: '/',
  },
  {
    title: 'Calender',
    icon: <MailIcon />,
    href: '/calender',
  },
];

export { navConfig };