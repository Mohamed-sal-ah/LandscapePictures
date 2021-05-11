import { screenRoute } from './routes'

export default {
  config: {
    screens: {
      Home: screenRoute.HOME,
      About: screenRoute.ABOUT,
      Category: screenRoute.CATEGORY,
      Explore: screenRoute.EXPLORE,
      Search: screenRoute.SEARCH,
      User: screenRoute.USER,
      Login: {
        screens: {
          SignIn: screenRoute.SIGN_IN,
          SignUp: screenRoute.SIGN_UP,
        }
      },
      Auth: {
        screens: {
          Account: screenRoute.ACCOUNT,
          Upload: screenRoute.UPLOAD,
          UpdateUserInfo: screenRoute.UPDATE_USER_INFO
        }
      }
    },
  },
};
