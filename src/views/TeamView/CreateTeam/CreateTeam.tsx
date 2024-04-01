import { ChangeEvent, FC, useState } from 'react'
import { Field } from 'formik'
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak'

import { useAppDispatch } from '../../../store/types'
import { createTeamThunk } from '../../../store/slices/TeamSlice'
import { TeamFormData, uploadImageToCloudinary } from '../../../api'
import { cloudName, cloudUploadPresets } from '../../../config/constants'

import { DashboardHeader } from '../../../component/DashboardLayout/DashboardLayout'
import { FormikStep, FormikStepper } from './Step'

import './CreateTeam.scss'

export const CreateTeam: FC = () => {
  return (
    <>
      <DashboardHeader />
      <div className='Create-team'>
        <div className='Create-team__content'>
          <div className='Create-team__content-header'>
            <div className='Create-team__content-header-title'>Hello Admin,</div>
            <div className='Create-team__content-header-sub-title'>Let’s create a team for you in three easy steps</div>
          </div>
          <CreateTeamMultiStep />
        </div>
      </div>
    </>
  )
}

export const DashboardCreateTeam: FC = () => {
  return (
      <div className='Create-team'>
        <div className='Create-team__content'>
          <div className='Create-team__content-header'>
            <div className='Create-team__content-header-title'>Hello Admin,</div>
            <div className='Create-team__content-header-sub-title'>Let’s create a team for you in three easy steps</div>
          </div>
          <CreateTeamMultiStep />
        </div>
      </div>
  )
}

const CreateTeamMultiStep = () => {
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [file, setFile] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const dispatch = useAppDispatch()

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files
    if (imgFile) {
      setSelectedImage(URL.createObjectURL(imgFile[0]))
      setIsUploading(true)

      const reader = new FileReader()
      reader.onloadend = () => {
        uploadImageToCloudinary({
          folder: 'teamImage',
          file: reader.result as string,
          cloud_name: cloudName,
          upload_preset: cloudUploadPresets
        }).then(res => {
          setIsUploading(false)
          setFile(res.url)
        }).catch(err => {
          console.error('Error uploading image:', err)
          setIsUploading(false)
        })
      }
      reader.readAsDataURL(imgFile[0])
    }
  }

  return (
    <div className='Multi-step'>
      <FormikStepper
        initialValues={{
          teamName: '',
          creationYear: '',
          teamGender: '',
          ageGroup: '',
          headCoach: '',
          headCoachContact: '',
          assistantCoach: '',
          assistantCoachContact: '',
          medicalPersonnel: '',
          medicalPersonnelContact: '',
          kitManager: '',
          kitManagerContact: '',
          mediaManager: '',
          mediaManagerContact: '',
          logisticsCoordinator: '',
          logisticsCoordinatorContact: '',
          stadiumName: '',
          street: '',
          postcode: '',
          city: '',
          country: '',
        }}
        onSubmit={async (values) => {
          const data: TeamFormData = {
            ...(values as TeamFormData),
            logo: file,
          }
          dispatch(createTeamThunk({ data }))
        }}
      >
        <FormikStep label='Team Info'>
          <div className='Multi-step__title'>Please provide the following details</div>
          <div className='Multi-step__team'>
            <div className='Multi-step__team-image'>
              <input
                id='teamImage'
                name='teamImage'
                className='Multi-step__team-image--input'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                disabled={isUploading}
              />
              <label htmlFor='teamImage' className='Multi-step__team-image--label'>
                <div className='Multi-step__team-image--label-preview'>
                  {selectedImage ?
                    <img alt='preview' className='Multi-step__team-image--label-preview-img' src={selectedImage}/>
                    : <CenterFocusWeakIcon className='Multi-step__team-image--label-preview-icon'/>
                  }
                </div>
              </label>
              <div className='Multi-step__team-image--title'>
                Choose your team logo
              </div>
            </div>
          </div>
          <div className='Multi-step__layout'>
            <div className='Multi-step__layout-form-group'>
              <div className='Multi-step__layout-form-group--label'>Team Name</div>
              <Field
                className='Multi-step__layout-form-group--field'
                type='text'
                name='teamName'
                placeholder='Enter name of team here'
              />
            </div>
            <div className='Multi-step__layout-form-group'>
              <div className='Multi-step__layout-form-group--label'>Year of Establishment</div>
              <Field
                className='Multi-step__layout-form-group--field'
                type='text'
                name='creationYear'
                placeholder='Select Date'
              />
            </div>
            <div className='Multi-step__layout-form-group'>
              <div className='Multi-step__layout-form-group--label'>Team Gender</div>
              <Field
                className='Multi-step__layout-form-group--field'
                as='select'
                name='teamGender'
                placeholder='Select Gender'
              >
                <option>Select Gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </Field>
            </div>
            <div className='Multi-step__layout-form-group'>
              <div className='Multi-step__layout-form-group--label'>Age Group</div>
              <Field
                className='Multi-step__layout-form-group--field'
                as='select'
                name='ageGroup'
              >
                <option>Select Age Group</option>
                <option value='under-7'>Under-7</option>
                <option value='under-8'>Under-8</option>
                <option value='under-9'>Under-9</option>
                <option value='under-10'>Under-10</option>
                <option value='under-11'>Under-11</option>
                <option value='under-12'>Under-12</option>
                <option value='under-13'>Under-13</option>
                <option value='under-14'>Under-14</option>
                <option value='under-15'>Under-15</option>
                <option value='under-16'>Under-16</option>
                <option value='under-17'>Under-17</option>
                <option value='under-18'>Under-18</option>
                <option value='under-19'>Under-19</option>
                <option value='under-20'>Under-20</option>
                <option value='under-21'>Under-21</option>
                <option value='under-22'>Under-22</option>
                <option value='under-23'>Under-23</option>
                <option value='senior-team'>Senior Team</option>
              </Field>
            </div>
          </div>
        </FormikStep>
        <FormikStep label='Team Personnel'>
          <div className='Multi-step__title'>Please provide the following details</div>
          <div className='Multi-step__layout'>
            <div className='Multi-step__layout-form-group'>
              <div className='Multi-step__layout-form-group--label'>Head Coach \ Contact</div>
              <div className='Multi-step__layout-form-group--2'>
                <Field
                  className='Multi-step__layout-form-group--2__field'
                  type='text'
                  name='headCoach'
                  placeholder='Enter name of head coach'
                />
                <Field
                  className='Multi-step__layout-form-group--2__field'
                  type='text'
                  name='headCoachContact'
                  placeholder='Phone Number'
                />
              </div>
            </div>
            <div className='Multi-step__layout-form-group'>
              <div className='Multi-step__layout-form-group--label'>Assistant Coach \ Contact</div>
              <div className='Multi-step__layout-form-group--2'>
                <Field
                  className='Multi-step__layout-form-group--2__field'
                  type='text'
                  name='assistantCoach'
                  placeholder='Enter name of assistant coach'
                />
                <Field
                  className='Multi-step__layout-form-group--2__field'
                  type='text'
                  name='assistantCoachContact'
                  placeholder='Phone Number'
                />
              </div>
            </div>
            <div className='Multi-step__layout-form-group'>
              <div className='Multi-step__layout-form-group--label'>Medical Personnel \ Contact</div>
              <div className='Multi-step__layout-form-group--2'>
                <Field
                  className='Multi-step__layout-form-group--2__field'
                  type='text'
                  name='medicalPersonnel'
                  placeholder='Enter name of Medical Staff'
                />
                <Field
                  className='Multi-step__layout-form-group--2__field'
                  type='text'
                  name='medicalPersonnelContact'
                  placeholder='Phone Number'
                />
              </div>
            </div>
            <div className='Multi-step__layout-form-group'>
              <div className='Multi-step__layout-form-group--label'>Kit Manager \ Contact</div>
              <div className='Multi-step__layout-form-group--2'>
                <Field
                  className='Multi-step__layout-form-group--2__field'
                  type='text'
                  name='kitManager'
                  placeholder='Enter name of kit manager'
                />
                <Field
                  className='Multi-step__layout-form-group--2__field'
                  type='text'
                  name='kitManagerContact'
                  placeholder='Phone Number'
                />
              </div>
            </div>
            <div className='Multi-step__layout-form-group'>
              <div className='Multi-step__layout-form-group--label'>Media Manager \ Contact</div>
              <div className='Multi-step__layout-form-group--2'>
                <Field
                  className='Multi-step__layout-form-group--2__field'
                  type='text'
                  name='mediaManager'
                  placeholder='Enter name of media manager'
                />
                <Field
                  className='Multi-step__layout-form-group--2__field'
                  type='text'
                  name='mediaManagerContact'
                  placeholder='Phone Number'
                />
              </div>
            </div>
            <div className='Multi-step__layout-form-group'>
              <div className='Multi-step__layout-form-group--label'>Logistics Coordinator \ Contact</div>
              <div className='Multi-step__layout-form-group--2'>
                <Field
                  className='Multi-step__layout-form-group--2__field'
                  type='text'
                  name='logisticsCoordinator'
                  placeholder='Enter name of logistics coordinator'
                />
                <Field
                  className='Multi-step__layout-form-group--2__field'
                  type='text'
                  name='logisticsCoordinatorContact'
                  placeholder='Phone Number'
                />
              </div>
            </div>
          </div>
        </FormikStep>
        <FormikStep label='Team Details'>
          <div className='Multi-step__title'>Please provide the following details</div>
          <div className='Multi-step__layout'>
            <div className='Multi-step__layout-form-group'>
              <div className='Multi-step__layout-form-group--label'>Name of Stadium</div>
              <Field
                className='Multi-step__layout-form-group--field'
                type='text'
                name='stadiumName'
                placeholder='Enter name of stadium here'
              />
            </div>
            <div className='Multi-step__layout-form-group'>
              <div className='Multi-step__layout-form-group--label'>Location of Stadium</div>
              <div className='Multi-step__layout-form-group--3'>
                <Field
                  className='Multi-step__layout-form-group--3__field'
                  type='text'
                  name='street'
                  placeholder='Street'
                />
                <Field
                  className='Multi-step__layout-form-group--3__field'
                  type='text'
                  name='postcode'
                  placeholder='Postcode'
                />
                <Field
                  className='Multi-step__layout-form-group--3__field'
                  type='text'
                  name='city'
                  placeholder='City'
                />
                <Field
                  className='Multi-step__layout-form-group--3__field'
                  type='text'
                  name='country'
                  placeholder='Country'
                />
              </div>
            </div>
          </div>
        </FormikStep>
      </FormikStepper>
    </div>
  )
}
