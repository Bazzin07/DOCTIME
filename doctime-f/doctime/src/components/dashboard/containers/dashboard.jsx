import React from 'react'
import Navbar from './navbar'
import HeroSection from './herosection'
import HospitalClinicList from './nearby'

function Dashboard() {
  return (
    <div className=''>
        <section className=''>
            <Navbar />
            <HeroSection />
            <HospitalClinicList />
        </section>
    </div>
  )
}

export default Dashboard