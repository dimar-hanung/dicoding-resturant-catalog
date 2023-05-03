// import NowPlaying from '../views/pages/now-playing';
// import Upcoming from '../views/pages/upcoming';
import Detail from '../views/pages/detail';
import Index from '../views/pages/index';
import Favorite from '../views/pages/favorite';

const routes = {
  '/': Index, // default page
  '/home': Index,
  '/favorite': Favorite,
  //   '/now-playing': NowPlaying,
  //   '/upcoming': Upcoming,
  '/detail/:id': Detail,
};

export default routes;
