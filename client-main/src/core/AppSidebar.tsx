import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { ScreenSidebar, Tabs, Tab, NoContent } from '@igg/common';

export function AppSidebar() {
  return (
    <ScreenSidebar>
      <Tabs stretch={true}>
        <Tab active={true}>EVT</Tab>
        <Tab>TLK</Tab>
        <Tab>TEAM</Tab>
      </Tabs>
      <NoContent
        message="Sidebar content will be here"
        note="Under construction, hang tight!"
      />
    </ScreenSidebar>
  );
}

export default AppSidebar;
