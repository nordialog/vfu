function startApp(){
  const ms = document.querySelector('.mode-selector');
  ms.addEventListener('wa-select',msChange);
  //localStorage.removeItem('user-color-scheme');
  if(!localStorage.getItem('user-color-scheme')){
    localStorage.setItem('user-color-scheme','system');
  }
  //console.log("===> "+localStorage.getItem('user-color-scheme'));
  applyTheme(localStorage.getItem('user-color-scheme'));
}
function msChange(event){
  console.log(event.detail.item.value);
  console.log("===> "+localStorage.getItem('user-color-scheme'));
  applyTheme(event.detail.item.value);
}
function fixThemeMenu(theme){
  const m = document.querySelector('.mode-selector');
  const mi = m.querySelectorAll('wa-dropdown-item');
  const sel = m.querySelector(`[value="${theme}"]`)
  mi.forEach(e=>{
    e.disabled = false;
  });
  //console.log("sel")
  //console.log(sel)
 sel.disabled = true;
}
function applyTheme(choice) {
  const h = document.querySelector('.switch-mode .option-set');
  const ficon = document.querySelector('.front-icon');
  const sicon = document.querySelector('.system-icon');
  const systemcurr = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  if(systemcurr=="light"){
    sicon.innerHTML = `<wa-icon slot="icon" name="sun" variant="regular"></wa-icon> System`;
  } else {
    sicon.innerHTML = `<wa-icon slot="icon" name="moon"></wa-icon> System`;
  }

 // h.removeEventListener('mouseleave',mouseOutGear);
  if(h){  
	h.classList.add('is-hidden'); 
	h.removeEventListener('mouseleave',mouseOutGear);
  }
 
  const root = document.documentElement;
  let themeToApply = choice;

  // Hvis valget er 'system', sjekker vi OS-innstillingene [cite: 2025-11-20]
  if (choice === 'system') {
	themeToApply = systemcurr;//window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Web Awesome bruker wa-dark og wa-light klasser [cite: 2026-02-10]
  root.classList.remove('wa-dark', 'wa-light');
  root.classList.add(`wa-${themeToApply}`);
  
  if(themeToApply=="light"){
    ficon.innerHTML = `<wa-icon name="sun" variant="regular"></wa-icon>`;
  } else {
    ficon.innerHTML = `<wa-icon name="moon"></wa-icon>`;
  }
  
  // Lagre det faktiske valget (ikke resultatet av system-sjekken) [cite: 2025-11-22]
  localStorage.setItem('user-color-scheme', choice);
  if (typeof updateSwitchModeActive === 'function') updateSwitchModeActive();
  fixThemeMenu(choice);
}