import type { MotionProps, Transition } from 'framer-motion';

type SetTransition = Pick<MotionProps, 'initial' | 'animate' | 'exit'>;
type TransitionType = 'spring' | 'tween' | 'inertia';

type setTransitionProps = {
  typeIn?: TransitionType;
  typeOut?: TransitionType;
  delayIn?: number;
  delayOut?: number;
  distance?: number;
  durationIn?: number;
  durationOut?: number;
};

/**
 * Set the transition for the component.
 *
 * @param transitionProps a set of props to set the transition.
 * @returns MotionProps object with initial, animate, and exit.
 */
export function setTransition({
  typeIn = 'tween',
  typeOut = 'tween',
  delayIn = 0,
  delayOut = 0,
  distance = 50,
  durationIn,
  durationOut
}: setTransitionProps = {}): SetTransition {
  const transitionIn: Transition = {
    type: typeIn,
    delay: delayIn,
    duration: durationIn
  };

  const transitionOut: Transition = {
    type: typeOut,
    delay: delayOut,
    duration: durationOut
  };

  return {
    initial: {
      opacity: 0,
      y: distance
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: transitionIn
    },
    exit: {
      opacity: 0,
      y: distance,
      transition: transitionOut
    }
  };
}

type FadeInWhenVisible = Pick<
  MotionProps,
  'viewport' | 'initial' | 'whileInView' | 'transition'
>;

/**
 * Set the component to fade in when it's visible.
 *
 * @returns MotionProps object with viewport, initial, whileInView and transition properties.
 */
export function fadeInWhenVisible(): FadeInWhenVisible {
  return {
    viewport: { margin: '0px 0px -240px' },
    initial: { y: 50, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    transition: { type: 'tween' }
  };
}
