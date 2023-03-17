// PulsatingImage.tsx
import styled, { keyframes } from 'styled-components';

const pulsate = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

interface PulsatingImageProps {
  src: string;
  alt: string;
  duration?: number;
}

const StyledPulsatingImage = styled.img<PulsatingImageProps>`
  animation: ${pulsate} ${({ duration }) => duration || 1}s ease-in-out infinite;
  height: 10rem;
  width: 10rem;
  object-fit: contain;
`;

const PulsatingImage: React.FC<PulsatingImageProps> = ({ src, alt, duration }) => {
  return <StyledPulsatingImage src={src} alt={alt} duration={duration} />;
};

export default PulsatingImage;
