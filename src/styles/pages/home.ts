import { styled } from "..";

export const HomeContainer = styled('div', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  minHeight: 656,
  margin: 'auto',
})

export const NavigationWrapper = styled('main', {
  position: 'relative',
  margin: 'auto',
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    
    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',
    
    div: {	
      display: 'flex',
      flexDirection: 'column',
    },
    
    button: {
      width: '56px',
      height: '56px',
      borderRadius: 6,
      border: 'none',
      backgroundColor: '$green300',
      color: '$white',
      cursor: 'pointer',
    },

    strong: {
      fontSize: '$lg',
      color: '$gray100',
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300'
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1
    }
  }
})

export const ArrowLeftContainer = styled('div', {
  left: '5px',
  width: '30px',
  height: '30px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  webkitTransform: 'translateY(-50%)',
  fill:' #fff',
  cursor: 'pointer',

  '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
})

export const ArrowRightContainer = styled('div', {
  left: 'auto',
  right: '5px',
  width: '30px',
  height: '30px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  webkitTransform: 'translateY(-50%)',
  fill:' #fff',
  cursor: 'pointer',

  '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
})