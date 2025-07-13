import React from 'react'
import './Hero.css' // Import the CSS styles

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="gradient__text">Welcome to Docify!</h1>
        <p className="hero-subtitle">
        Transform any GitHub repository into comprehensive documentation with AI-powered analysis
        </p>
      </div>
    </div>
  )
}

export default Hero
