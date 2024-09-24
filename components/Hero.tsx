import React from 'react'
import { FloatingNav } from './ui/FloatingNavbar'
import { heading, navItems } from '@/data/data'
import { TypewriterEffectSmooth } from './ui/TypeWriterEffect'

const Hero = () => {
  return (
    <div>
        <FloatingNav navItems={navItems}/>
       
        <div
        //   className="text-4xl text-white"
        // style={{ textShadow: '0 0 10px #e6007a, 0 0 20px #e6007a, 0 0 30px #e6007a' }}
        >
        <TypewriterEffectSmooth words={heading} />
        </div>
    </div>
    
    
  )
}

export default Hero