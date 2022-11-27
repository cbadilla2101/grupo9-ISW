const app = require('./app');
const dbConnect = require('./database');

async function main() {
  await dbConnect();

  app.listen(app.get('port'));

  console.log('Servidor en http://localhost:' + app.get('port'));
}

main();