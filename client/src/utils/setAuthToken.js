
import axios from 'axios'

//Gan Authorization de cap quyen gui request cho axios toi cac request
export default (token) => {
    if (token) {
        //Apply to every request
        axios.defaults.headers.common['Authorization'] = token;


    }
    else {
        delete axios.defaults.headers.common['Authorization'];

    }
}