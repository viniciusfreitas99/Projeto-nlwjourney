import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus } from 'lucide-react'
import { FormEvent, useState } from 'react'



export function App() {

  const [isGuestInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestsModalOpen] = useState(false)
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

  function addEmailToInvite(event: FormEvent<HTMLFormElement>) {
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

  return (
  <div className="h-screen flex items-center justify-center">  
  <div className= "max-w-3xl w-full px-6 text-center space-y-10">
    <div className='flex flex-col items-center gap-3' >
    <img src="my-project/public/logo/Illustration-of-logo-design-template-on-transparent-background-PNG-removebg-preview (1).png" 
    alt="planner" className='size-60'  />


    <p className="text-zinc-300 text-lg" > Convide seus amigos e planeje sua proxima viagem</p>
    </div>

  
  <div className='space-y-4'>
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      
    <div className='flex items-center gap-2 flex-1'>
      <MapPin className='size-5 text-zinc-400' />
    <input disabled={isGuestInputOpen} type="text" placeholder="Para onde voce vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
    </div>

    <div className='flex items-center gap-2'>
    <Calendar className='size-5 text-zinc-400' />
    <input disabled={isGuestInputOpen} type="text" placeholder="quando?" className="bg-transparent text-lg placeholder-zinc-400 outline-none" />
    </div>


  
    {isGuestInputOpen ? ( 
      <button onClick={closeGuestsInput} className='bg-zinc-900 text-zinc-200 rounded-lg px-5 py-2
     font-medium flex items-center gap-2 hover:bg-zinc-700 w-40'>Alterar Local/data <Settings2 className='size-5' />
     </button> ) : (
    <button onClick={openGuestsInput} className='bg-cyan-500 text-line-950 rounded-lg px-5 py-2
     font-medium flex items-center gap-2 hover:bg-cyan-600 w-40' >Continuar<ArrowRight className='size-5' />
     </button> )}
    </div>

    {isGuestInputOpen && (
      <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      
      <button type='button' onClick={openGuestsModal} className='flex items-center gap-2 flex-1 text-left'>
        <UserRoundPlus className='size-5 text-zinc-400' />
        <span className='text-zinc-400 text-lg flex-1'>Quem estara na viagem</span>
      
      </button>
  
      
  
  
    
      <button className='bg-cyan-500 text-gray-100 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-cyan-600 w-40' >
        Confirmar Viagem
      <ArrowRight className='size-5' />
      </button>
      </div>
    )}
    </div>
      <p className="text-sm text-zinc-500">
        Ao planejar sua viagem pela planner voce automaticamente concorda com nossos 
        <a className="text-zinc-300 underline" href="#"> termos de uso</a> e 
        <a className="text-zinc-300 underline" href="#"> politicas de privacidade</a>
      </p>
  </div>

  {isGuestModalOpen && (
      <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className='space-y-2'>
        <div className='flex items-center justify-between '>
          <h2 className='text-lg font-semibold'>Selecionar convidados</h2>
          <button type='button' onClick={closeGuestsModal}>
          <X className="size-5 text-zinc-400" />
          </button>
        </div>
        <p className='text-sm text-zinc-400'>Os Convidados irão receber um email para confirmar a participação na viagem</p>
      </div>



      <div className='flex flex-wrap gap-2'>
        {emailsToInvite.map(email => {
          return (
            <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
          <span className='text-zinc-300'>{email}</span>
          <button type='button' onClick={() =>removeEmailFromInvites(email)}>
            <X className="size-5 text-zinc-400" />
          </button>
        </div>
          )
        })}
      </div>

      <div>
      <div className='w-full h-px bg-zinc-800' />
      <form onSubmit={addEmailToInvite} className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
        <div className='px-2 flex items-center flex-1 gap-2'>
        <AtSign className='text-zinc-400 size-5' />
        <input type="email" 
        name='email' 
        placeholder='Digite o e-mail do convidado' 
        className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1' />
        </div>
        <button type='submit' className='bg-cyan-500 text-gray-100 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-cyan-600 w-40' >
        Convidar
      <Plus className='size-5' />
      </button>
      </form>

      </div>
      </div>
      </div>
    )}

  </div>
  )
}


