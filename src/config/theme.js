import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";

const styles = {
    global: props => ({
            body: {
                color: mode('gray.800', 'whiteAlpha.900')(props),
                bg: mode('gray.100', '#141214')(props),
            },
        }),
    };

const components = {
    Modal: {
        // setup light/dark mode component defaults
        baseStyle: props => ({
            dialog: {
                bg: mode('#1A202C', '#1A202C')(props),
            },
        }),
    },
};

const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
}

const theme = extendTheme({
    components,
});
  
export default theme;