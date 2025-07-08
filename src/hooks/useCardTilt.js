import { useRef, useState, useEffect } from "react"

export const useCardTilt = () => {
  const ref = useRef(null)
  const [transform, setTransform] = useState("none")
  
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    const handleMouseMove = e => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const midX = rect.width / 2
      const midY = rect.height / 2
      const rotateX = ((y - midY) / midY) * 10
      const rotateY = ((x - midX) / midX) * -10
      setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
    }

    const handleMouseRemove = () =>{
      setTransform("")
    }
    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseleave", handleMouseRemove)

    return () =>  {
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseRemove)

    }
  }, [])

  return [ref, transform]
}

export default useCardTilt