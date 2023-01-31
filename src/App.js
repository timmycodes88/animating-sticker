import { useEffect, useRef, useState } from "react"
import tw, { styled } from "twin.macro"
import useAnimateToElement from "./useAnimateToElement"

const stickerAnimationTime = 2000

export default function Work() {
  //* If defined (from ChooseSticker in Overlay/EndStep),
  //* this sticker will animate and be set in the header
  const [stickerID, setStickerID] = useState(null)

  return (
    <div className="min-h-screen">
      <WorkHeader stickerID={stickerID} />
      <div id="work body" className="bg-gray-100 h-full">
        <Overlay setStickerID={setStickerID} />
      </div>
    </div>
  )
}

function WorkHeader({ stickerID }) {
  const goalMet = false

  return (
    <div className="bg-blue-300 h-28 w-full pl-[80%] pt-2">
      <Circle stickerID={stickerID} goalMet={goalMet} />
    </div>
  )
}

function Circle({ stickerID, goalMet }) {
  const [showSticker, setShowSticker] = useState(goalMet)
  const circleRef = useRef()
  const stickerRef = useRef()

  //Catch the Sticker from Overly/EndStep
  useEffect(() => {
    let timeout
    if (stickerID) {
      timeout = setTimeout(() => {
        setShowSticker(true)
      }, stickerAnimationTime - 10)
    }
    return () => timeout && clearTimeout(timeout)
  }, [stickerID])

  const { animation, startAnimation, animationFinished } = useAnimateToElement(
    stickerRef,
    circleRef
  )

  useEffect(() => {
    if (showSticker && !goalMet) startAnimation()
  }, [showSticker])

  return (
    <StyledCircle ref={circleRef}>
      {showSticker && (
        <Sticker
          ref={stickerRef}
          show
          animationFinished={animationFinished}
          animation={animation}
          goalMet={goalMet}
        />
      )}
    </StyledCircle>
  )
}
const StyledCircle = tw.div`w-24 h-24 bg-yellow-500 rounded-full flex justify-center items-center`

function Overlay({ setStickerID }) {
  return (
    <div className="flex justify-center items-center h-full">
      <EndStep setStickerID={setStickerID} />
    </div>
  )
}

function EndStep({ setStickerID }) {
  return (
    <div className="relative">
      <ChooseSticker setStickerID={setStickerID} />
    </div>
  )
}

function ChooseSticker({ setStickerID }) {
  const [showSticker, setShowSticker] = useState(false)

  const handlePickSticker = () => {
    setStickerID(1)
    setShowSticker(true)
    setTimeout(() => setShowSticker(false), stickerAnimationTime)
  }

  return (
    <>
      <StickerToChoose onClick={handlePickSticker} />
      <Sticker show={showSticker} />
    </>
  )
}
const StickerToChoose = tw.div`bg-red-400 w-32 h-32`
const Sticker = styled.div(
  ({ show, animationFinished, animation, goalMet }) => [
    tw`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-400`,
    tw`transition-all z-20`,
    show ? tw`scale-100 duration-500` : tw`scale-0 duration-[0ms]`,
    animation,
    (animationFinished || goalMet) &&
      tw`static w-24 h-24 scale-100 translate-x-0 translate-y-0 duration-[0ms]`,
  ]
)
