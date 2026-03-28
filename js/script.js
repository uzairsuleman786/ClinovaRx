// Loader
window.addEventListener('load',function(){setTimeout(function(){document.getElementById('ld').classList.add('out');},1200);});

// Nav scroll
var nav=document.getElementById('nav');
window.addEventListener('scroll',function(){nav.classList.toggle('sc',scrollY>40);});

// Nav toggle
document.getElementById('nt').addEventListener('click',function(){document.getElementById('nl').classList.toggle('op');});
document.querySelectorAll('.nl a').forEach(function(a){a.addEventListener('click',function(){document.getElementById('nl').classList.remove('op');});});

// Scroll reveal
var rvEls=document.querySelectorAll('.rv');
var io=new IntersectionObserver(function(entries){
  entries.forEach(function(e,i){
    if(e.isIntersecting){setTimeout(function(){e.target.classList.add('on');},i*65);io.unobserve(e.target);}
  });
},{threshold:.1,rootMargin:'0px 0px -36px 0px'});
rvEls.forEach(function(el){io.observe(el);});

// Active nav highlight
var secs=document.querySelectorAll('section[id]');
var navAs=document.querySelectorAll('.nl a:not(.ncta)');
window.addEventListener('scroll',function(){
  var cur='';
  secs.forEach(function(s){if(scrollY>=s.offsetTop-130)cur=s.id;});
  navAs.forEach(function(a){a.style.color=a.getAttribute('href')==='#'+cur?'var(--teal)':'';});
});