import { createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';

const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
        secondary: {
            main: lightBlue['A200']
        },
        type: 'light',
    },
})

export default theme
