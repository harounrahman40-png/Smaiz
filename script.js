/* ===== SMOOTH REVEAL ===== */
const reveal = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("show");
    }
  });
},{threshold:0.18});

document.querySelectorAll("[data-reveal], [data-fade]").forEach(el=>{
  reveal.observe(el);
});

/* ===== SMOOTH PARALLAX (LERP) ===== */
let target = 30;
let current = 30;

function smooth(){
  current += (target - current) * 0.08;
  const hero = document.querySelector(".hero");
  if(hero){
    hero.style.backgroundPosition = `center ${current}%`;
  }
  requestAnimationFrame(smooth);
}
smooth();

window.addEventListener("scroll", () => {
  target = 30 + window.scrollY * 0.05;
});

/* ===== LIGHTBOX ===== */
(()=>{
  const thumbs=document.querySelectorAll(".g-thumb");
  const lb=document.getElementById("lightbox");
  const img=document.getElementById("lightbox-img");
  const prev=lb.querySelector(".prev");
  const next=lb.querySelector(".next");
  const close=lb.querySelector(".close");

  const srcs=[...thumbs].map(t=>t.src);
  let idx=0;

  function open(i){
    idx=i;
    img.src=srcs[idx];
    lb.classList.add("open");
  }
  function hide(){ lb.classList.remove("open"); }
  function prevImg(){ idx=(idx-1+srcs.length)%srcs.length; open(idx); }
  function nextImg(){ idx=(idx+1)%srcs.length; open(idx); }

  thumbs.forEach((t,i)=>t.onclick=()=>open(i));
  close.onclick=hide;
  prev.onclick=prevImg;
  next.onclick=nextImg;

  lb.onclick=e=>{ if(e.target===lb) hide(); }
})();

/* ===== PARTICLES (tetap sama) ===== */
(()=>{
  const canvas=document.getElementById("particles");
  if(!canvas) return;
  const ctx=canvas.getContext("2d");

  let w,h;
  function resize(){
    w=canvas.width=window.innerWidth;
    h=canvas.height=document.querySelector(".hero").offsetHeight;
  }
  resize();
  window.addEventListener("resize",resize);

  const parts=[];
  for(let i=0;i<40;i++){
    parts.push({
      x:Math.random()*w,
      y:Math.random()*h,
      r:Math.random()*3+1,
      vx:(Math.random()-0.5)*0.3,
      vy:(Math.random()-0.5)*0.2
    });
  }

  function draw(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle="rgba(255,215,105,0.5)";
    parts.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=w;
      if(p.x>w)p.x=0;
      if(p.y<0)p.y=h;
      if(p.y>h)p.y=0;

      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
})();
