import { createTheme } from "@mantine/core";

const theme = createTheme({
    defaultGradient: {
        from: "orange",
        to: "red",
        deg: 45,
    },
    primaryColor: "orange",
    primaryShade: 6,
});

export default theme;
