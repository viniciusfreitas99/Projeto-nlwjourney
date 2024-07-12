
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './invite-guest-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestsStep } from './steps/invite-guests-step'


export function CreateTripPage() {

  const navigate = useNavigate()  

  const [isGuestInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestsModalOpen] = useState(false)
  const [IsConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [emailsToInvite, setEmailsToInvite] = useState([
    'NeymarJunior.com.br'
  ])

  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])

    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  function createTrip(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    navigate('/trips/123')
  }

  return (
  <div className="h-screen flex items-center justify-center">  
  <div className= "max-w-3xl w-full px-6 text-center space-y-10">
    <div className='flex flex-col items-center gap-3' >
    <img src="my-project/public/logo/Illustration-of-logo-design-template-on-transparent-background-PNG-removebg-preview (1).png" 
    alt="planner" className='size-60'  />


    <p className="text-zinc-300 text-lg" > Convide seus amigos e planeje sua proxima viagem</p>
    </div>

  
  <div className='space-y-4'>
    <DestinationAndDateStep 
        closeGuestsInput={closeGuestsInput}
        isGuestInputOpen={isGuestInputOpen}
        openGuestsInput={openGuestsInput}
    />

    {isGuestInputOpen && (
      <InviteGuestsStep 
      emailsToInvite={emailsToInvite}
      openConfirmTripModal={openConfirmTripModal}
      openGuestsModal={openGuestsModal}
      
      />
    )}
    </div>
      <p className="text-sm text-zinc-500">
        Ao planejar sua viagem pela planner voce automaticamente concorda com nossos 
        <a className="text-zinc-300 underline" href="#"> termos de uso</a> e 
        <a className="text-zinc-300 underline" href="#"> politicas de privacidade</a>
      </p>
  </div>

  {isGuestModalOpen && (
      <InviteGuestsModal
      emailsToInvite={emailsToInvite}
      addNewEmailToInvite={addNewEmailToInvite}
      closeGuestsModal={closeGuestsModal}
      removeEmailFromInvites={removeEmailFromInvites}
      />
    )}
  


  {IsConfirmTripModalOpen && (
    <ConfirmTripModal 
    closeConfirmTripModal={closeConfirmTripModal}
    createTrip={createTrip}
    />
  )}
  
</div>
)}