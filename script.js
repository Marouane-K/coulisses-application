(()=>{
  'use strict';
  const $ = id => document.getElementById(id);
  const slides=[...document.querySelectorAll('.slide')];
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const colorPreference=window.matchMedia('(prefers-color-scheme: dark)');
  const storageKey='coulisses-theme-v3';
  let index=0, timelineTimer=null, timelineIndex=0, demoTimer=null, toastTimer=null, waiterTimer=null, waiterIndex=0;
  const timelineSlideIndex=slides.findIndex(slide=>slide.querySelector('#timelineGrid'));
  const waiterSlideIndex=slides.findIndex(slide=>slide.querySelector('#waiterPlay'));
  const safeStorage={get(){try{return localStorage.getItem(storageKey)}catch{return null}},set(v){try{localStorage.setItem(storageKey,v)}catch{}}};
  function theme(next,save=false){document.documentElement.dataset.theme=next;$('themeText').textContent=next==='dark'?'Clair':'Sombre';$('themeBtn').setAttribute('aria-label',next==='dark'?'Activer le mode clair':'Activer le mode sombre');document.querySelector('meta[name="theme-color"]').content=next==='dark'?'#090e1d':'#f7f8fc';if(save)safeStorage.set(next)}
  const saved=safeStorage.get();theme(['light','dark'].includes(saved)?saved:(colorPreference.matches?'dark':'light'));
  colorPreference.addEventListener?.('change',e=>{if(!safeStorage.get())theme(e.matches?'dark':'light')});
  $('themeBtn').addEventListener('click',()=>theme(document.documentElement.dataset.theme==='dark'?'light':'dark',true));
  const timelineTimes=['0 ms','50 ms','150 ms','400 ms','800 ms','1200 ms','1800 ms','2000 ms'];
  const timelineMessages=['Le client clique sur « Acheter ».','La requête est transmise via HTTPS.','Le serveur vérifie l\'identité.','Le serveur vérifie la commande.','La commande est enregistrée.','Le paiement est pris en charge.','L\'API renvoie une réponse JSON.','La commande est confirmée !'];
  function timelineAt(n){timelineIndex=n;document.querySelectorAll('.timeline-step').forEach((el,i)=>{el.classList.toggle('on',i===n);el.classList.toggle('done',i<n)});$('timelineTime').textContent=timelineTimes[n];$('timelineStatus').textContent=timelineMessages[n];$('timelineMeter').style.width=((n+1)/8*100)+'%'}
  function stopTimeline(){if(timelineTimer){clearInterval(timelineTimer);timelineTimer=null}$('timelinePlay').textContent='▶ Rejouer le parcours'}
  function playTimeline(){stopTimeline();timelineAt(0);$('timelinePlay').textContent='■ Arrêter';if(reduced.matches){timelineAt(7);stopTimeline();return}timelineTimer=setInterval(()=>{if(timelineIndex>=7){stopTimeline();return}timelineAt(timelineIndex+1)},650)}
  $('timelinePlay').addEventListener('click',()=>timelineTimer?stopTimeline():playTimeline());
  function waiterAt(n){
    waiterIndex=n;
    document.querySelectorAll('[data-verb]').forEach(el=>el.classList.toggle('on',Number(el.dataset.verb)===n));
    document.querySelectorAll('[data-waiter-node]').forEach(el=>el.classList.toggle('on',Number(el.dataset.waiterNode)===n||Number(el.dataset.waiterNode)===1));
  }
  function stopWaiter(){if(waiterTimer){clearInterval(waiterTimer);waiterTimer=null}if($('waiterPlay'))$('waiterPlay').textContent='▶ Rejouer les 3 rôles'}
  function playWaiter(){stopWaiter();waiterAt(0);$('waiterPlay').textContent='■ Arrêter';if(reduced.matches){waiterAt(2);stopWaiter();return}waiterTimer=setInterval(()=>{if(waiterIndex>=2){stopWaiter();waiterAt(2);return}waiterAt(waiterIndex+1)},1800)}
  $('waiterPlay')?.addEventListener('click',()=>waiterTimer?stopWaiter():playWaiter());
  document.querySelectorAll('.verb').forEach(verb=>verb.addEventListener('click',()=>{const verbIndex=Number(verb.dataset.verb);if(waiterTimer)stopWaiter();waiterAt(verbIndex)}));
  document.querySelector('.app-cta')?.addEventListener('click',()=>{const s=$('appStatus');if(!s)return;s.textContent='Commande prise…';setTimeout(()=>{s.textContent='En cuisine · invisible'},900)});
  function toast(msg){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2100)}
  function updateSlide(n,updateHash=true){    n=Math.max(0,Math.min(slides.length-1,n));if(n!==timelineSlideIndex)stopTimeline();if(n!==waiterSlideIndex)stopWaiter();if(index!==n&&demoTimer){clearTimeout(demoTimer);demoTimer=null;$('demoSubmit').disabled=false}
    index=n;slides.forEach((slide,i)=>{const active=i===n;slide.classList.toggle('active',active);slide.classList.toggle('before',i<n);slide.setAttribute('aria-hidden',String(!active));slide.inert=!active;if(active)slide.scrollTop=0});
    if(n===waiterSlideIndex)waiterAt(0);
    $('currentCounter').textContent=String(n+1).padStart(2,'0');$('totalCounter').textContent=String(slides.length).padStart(2,'0');$('progressFill').style.width=((n+1)/slides.length*100)+'%';$('progressRole').setAttribute('aria-valuenow',String(n+1));$('progressRole').setAttribute('aria-valuemax',String(slides.length));$('prevBtn').disabled=n===0;$('nextBtn').disabled=n===slides.length-1;$('slideTitle').textContent=slides[n].dataset.title;$('notesText').textContent=slides[n].dataset.notes||'';if($('brandSub'))$('brandSub').textContent=slides[n].dataset.part||'Communication professionnelle';
    document.querySelectorAll('.overview-item').forEach((item,i)=>{item.classList.toggle('selected',i===n);item.setAttribute('aria-current',i===n?'step':'false')});
    if(updateHash&&window.history.replaceState)window.history.replaceState(null,'','#slide-'+(n+1));
  }
  $('prevBtn').addEventListener('click',()=>updateSlide(index-1));$('nextBtn').addEventListener('click',()=>updateSlide(index+1));
  $('fullscreenBtn').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{toast('Le mode plein écran est indisponible ici.')}});
  $('notesBtn').addEventListener('click',()=>{$('notesPanel').hidden=!$('notesPanel').hidden});
  const over=$('overviewOverlay'),help=$('helpOverlay');
  slides.forEach((slide,i)=>{const item=document.createElement('button');item.type='button';item.className='overview-item';const num=document.createElement('strong');num.textContent=String(i+1).padStart(2,'0');const label=document.createElement('span');label.textContent=slide.dataset.title;item.append(num,label);item.addEventListener('click',()=>{over.hidden=true;updateSlide(i)});$('overviewGrid').append(item)});
  function toggleOverlay(id){const target=$(id),wasHidden=target.hidden;over.hidden=true;help.hidden=true;target.hidden=!wasHidden;if(wasHidden)target.querySelector('button')?.focus()}
  $('overviewBtn').addEventListener('click',()=>toggleOverlay('overviewOverlay'));
  $('helpBtn').addEventListener('click',()=>toggleOverlay('helpOverlay'));
  document.querySelectorAll('[data-close]').forEach(btn=>btn.addEventListener('click',()=>{$(btn.dataset.close).hidden=true}));
  [over,help].forEach(el=>el.addEventListener('click',ev=>{if(ev.target===el)el.hidden=true}));
  function anyOverlay(){return !over.hidden||!help.hidden}
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){if(anyOverlay()){over.hidden=true;help.hidden=true;return}if(!$('notesPanel').hidden){$('notesPanel').hidden=true;return}}
    if(e.altKey||e.ctrlKey||e.metaKey||['INPUT','SELECT','TEXTAREA'].includes(document.activeElement?.tagName)||document.activeElement?.isContentEditable)return;
    if(anyOverlay())return;
    switch(e.key){case'ArrowRight':case'PageDown':case' ':e.preventDefault();updateSlide(index+1);break;case'ArrowLeft':case'PageUp':e.preventDefault();updateSlide(index-1);break;case'Home':e.preventDefault();updateSlide(0);break;case'End':e.preventDefault();updateSlide(slides.length-1);break;case'g':case'G':toggleOverlay('overviewOverlay');break;case't':case'T':$('themeBtn').click();break;case'f':case'F':$('fullscreenBtn').click();break;case'n':case'N':$('notesBtn').click();break;case'?':toggleOverlay('helpOverlay');break}
  });
  let swipeX=null,swipeY=null;
  $('deck').addEventListener('touchstart',e=>{swipeX=e.changedTouches[0]?.clientX??null;swipeY=e.changedTouches[0]?.clientY??null},{passive:true});
  $('deck').addEventListener('touchend',e=>{if(swipeX===null||anyOverlay())return;const dx=e.changedTouches[0].clientX-swipeX,dy=e.changedTouches[0].clientY-swipeY;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.4)updateSlide(index+(dx<0?1:-1));swipeX=null;swipeY=null},{passive:true});
  document.querySelectorAll('[data-copy]').forEach(btn=>btn.addEventListener('click',async()=>{const value=$(btn.dataset.copy).innerText;try{await navigator.clipboard.writeText(value);toast('Code copié dans le presse-papiers')}catch{toast('Copie non disponible dans ce navigateur')}}));
  $('demoForm').addEventListener('submit',e=>{e.preventDefault();if(demoTimer)clearTimeout(demoTimer);const price=Number($('product').value),q=Number($('quantity').value);$('demoHttp').className='http-badge';$('demoHttp').textContent='ENVOI…';$('demoResponse').textContent='POST /api/orders\n\n// Traitement simulé...';$('demoMessage').textContent='Simulation du traitement de la requête';$('demoSubmit').disabled=true;const finish=()=>{const total=Number((price*q).toFixed(2));$('demoHttp').textContent='201 CREATED';$('demoHttp').className='http-badge success';$('demoResponse').textContent=JSON.stringify({orderId:98213,status:'CONFIRMED',quantity:q,total,currency:'EUR'},null,2);$('demoMessage').textContent='Commande fictive créée : le front peut afficher une confirmation.';$('demoSubmit').disabled=false;demoTimer=null};if(reduced.matches)finish();else demoTimer=setTimeout(finish,800)});
  window.addEventListener('hashchange',()=>{const match=location.hash.match(/^#slide-(\d+)$/);if(match)updateSlide(Number(match[1])-1,false)});
  const initial=location.hash.match(/^#slide-(\d+)$/);updateSlide(initial?Number(initial[1])-1:0,false);
  timelineAt(0);
})();
