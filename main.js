const DATABASE_NAME = 'db.json';
const DATABASE_FOLDER_PATH = 'database';
const SERVER_PORT = process.env.PORT || 3001;

const url = require('url');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(DATABASE_NAME);
const middlewares = jsonServer.defaults();
const fs = require('fs');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

router.render = (req, res) => {
  const urlObject = url.parse(req.originalUrl, true);
  // console.log(urlObject.search);
  // console.log(urlObject.query);
  // console.log(urlObject.pathname);

  switch (urlObject.pathname) {
    case '/api/user/current':
      {
        const rawMenuData = fs.readFileSync(`${DATABASE_FOLDER_PATH}/menu.json`);
        const menuObject = JSON.parse(rawMenuData);

        const rawUserData = fs.readFileSync(`${DATABASE_FOLDER_PATH}/user.json`);
        const userObject = JSON.parse(rawUserData);

        res.status(200).jsonp({
          menu: menuObject,
          user: userObject
        });
      }
      break;
    case '/api/geographic/list/current':
      {
        const rawAllData = fs.readFileSync(`${DATABASE_FOLDER_PATH}/all.json`);
        const allObject = JSON.parse(rawAllData);

        const rawDefaultLocalData = fs.readFileSync(`${DATABASE_FOLDER_PATH}/default-local.json`);
        const defaultLocalObject = JSON.parse(rawDefaultLocalData);

        const rawLocalsData = fs.readFileSync(`${DATABASE_FOLDER_PATH}/locals.json`);
        const localsObject = JSON.parse(rawLocalsData);

        const rawRegionsData = fs.readFileSync(`${DATABASE_FOLDER_PATH}/regions.json`);
        const regionsObject = JSON.parse(rawRegionsData);

        res.status(200).jsonp({
          all: allObject,
          localDefault: defaultLocalObject,
          locals: localsObject,
          regions: regionsObject
        });
      }
      break;
    case '/api/system-text/key':
      {
        const rawData = fs.readFileSync(`${DATABASE_FOLDER_PATH}/system-text.json`);
        const dbObject = JSON.parse(rawData);

        res.status(200).jsonp(dbObject);
      }
      break;
    case '/api/canteen/favorite':
      {
        const rawCanteenData = fs.readFileSync(`${DATABASE_FOLDER_PATH}/canteen.json`);
        const canteenObject = JSON.parse(rawCanteenData);

        res.status(200).jsonp(canteenObject);
      }
      break;
    case '/api/navigation/get-menu/1/1':
      {
        const rawNavigationData = fs.readFileSync(`${DATABASE_FOLDER_PATH}/navigation.json`);
        const navigationObject = JSON.parse(rawNavigationData);

        res.status(200).jsonp(navigationObject);
      }
      break;
    case '/api/content-page/get-privacy/1':
      {
        const rawPrivacyData = fs.readFileSync(`${DATABASE_FOLDER_PATH}/privacy.json`);
        const privacyObject = JSON.parse(rawPrivacyData);

        res.status(200).jsonp(privacyObject);
      }
      break;
    case '/api/calendar-event/front-end':
      {
        const rawCalendarEventData = fs.readFileSync(`${DATABASE_FOLDER_PATH}/calendar-event.json`);
        const calendarEventObject = JSON.parse(rawCalendarEventData);

        res.status(200).jsonp(calendarEventObject);
      }
      break;
    case '/api/announcement/homepage':
      {
        const rawAnnouncementData = fs.readFileSync(`${DATABASE_FOLDER_PATH}/announcement.json`);
        const announcementObject = JSON.parse(rawAnnouncementData);

        res.status(200).jsonp(announcementObject);
      }
      break;
    case '/api/news/local':
      {
        const rawLocalNewsData = fs.readFileSync(`${DATABASE_FOLDER_PATH}/news-local.json`);
        const localNewsObject = JSON.parse(rawLocalNewsData);

        res.status(200).jsonp(localNewsObject);
      }
      break;
    case '/api/notication':
      {
        const rawNotificationData = fs.readFileSync(`${DATABASE_FOLDER_PATH}/notification.json`);
        const notificationObject = JSON.parse(rawNotificationData);

        res.status(200).jsonp(notificationObject);
      }
      break;
    case '/api/user-onboarding':
      {
        const rawUserOnboardingData = fs.readFileSync(
          `${DATABASE_FOLDER_PATH}/user-onboarding.json`
        );
        const userOnboardingObject = JSON.parse(rawUserOnboardingData);

        res.status(200).jsonp(userOnboardingObject);
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
