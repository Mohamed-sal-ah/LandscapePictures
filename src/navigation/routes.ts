export enum screenRoute {
    HOME = '/',
    CATEGORY = '/category/*',
    USER = '/user/*',
    EXPLORE = '/explore',
    ABOUT = '/about',
    SEARCH = '/search',
    ACCOUNT = '/auth/account',
    UPLOAD = '/auth/upload',
    UPDATE_USER_INFO = '/auth/update_user_info',
    USER_STACK = '/user',
    LOGIN_STACK = '/login',
    SIGN_IN = '/sign_in',
    SIGN_UP = '/sign_up',
}

export enum screenName {
    NOT_FOUND = 'NotFound',
    HOME = 'Home',
    CATEGORY = 'Category',
    USER = 'User',
    EXPLORE = 'Explore',
    ABOUT = 'About',
    SEARCH = 'Search',
    USER_STACK = 'Auth',
    LOGIN_STACK = 'Login'
}

export enum stackName {
    USER_STACK = 'auth',
    LOGIN_STACK = 'login'
}

export enum OnAuthScreenName {
    ACCOUNT = 'Account',
    UPLOAD = 'Upload',
    UPDATE_USER_INFO = 'UpdateUserInfo'
}

export enum LoginScreenName {
    SIGN_IN = 'SignIn',
    SIGN_UP = 'SignUp',
}