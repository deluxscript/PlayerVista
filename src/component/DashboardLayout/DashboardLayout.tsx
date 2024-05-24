import React, { FC, PropsWithChildren } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import Person2Icon from '@mui/icons-material/Person2'

import { useAppController } from '../../hooks/useAppController'
import { TeamResult } from '../../api'
import { setCurrentTeam } from '../../utils/localStorage.ts'
import { getPlayersThunk } from '../../store/slices/PlayersSlice.ts'
import { getEventsThunk } from '../../store/slices/EventsSlice.ts'
import { getStaffsThunk } from '../../store/slices/StaffSlice.ts'
import { getReportersThunk } from '../../store/slices/ReporterSlice.ts'
import { teamSelector } from '../../store/slices/TeamSlice.ts'
import { AppDispatch } from '../../store/types.ts'

import { Sidebar } from '../Sidebar/SidebarMenu'

import PlayerVistaLogo from '../../assets/images/icons/playervista.png'

import './DashboardLayout.scss'

type DashboardHeaderProps = {
  teams: TeamResult[]
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({ teams }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { teamId } = useParams()
  const activeTeamName = teams ? teams.find((team) => team.id === teamId)?.teamName : ''

  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    navigate(`/team/${id}`)
    setCurrentTeam(id)
    dispatch(getPlayersThunk({ teamId: id }))
    dispatch(getEventsThunk({ teamId: id }))
    dispatch(getStaffsThunk({ teamId: id }))
    dispatch(getReportersThunk({ teamId: id }))
  }

  return (
    <div className='Dashboard-Layout__header'>
      <div className='Dashboard-Layout__header-media'>
        <img src={PlayerVistaLogo} alt='playervista' width={150} />
      </div>
      <div className='Dashboard-Layout__header-nav'>
        {teamId && <form className='Dashboard-Layout__header-nav-form'>
          <select name='team' className='Dashboard-Layout__header-nav-form--select' onChange={handleTeamChange}>
            {activeTeamName && (
              <option value={teamId}>{activeTeamName}</option>
            )}
            {teams
              ? teams.map((team) => (
                team.id !== teamId && (
                  <option key={team.id} value={team.id}>
                    {team.teamName}
                  </option>
                )
              ))
              : <option>Select team</option>}
          </select>
        </form>}
        <div className='Dashboard-Layout__header-nav-profile'>
          <Person2Icon/>
        </div>
      </div>
    </div>
  )
}

export const DashboardLayout: FC<PropsWithChildren> = props => {
  const controller = useAppController()
  const { pathname } = useLocation()
  const { teams } = useSelector(teamSelector)
  const navigate = useNavigate()

  // Check if the current route matches the team dashboard pattern
  const isTeamDashboard = /^\/team\/[a-zA-Z0-9_-]+$/i.test(pathname)

  return (
    <div className='Dashboard-Layout'>
      <DashboardHeader teams={teams}/>
      <div className='Dashboard-Layout__wrapper'>
        <div className='Dashboard-Layout__wrapper-content'>
          <div className='Dashboard-Layout__wrapper-content--sidebar'>
            <Sidebar controller={controller} />
          </div>
          <div className='Dashboard-Layout__wrapper-content--current-body'>
            {!isTeamDashboard &&
              <div className='Dashboard-Layout__wrapper-content--current-body-back' onClick={() => navigate(-1)}>
                <FiArrowLeft />
                <span className='Dashboard-Layout__wrapper-content--current-body-back--text'>Back</span>
              </div>
            }
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}
