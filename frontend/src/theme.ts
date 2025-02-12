import { createTheme } from "@mantine/core";

const theme = createTheme({
    defaultGradient: {
        from: "orange",
        to: "red",
        deg: 45,
    },
    primaryColor: "red",
});

export default theme;
