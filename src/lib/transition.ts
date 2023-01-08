import type { Transition, AnimationProps } from 'framer-motion';

type TransitionReturn = Pick<AnimationProps, 'initial' | 'animate' | 'exit'>;
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
 * @returns an AnimationProps object with initial, animate and exit properties.
 */
export function setTransition({
  typeIn = 'tween',
  typeOut = 'tween',
  delayIn = 0,
  delayOut = 0,
  distance = 50,
  durationIn,
  durationOut
}: setTransitionProps = {}): TransitionReturn {
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
