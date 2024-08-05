import { styled } from "..";

export const CartContainer = styled("aside", {
  position: "absolute",
  top: 0,

  zIndex: 999,

  height: "100vh",
  background: "$gray800",
  width: "480px",
  display: "flex",
  flexDirection: "column",
  padding: "3rem",

  transition: "all 0.2s ease-in-out",

  variants: {
    open: {
      true: {
        right: 0,
        boxShadow: '-7px 0px 20px 0px $gray900',
      },
      false: {
        right: -480,
      },
    },
  },

  h2: {
    fontSize: "$md",
    color: "$gray100",
    marginBottom: "2rem",
  },
});

export const Header = styled("div", {
  position: "relative",
});

export const QuantityAndPrice = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
});

export const CloseBtn = styled("button", {
  position: "absolute",
  background: "none",
  border: "none",
  padding: "0",
  font: "inherit",
  cursor: "pointer",
  outline: "inherit",

  top: "-10px",
  right: "-10px",

  svg: {
    color: "$gray300",

    "&:hover": {
      color: "$gray100",
    },
  },
});

export const ProductsWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  flex: 1,
});

export const ProductContainer = styled("div", {
  display: "flex",
  height: 94,
});

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 102,
  height: 93,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});

export const ProductInfo = styled("div", {
  display: "flex",
  flexDirection: "column",

  width: "100%",

  justifyContent: "space-evenly",
  marginLeft: "1.25rem",

  span: {
    display: "block",
    fontSize: "$md",
    color: "$gray300",
  },

  strong: {
    marginBottom: "0.5rem",
    display: "block",
    fontSize: "$md",
    color: "$gray100",
  },

  button: {
    backgroundColor: "transparent",
    color: "$green500",
    marginTop: "auto",
    background: "none",
    border: "none",
    padding: "0",
    font: "inherit",
    cursor: "pointer",
    outline: "inherit",
  },
});

export const GeneralInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  marginTop: "auto",
  marginBottom: 55,
});

export const Quantity = styled("div", {
  display: "flex",
  justifyContent: "space-between",

  span: {
    fontSize: "$sm",
    color: "$gray300",
  },

  strong: {
    fontSize: "$md",
    color: "$gray300",
  },
});

export const Value = styled("div", {
  display: "flex",
  justifyContent: "space-between",

  span: {
    fontSize: "$md",
    color: "$gray100",
  },

  strong: {
    fontSize: "$xl",
    color: "$gray100",
  },
});

export const Button = styled("button", {
  marginTop: "auto",
  backgroundColor: "$green300",
  border: 0,
  color: "$white",
  borderRadius: 8,
  padding: "1.25rem",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "$md",
  width: "100%",

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  "&:not(:disabled):hover": {
    backgroundColor: "$green500",
  },
});
