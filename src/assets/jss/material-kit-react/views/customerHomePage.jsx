import { conatinerFluid } from "assets/jss/material-kit-react.jsx";

const customerHomePageStyle = {
    container: {
        ...conatinerFluid,
        zIndex: "2",
        position: "relative",
        paddingTop: "10vh",
    },    
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: "3",
      },
      mainRaised: {
        margin: "0px 0px 0px",
        borderRadius: "6px",
        boxShadow:
          "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
      },
      filter:{
        padding:"25px 50px",
      }
}; 

export default customerHomePageStyle;