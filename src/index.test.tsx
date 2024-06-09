import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

document.body.innerHTML = '<div id="root"></div>';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(),
}));

describe('Index', () => {
  it('renders App component without crashing', () => {
    const root = { render: jest.fn() };
    (createRoot as jest.Mock).mockReturnValue(root);

    require('./index');

    expect(createRoot).toHaveBeenCalledWith(document.getElementById('root'));
    expect(root.render).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
});
