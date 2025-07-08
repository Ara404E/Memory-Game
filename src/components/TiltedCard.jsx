import useCardTilt from "../hooks/useCardTilt"
import '../styles/Card/TiltedCard.css'

export const TiltedCard = ({src,name, isClicked, onClick  }) => {
    const [cardRef, transform] = useCardTilt()

    return (
        <img 
        src={src}
        alt={name}
        ref={cardRef}
        onClick={onClick}
        className={
            `rounded-lg border-4 border-black 
            transition-transform duration-2 duration-200 
            card-image ${isClicked && 'clicked'}
            `
        }
        style={{transform}}
        />
    )
}