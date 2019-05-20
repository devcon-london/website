import { configure } from '@storybook/react';

const req = require.context('../src', true, /stories.jsx$/);

configure(() => req.keys().forEach(req), module);
