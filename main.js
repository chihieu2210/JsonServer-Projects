const path = require('path');
const url = require('url');
const fs = require('fs').promises;
const jsonServer = require('json-server');

const DATABASE_NAME = 'db.json';
const DATABASE_FOLDER_PATH = path.join(__dirname, 'database');
const SERVER_PORT = process.env.PORT || 3001;

const server = jsonServer.create();
const router = jsonServer.router(DATABASE_NAME);
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use(async (req, _res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

router.render = async (req, res) => {
  const urlObject = url.parse(req.originalUrl, true);

  switch (urlObject.pathname) {
    case '/api/portfolio/career':
      {
        const objectName = 'career';

        const jsonData = await fs.readFile(
          path.join(DATABASE_FOLDER_PATH, `portfolio/${objectName}.json`),
          'utf8'
        );
        const jsonObject = JSON.parse(jsonData);

        res.status(200).jsonp({
          [objectName]: jsonObject
        });
      }
      break;

    case '/api/portfolio/gallery':
      {
        const objectName = 'gallery';

        const jsonData = await fs.readFile(
          path.join(DATABASE_FOLDER_PATH, `portfolio/${objectName}.json`),
          'utf8'
        );
        const jsonObject = JSON.parse(jsonData);

        res.status(200).jsonp({
          [objectName]: jsonObject
        });
      }
      break;

    case '/api/angular-sandbox/events':
      {
        const objectName = 'events';

        const jsonData = await fs.readFile(
          path.join(DATABASE_FOLDER_PATH, `angular-sandbox/${objectName}.json`),
          'utf8'
        );
        const jsonObject = JSON.parse(jsonData);

        res.status(200).jsonp(jsonObject);
      }
      break;

    case '/api/angular-sandbox/recipes':
      {
        const objectName = 'recipes';

        const jsonData = await fs.readFile(
          path.join(DATABASE_FOLDER_PATH, `angular-sandbox/${objectName}.json`),
          'utf8'
        );
        const jsonObject = JSON.parse(jsonData);

        res.status(200).jsonp(jsonObject);
      }
      break;

    default:
      res.jsonp(res.locals.data);
      break;
  }
};

// Use default router
server.use('/api', router);
server.listen(SERVER_PORT, () => {
  console.log(`JSON Server is running on port ${SERVER_PORT}`);
});
