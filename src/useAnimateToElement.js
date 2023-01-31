import { useState } from "react"
import { css } from "twin.macro"

/**
 *
 * @param {RefObject} fromRef
 * @param {RefObject} toRef
 * @param {number} [duration]
 * @returns {
 * animation: css,
 * startAnimation: function,
 * animationFinished: boolean
 * }
 */
export default function useAnimateToElement(fromRef, toRef, duration = 1000) {
  const [animation, setAnimation] = useState(null)
  const [animationFinished, setAnimationFinished] = useState(false)

  const startAnimation = () => {
    setAnimation(animateToElement(getCSSPositions(fromRef, toRef), duration))
    setTimeout(() => setAnimationFinished(true), duration)
  }

  return { animation, startAnimation, animationFinished }
}

/**
 * For Creating CSS Keyframes
 * @typedef RefRectProps
 * @property {number} fromTop
 * @property {number} fromLeft
 * @property {number} fromWidth
 * @property {number} fromHeight
 * @property {number} toTop
 * @property {number} toLeft
 * @property {number} toWidth
 * @property {number} toHeight
 */

/**
 * Creates RefReactProps for animateToElement
 * @param {RefObject} fromRef
 * @param {RefObject} toRef
 * @returns {RefRectProps} RefRectProps
 */
function getCSSPositions(fromRef, toRef) {
  if (!fromRef || !toRef)
    return console.log(
      "To use this hook, make sure both refs exist before you activate it"
    )
  const fromRect = fromRef.current.getBoundingClientRect()
  const toRect = toRef.current.getBoundingClientRect()
  return {
    fromTop: fromRect.y + fromRect.height / 2,
    fromLeft: fromRect.x + fromRect.width / 2,
    fromWidth: fromRect.width,
    fromHeight: fromRect.height,
    toTop: toRect.y + toRect.height / 2,
    toLeft: toRect.x + toRect.width / 2,
    toWidth: toRect.width,
    toHeight: toRect.height,
  }
}

/**
 *
 * @param {RefRectProps} RefReactProps
 * @param {number} [duration]
 * @returns {css} Animation & KeyFrames
 */
const animateToElement = (
  {
    fromTop,
    fromLeft,
    fromWidth,
    fromHeight,
    toTop,
    toLeft,
    toWidth,
    toHeight,
  },
  duration = 1000
) =>
  css`
    animation: animateToElement ${duration}ms ease-in-out;
    animation-fill-mode: forwards;
    @keyframes animateToElement {
      from {
        top: ${fromTop}px;
        left: ${fromLeft}px;
        width: ${fromWidth}px;
        height: ${fromHeight}px;
      }
      to {
        top: ${toTop}px;
        left: ${toLeft}px;
        width: ${toWidth}px;
        height: ${toHeight}px;
      }
    }
  `
