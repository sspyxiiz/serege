import { useState, useRef} from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

import { styles } from '../styles'
import { EarthCanvas } from './canvas'
import { SectionWrapper } from '../hoc'
import { slideIn } from '../utils/motion'
//0UXezAEViqATP1CYP
// template_d6sughu
// service_3th1m67
const Contact = () => {
  const formRef = useRef()
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({...form, [name]: value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    if (!form.name || !form.email || !form.message) {
      setLoading(false)
      alert('Something went wrong')
    }
    alert('Thank you. I will get back to you as soon as possible')
    setForm({
      name: '',
      email: '',
      message: ''
    })
    setLoading(false)
  }
  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-0 overflow-hidden'>
      <motion.div variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-[0.75] p-8 bg-black-100 rounded-2xl'>
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>
          <form ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-8"
          >
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your name</span>
              <input id='name' type="text" name='name' value={form.name} onChange={handleChange}
                placeholder="What's your name?"
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'/>
            </label>
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your email</span>
              <input id="email" type="email" name='email' value={form.email} onChange={handleChange}
                placeholder="What's your email?"
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'/>
            </label>
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>What do you want to say</span>
              <textarea id='message' rows="7" name='message' value={form.message} onChange={handleChange}
                placeholder="What's your name?"
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'/>
            </label>
            <button type="submit" 
              className='bg-tertiary py-3 px-8 outline-none w-fit font-bold shadow-md shadow-primary rounded-xl'>
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
      </motion.div>
      <motion.div variants={slideIn('right', 'tween', 0.2, 1)} className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'>
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, 'contact')