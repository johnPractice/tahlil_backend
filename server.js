const app = require('./src/app');
const constants = require('./constants');
const initiate = require('./src/app');
const port = constants.portLocal;


initiate()
    .then(app => app.listen(port))
    .then(() => {
        console.clear();
        console.log('Server is up on port ' + port);
    });

//app.listen(port, () => {
//    console.clear();
//    console.log('Server is up on port ' + port);

//});