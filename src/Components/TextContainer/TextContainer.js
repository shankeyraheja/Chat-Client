import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1> Users Online <span role="img" aria-label="emoji">💬</span></h1>
    {// <h2>Created with React, Express, Node and Socket.IO <span role="img" aria-label="emoji">❤️</span></h2>
      // <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2>
    }
    </div>
    {
      users
        ? (
          <div>
            <div className="activeContainer">
              <h2>
                {users.users.map(({name}) => (
                  <div key={name} className="activeItem">
                    <img className="img" alt="Online Icon" src={onlineIcon}/>
                    {name}

                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;
