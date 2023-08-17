import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const CollapsingPage = ({ collapse, duration, onFinish, children }) => {
  // Reference for the content, that will stay after the collapsing effect
  const contentRef = useRef(false);

  // If the prop `collapse` becomes true, execute the collapse effect
  useEffect(() => {
    if (!collapse) {
      return;
    }

    // Get the current styles of the document (for the unmounting)
    const originalOverflow = document.body.style.overflow;
    const originalPointerEvents = document.body.style.pointerEvents;

    // Execute the collapsing effect
    collapsePage({ duration, onFinish, excludedElement: contentRef.current });

    // Destructor - move back the elements to their original position
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.pointerEvents = originalPointerEvents;

      const elements = document.querySelectorAll('body > *, body div');

      [].forEach.call(elements, (element) => {
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
  }, [collapse]);

  if (!collapse) {
    return null;
  }

  return createPortal(<div ref={contentRef}>{children}</div>, document.body);
};

CollapsingPage.propTypes = {
  collapse: PropTypes.bool.isRequired,
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
 * Alternative version, plain JS function without React
 *
 * @param number duration (default 8000)
 * @param function onFinish
 * @param DOMElement excludedElement
 */
export const collapsePage = (params = {}) => {
  const duration = params.duration || 8000;
  const onFinish = params.onFinish || null;
  const excludedElement = params.excludedElement || null;

  // Get all elements that are immediate children of body, and all divs
  const elements = document.querySelectorAll('body > *, body div');

  // Get the total height of the document
  const height = getDocumentHeight();

  // Set the styles of the document
  document.body.style.overflow = 'hidden';
  document.body.style.pointerEvents = 'none';

  let maxDuration = 0;

  // Loop through all elements that will be animated
  [].forEach.call(elements, (element) => {
    // Ignore the content and its children, that will stay on screen after the logout
    if (element === excludedElement || isDescendant(excludedElement, element)) {
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

  if (typeof onFinish === 'function') {
    setTimeout(() => onFinish(), maxDuration);
  }
};

/**
 * Check, if an element is a descendant of another in the DOM
 *
 * @param DOMElement parent
 * @param DOMElement child
 */
const isDescendant = (parent, child) => {
  if (!child || !child.parentNode) {
    return false;
  }

  let node = child.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

/**
 * Get total height of document
 *
 * @return number
 */
const getDocumentHeight = () => {
  const { body } = document;
  const html = document.documentElement;

  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
};
