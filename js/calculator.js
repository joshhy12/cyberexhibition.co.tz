// Business Impact Calculator

document.addEventListener('DOMContentLoaded', function() {
  const calculateBtn = document.getElementById('calculate-btn');
  
  if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateImpact);
  }
  
  // Format currency with TSh
  function formatCurrency(amount) {
    return 'TSh ' + amount.toLocaleString();
  }
  
  // Calculate impact based on business type, size and revenue
  function calculateImpact() {
    // Get input values
    const businessType = document.getElementById('business-type').value;
    const businessSize = parseInt(document.getElementById('business-size').value);
    const annualRevenue = parseInt(document.getElementById('annual-revenue').value);
    
    // Risk factors based on business type
    const riskFactors = {
      retail: 0.3,
      restaurant: 0.25,
      hotel: 0.35,
      service: 0.2
    };
    
    // Protection cost factors based on business type
    const protectionFactors = {
      retail: 15000,
      restaurant: 12000,
      hotel: 18000,
      service: 10000
    };
    
    // Trust increase factors based on business type
    const trustFactors = {
      retail: 25,
      restaurant: 20,
      hotel: 30,
      service: 22
    };
    
    // Calculate potential breach cost (revenue * risk factor * size factor)
    const sizeFactor = Math.min(businessSize / 10, 3);
    const breachCost = annualRevenue * riskFactors[businessType] * sizeFactor;
    
    // Calculate protection cost
    const protectionCost = protectionFactors[businessType] * businessSize * 12;
    
    // Calculate annual savings (breach cost - protection cost)
    const annualSavings = breachCost - protectionCost;
    
    // Calculate trust increase
    const trustIncrease = trustFactors[businessType];
    
    // Update results
    document.getElementById('breach-cost').textContent = formatCurrency(Math.round(breachCost));
    document.getElementById('protection-cost').textContent = formatCurrency(Math.round(protectionCost));
    document.getElementById('annual-savings').textContent = formatCurrency(Math.round(annualSavings));
    document.getElementById('trust-increase').textContent = trustIncrease + '%';
    
    // Animate the results
    animateResults();
  }
  
  // Animate results with counting effect
  function animateResults() {
    const resultElements = document.querySelectorAll('#calculator-results p');
    
    resultElements.forEach(element => {
      // Skip if not a currency value
      if (!element.textContent.includes('TSh')) {
        return;
      }
      
      const finalValue = element.textContent;
      const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
      
      // Start from zero
      let startValue = 0;
      const duration = 1500; // animation duration in ms
      const frameDuration = 16; // ms per frame (approx 60fps)
      const totalFrames = Math.round(duration / frameDuration);
      const valueIncrement = numericValue / totalFrames;
      
      // Animate count up
      let currentFrame = 0;
      const counter = setInterval(() => {
        currentFrame++;
        startValue += valueIncrement;
        
        element.textContent = 'TSh ' + Math.round(startValue).toLocaleString();
        
        if (currentFrame === totalFrames) {
          clearInterval(counter);
          element.textContent = finalValue;
        }
      }, frameDuration);
    });
    
    // Animate percentage
    const trustElement = document.getElementById('trust-increase');
    const finalTrust = parseInt(trustElement.textContent);
    let currentTrust = 0;
    
    const trustCounter = setInterval(() => {
      currentTrust++;
      trustElement.textContent = currentTrust + '%';
      
      if (currentTrust === finalTrust) {
        clearInterval(trustCounter);
      }
    }, 50);
  }
});