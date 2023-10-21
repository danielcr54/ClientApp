import React from 'react';
import { Route } from 'react-router-dom';
import AllNewsListScreen from './AllNewsListScreen';
import NewsArticleDetailScreen from './NewsArticleDetailScreen';

export function NewsRoutes() {
  return (
    <>
      <Route path="/news" exact={true} component={AllNewsListScreen} />
      <Route
        path="/news/:slug"
        exact={true}
        component={NewsArticleDetailScreen}
      />
    </>
  );
}

export default NewsRoutes;
