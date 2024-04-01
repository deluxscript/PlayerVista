export enum Routes {
  HOME='/',
  LOGIN = '/login',
  TEAM = '/team',
  CREATE_TEAM = '/team/create-team',
  MANAGE_TEAM = '/team/:teamId/manage-teams',
  DASHBOARD_CREATE_TEAM = '/team/:teamId/team/create-team',
  DASHBOARD = '/team/:teamId',
  PLAYERS = '/team/:teamId/players',
  ADD_PLAYER = '/team/:teamId/players/add-player',
  SINGLE_PLAYER = '/team/:teamId/players/:playerId',
  STAFFS = '/team/:teamId/staffs',
  TRAINING_DATA = '/team/:teamId/training-data',
  EVENTS = '/team/:teamId/events',
  ACCOUNT= '/dashboard/my-account',
  LOGOUT = '/logout',
  SIGN_UP = '/sign-up',
  FORGOT_PASSWORD = '/forgot-password',
  CHANGE_PASSWORD = '/change-password'
}

export const routes = {
  home: Routes.HOME,
  login: Routes.LOGIN,
  team: Routes.TEAM,
  manageTeam: Routes.MANAGE_TEAM,
  dashboardCreateTeam: Routes.DASHBOARD_CREATE_TEAM,
  createTeam: Routes.CREATE_TEAM,
  signUp: Routes.SIGN_UP,
  dashboard: Routes.DASHBOARD,
  players: Routes.PLAYERS,
  addPlayer: Routes.ADD_PLAYER,
  singlePlayer: Routes.SINGLE_PLAYER,
  staffs: Routes.STAFFS,
  trainingData: Routes.TRAINING_DATA,
  events: Routes.EVENTS,
  account: Routes.ACCOUNT,
  logout: Routes.LOGOUT,
  forgotPassword: Routes.FORGOT_PASSWORD,
  changePassword: Routes.CHANGE_PASSWORD,
}
