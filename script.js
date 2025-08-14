/* ---------- CONFIG ---------- */
const STAR_COUNT   = 1000;      // visible stars
const MAX_DEPTH    = 2000;      // px
const GALAXY_SIZE  = 4000;      // px cube where stars live
const names        = ["Sol","Alpha Centauri","Barnard's Star","Sirius","Procyon","Tau Ceti","Epsilon Eridani","61 Cygni","Altair","Vega","Rigel","Betelgeuse","Polaris","Deneb","Aldebaran","Antares","Arcturus","Spica","Regulus","Canopus"];

/* ---------- HELPERS ---------- */
const rand = (min,max)=>Math.random()*(max-min)+min;
const galaxy = document.getElementById('galaxy');

/* ---------- CREATE STARS ---------- */
for(let i=0;i<STAR_COUNT;i++){
  const star = document.createElement('div');
  star.className = 'star';
  star.dataset.name = names[i%names.length]+' '+i;

  /* position in 3D cube */
  const x = rand(-GALAXY_SIZE/2,GALAXY_SIZE/2);
  const y = rand(-GALAXY_SIZE/2,GALAXY_SIZE/2);
  const z = rand(-MAX_DEPTH,MAX_DEPTH);

  star.style.transform = `translate3d(${x}px,${y}px,${z}px)`;

  /* vary size by depth */
  const size = Math.max(.5, 4 - Math.abs(z)/400);
  star.style.width = star.style.height = `${size}px`;

  galaxy.appendChild(star);
}

/* ---------- MOUSE PARALLAX ---------- */
let rotX=0, rotY=0;
document.addEventListener('mousemove', e=>{
  const normX = (e.clientX / innerWidth  - .5) * 2;
  const normY = (e.clientY / innerHeight - .5) * 2;
  rotY =  normX * 15;  // degrees
  rotX = -normY * 15;
  galaxy.style.transform = `translate(-50%,-50%) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${currentScale})`;
});

/* ---------- SCROLL ZOOM ---------- */
let currentScale = .2;
window.addEventListener('wheel', e=>{
  e.preventDefault();
  currentScale = Math.max(.05, Math.min(5, currentScale - e.deltaY * 0.001));
  galaxy.style.transform = `translate(-50%,-50%) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${currentScale})`;
},{passive:false});
