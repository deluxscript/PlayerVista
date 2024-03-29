import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { routes } from './constants/routes'
import { useAppController } from './hooks/useAppController'
import { getCookie } from './services/cookies'

import { Home } from './views/Home/Home'
import { Login } from './views/Login/Login'
import { Dashboard } from './views/Dashboard/Dashboard'
import { PlayersView } from './views/PlayersView/PlayersView'
import { SinglePlayerView } from './views/SinglePlayerView/SinglePlayerView'
import { TrainingData } from './views/TrainingData/TrainingData'
import { Events } from './views/Events/Events'
import { MyAccount } from './views/MyAccount/MyAccount'
import { Spinner } from './component/Spinner/Spinner'
import { AddPlayer } from './views/PlayersView/AddPlayer/AddPlayer'
import { SignUp } from './views/SignUp/SignUp'
import { ForgotPassword } from './views/ForgotPassword/ForgotPassword'
import { ChangePasswordView } from './views/ChangePasswordView/ChangePasswordView'
import { TeamView } from './views/TeamView/TeamView'
import { CreateTeam } from './views/TeamView/CreateTeam/CreateTeam'
import { ManageTeam } from './views/ManageTeam/ManageTeam'
import { Staffs } from './views/UserManagementView/Staffs/Staffs'

export const AppRoutes: FC = () => {
  const controller = useAppController()

  const { user, players } = controller
  const accessToken = getCookie('access-token')

  if (user.data === undefined && accessToken) {
    return <Spinner />
  }

  if (!user.data) {
    return (
      <>
        <Routes>
          <Route path={routes.home} element={<Home />}/>
          <Route path={routes.login} element={<Login controller={controller} />} />
          <Route path={routes.signUp} element={<SignUp controller={controller} />} />
          <Route path={routes.forgotPassword} element={<ForgotPassword />} />
          <Route path={routes.changePassword} element={<ChangePasswordView />} />
          <Route path='*' element={<Navigate replace to={routes.login} />} />
        </Routes>
      </>
    )
  }

  return (
    <>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.team} element={<TeamView teams={controller.teams} />} />
        <Route path={routes.createTeam} element={<CreateTeam />} />
        <Route path={routes.dashboard}
          element={<Dashboard teamResult={controller.team.teamResult}
            teams={controller.teams} />} />
        <Route path={routes.manageTeam} element={<ManageTeam teams={controller.teams} />} />
        <Route path={routes.players} element={<PlayersView players={players} />}/>
        <Route path={routes.addPlayer} element={<AddPlayer />}/>
        <Route path={routes.singlePlayer} element={<SinglePlayerView/>}/>
        <Route path={routes.staffs} element={<Staffs />}/>
        <Route path={routes.trainingData} element={<TrainingData />}/>
        <Route path={routes.events} element={<Events />}/>
        <Route path={routes.account} element={<MyAccount/>}/>
        <Route path={routes.logout} element={<MyAccount/>}/>
        <Route path={routes.login} element={<Login controller={controller} />} />
      </Routes>
    </>
  )
}
