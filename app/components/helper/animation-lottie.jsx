"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

const AnimationLottie = ({ animationPath, width }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => setIsMounted(true), [])

  if (!isMounted) return null

  return (
    <Lottie
      animationData={animationPath}
      loop={true}
      style={{ width: width || "100%" }}
    />
  )
}

export default AnimationLottie



// "use client"

// import Lottie from "lottie-react";

// const AnimationLottie = ({ animationPath, width }) => {
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationPath,
//     style: {
//       width: '95%',
//     }
//   };

//   return (
//     <Lottie {...defaultOptions} />
//   );
// };

// export default AnimationLottie;