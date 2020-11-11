import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const CollapsingPage = ({ destroy, duration, onFinish, children }) => {
  // Reference for the content, that will stay after the collapsing effect
  const contentRef = useRef(false);

  // If the prop `destroy` becomes true, execute the collapse effect
  useEffect(() => {
    if (!destroy) {
      return;
    }

    // Get all elements that are immediate children of body, and all divs
    const elements = document.querySelectorAll('body > *, body div');

    // Get the total height of the document
    const { body } = document;
    const html = document.documentElement;

    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    const originalOverflow = document.body.style.overflow;
    const originalPointerEvents = document.body.style.pointerEvents;
    document.body.style.overflow = 'hidden';
    document.body.style.pointerEvents = 'none';

    let maxDuration = 0;

    // Loop through all elements that will be animated
    [...elements].forEach((element) => {
      // Ignore the content and its children, that will stay on screen after the logout
      if (
        element === contentRef.current ||
        isDescendant(contentRef.current, element)
      ) {
        element.style.pointerEvents = 'all';
        return;
      }

      // Get original values for each element, so they can be moved back after the animation is done
      const originalValues = {
        pointerEvents: element.style.pointerEvents,
        transition: element.style.transition,
        transitionDelay: element.style.transitionDelay,
        transform: element.style.transform
      };

      element.setAttribute(
        'data-original-values',
        JSON.stringify(originalValues)
      );

      element.style.pointerEvents = 'none';

      // Calculate unique animation values
      const delay = Math.random() * (duration * 0.375); // wait between 0 and 3 seconds
      const rotate = Math.random() * 30 - 15; // rotate with max 10 degrees
      const moveX = Math.random() * 160 - 80; // move with 50px to either direction
      const speed = Math.random() * (duration * 0.375) + duration * 0.25; // speed between 2 and 5 seconds

      if (maxDuration < delay + speed) {
        maxDuration = delay + speed;
      }

      element.style.transition = `transform ${speed}ms ease-out`;
      element.style.transitionDelay = `${delay}ms`;
      element.style.transform = `translateY(${
        height * 1.5
      }px) translateX(${moveX}px) rotate(${rotate}deg)`;
    });

    setTimeout(() => onFinish(), maxDuration);

    // Destructor - move back the elements to their original position
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.pointerEvents = originalPointerEvents;

      [...elements].forEach((element) => {
        if (element.getAttribute('data-original-values')) {
          const originalValues = JSON.parse(
            element.getAttribute('data-original-values')
          );

          element.style.pointerEvents = originalValues.pointerEvents;
          element.style.transition = originalValues.transition;
          element.style.transitionDelay = originalValues.transitionDelay;
          element.style.transform = originalValues.transform;
        }
      });
    };
  }, [destroy]);

  if (!destroy) {
    return null;
  }

  return createPortal(<div ref={contentRef}>{children}</div>, document.body);
};

CollapsingPage.propTypes = {
  destroy: PropTypes.bool.isRequired,
  duration: PropTypes.number,
  onFinish: PropTypes.func,
  children: PropTypes.node
};

CollapsingPage.defaultProps = {
  duration: 8000,
  onFinish: () => {},
  children: null
};

export default CollapsingPage;

/**
 * Check, if an element is a descendant of another in the DOM
 *
 * @param DOMElement parent
 * @param DOMElement child
 */
const isDescendant = (parent, child) => {
  let node = child.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};
