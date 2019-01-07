import axios from 'axios';

const apiKey = "78fa30f6b70c79b960afd1d38d45117c";

function BeerRun(props){
    let callURL = props.CallType + "?key=" + apiKey;
    axios.get(callURL).then(response => console.log(response))
}

export default BeerRun;