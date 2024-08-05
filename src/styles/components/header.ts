import { styled } from "..";

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',

})

export const CartBtn = styled('button', {
  position: 'relative',
  backgroundColor: '$gray800',
  color: '$gray300',
  padding: '0.5rem 1rem',
  borderRadius: 8,
  border: 0,
  cursor: 'pointer',
  fontWeight: 'bold',

  div: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',

    border: '3px solid $gray900',

    backgroundColor: '$green500',
    borderRadius: '50%',
    width: '2rem',
    height: '2rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    fontSize: '$md',
    fontWeight: 'bold',
    color: '$white',
  }

})