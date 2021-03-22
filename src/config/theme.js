import { extendTheme } from "@chakra-ui/react";

const components = {
    Modal: {
        // setup light/dark mode component defaults
        baseStyle: props => ({
            dialog: {
                bg: '#1A202C',
            },
        }),
    },
};

const theme = extendTheme({
    components,
});
  
export default theme;