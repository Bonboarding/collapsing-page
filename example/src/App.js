import React, { useState } from 'react';

import CollapsingPage from 'collapsing-page';
import 'collapsing-page/dist/index.css';

import logo from './logo.png';

const App = () => {
  const [collapse, setCollapse] = useState(false);

  return (
    <>
      <div className="page">
        <div className="header">
          <nav>
            <ul>
              <li>
                <img src={logo} alt="Collapsing Page Demo" className="logo" />
              </li>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#users">Users</a>
              </li>
              <li>
                <a href="#settings">Settings</a>
              </li>
              <li>
                <button type="button" onClick={() => setCollapse(true)}>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="content">
          <div className="articles">
            <article>
              <div>
                <h2>Article title</h2>
                <p>
                  Posted on{' '}
                  <time dateTime="2020-11-11T16:31:24+02:00">
                    November 11th 2020
                  </time>{' '}
                  by <a href="#author">Johnny Fekete</a> -{' '}
                  <a href="#comments">6 comments</a>
                </p>
              </div>
              <p>
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas.
              </p>
            </article>

            <article>
              <div>
                <h2>Article title</h2>
                <p>
                  Posted on{' '}
                  <time dateTime="2020-09-04T16:31:24+02:00">
                    September 4th 2020
                  </time>{' '}
                  by <a href="#author">Johnny Fekete</a> -{' '}
                  <a href="#comments">6 comments</a>
                </p>
              </div>
              <p>
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas.
              </p>
            </article>
          </div>

          <aside>
            <h2>About section</h2>
            <p>
              Donec eu libero sit amet quam egestas semper. Aenean ultricies mi
              vitae est. Mauris placerat eleifend leo.
            </p>
          </aside>
        </div>

        <footer>
          <p>{new Date().getFullYear()}</p>
        </footer>
      </div>
      <CollapsingPage collapse={collapse}>
        <div className="after-collapse">
          <h1>This will stay when everything else's gone</h1>
        </div>
      </CollapsingPage>
    </>
  );
};

export default App;
