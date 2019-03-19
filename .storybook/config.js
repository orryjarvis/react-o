import { configure } from '@storybook/react';

const req = require.context('../', true, /_stories\.js$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
