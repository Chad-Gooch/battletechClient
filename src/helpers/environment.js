let APIURL = '';

switch (window.location.hostname) {
    // this is the local host name of your React application
    case 'localhost' || '127.0.0.1':
            //this is base URL of your local server
        APIURL = 'http://localhost:5000';
        break;
    // this is the deployed name of your React application
    case 'https://gooch-battletech-client.herokuapp.com/':
                //this is the base URL of your deployed server
        APIURL = 'https://gooch-battletech-server.herokuapp.com/'
}

export default APIURL;