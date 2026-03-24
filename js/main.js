function applyTheme(choice) {
  const h = document.querySelector('.switch-mode .option-set');
 // h.removeEventListener('mouseleave',mouseOutGear);
  if(h){  
	h.classList.add('is-hidden'); 
	h.removeEventListener('mouseleave',mouseOutGear);
  }
 
  const root = document.documentElement;
  let themeToApply = choice;

  // Hvis valget er 'system', sjekker vi OS-innstillingene [cite: 2025-11-20]
  if (choice === 'system') {
	themeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Web Awesome bruker wa-dark og wa-light klasser [cite: 2026-02-10]
  root.classList.remove('wa-dark', 'wa-light');
  root.classList.add(`wa-${themeToApply}`);

  // Lagre det faktiske valget (ikke resultatet av system-sjekken) [cite: 2025-11-22]
  localStorage.setItem('user-color-scheme', choice);
  if (typeof updateSwitchModeActive === 'function') updateSwitchModeActive();
}