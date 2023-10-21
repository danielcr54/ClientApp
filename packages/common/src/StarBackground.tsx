import React from 'react';
import Particles from 'react-particles-js';

export function StarBackground() {
  return (
    <Particles
      style={{
        position: 'fixed',
        zIndex: -1
      }}
      params={{
        particles: {
          number: {
            value: 150,
            density: {
              enable: true,
              value_area: 1500
            }
          },
          line_linked: {
            enable: true,
            opacity: 0.01
          },
          move: {
            direction: 'top',
            speed: 0.15
          },
          size: {
            value: 1
          },
          opacity: {
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.05
            }
          }
        },
        retina_detect: true
      }}
    />
  );
}

export default StarBackground;
