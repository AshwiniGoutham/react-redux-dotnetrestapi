import React from 'react';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        width: 160,
        height: 4,
        paddingTop: 10,
        fontSize: 10,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: '{fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem',
            borderColor: theme.palette.primary.main,
        },
    },

}))(InputBase);

const drawerWidth = 100;
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      paddingTop:60,
      paddingLeft:20
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width:700,
        height:300
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      appBar: {
        marginLeft: drawerWidth,
        height:20,
        backgroundColor:'blue',
        [theme.breakpoints.up('sm')]: {
            width: 'calc(100% - ${drawerWidth}px)',
          },
      }
  }));
  

function ToolBarPowerSearch (props){
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            </Toolbar>
        </AppBar>
    )
}
function EquipmentFamilyDropdown (props){
    const classes = useStyles();
    return (
        // <FormControl className={classes.formControl}>
        <NativeSelect
          value={props.state.equipFamily.familyName}
          name="equipFamily"
          className={classes.selectEmpty}
        >
          <option value="">None</option>
          { 
              props.state.equipFamily.map((item,index) =>(
                <option key={index} value={item.familyId}>{item.familyName}</option>
              ))
          } 
        </NativeSelect>  
    //   </FormControl>
    )
}

function CtsPowerSearch (props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        {/* <ToolBarPowerSearch/> */}
                         <table>
                             <tbody>
                             <tr >
                                 <td align="right"><span>Tool Number :</span></td>
                                 <td align="left"><BootstrapInput name="toolNumber" id="toolNumber"/></td>
                             </tr>
                             <tr>
                                 <td align="right"><span>Equipment Family :</span></td>
                                 <td align="left"><EquipmentFamilyDropdown state={props.state}/></td>
                             </tr>
                             </tbody>
                         </table>     
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

class PowerSearch extends React.Component {
    constructor(props){
        super(props);
        this.state =({
            equipFamily:[]
        })
    }
    componentDidMount() {
        fetch("http://localhost:63918/api/CTS")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
                equipFamily: result
            });
           // alert(this.state.equipFamily.length)
          },
          (error) => {
            this.setState({
              error
            });
          }
        )
    }  
    render() {
        return (
            <div>
                <CtsPowerSearch state={this.state}/>
            </div>
        )
    }
}

export default PowerSearch;