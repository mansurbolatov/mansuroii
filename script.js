const CARS=[
{n:"Toyota Camry",y:2024,km:12000,p:19500000,b:"sedan",c:"#7d8a99",t:"Хит"},
{n:"Hyundai Tucson",y:2018,km:68000,p:11900000,b:"suv",c:"#b4452f"},
{n:"Kia Rio",y:2021,km:61000,p:6900000,b:"sedan",c:"#2f5fa8"},
{n:"Skoda Octavia",y:2021,km:44000,p:9800000,b:"hatch",c:"#2c7a5a",t:"Новое поступление"},
{n:"Toyota RAV4",y:2025,km:8000,p:23900000,b:"suv",c:"#e2e6ea"},
{n:"Volkswagen Polo",y:2017,km:91000,p:5900000,b:"sedan",c:"#d8a02a"},
{n:"Kia Sportage",y:2023,km:15000,p:18500000,b:"suv",c:"#3b4a5e",t:"Почти новая"},
{n:"Hyundai Elantra",y:2021,km:29000,p:9400000,b:"sedan",c:"#a9b3be"}];
const IMG=["images/car1.jpg", "images/car2.jpg", "images/car3.jpg", "images/car4.jpg", "images/car5.jpg", "images/car6.jpg", "images/car7.jpg", "images/car8.jpg"];
const SHAPE={sedan:['M10 72L22 58L62 52L88 30L160 30L192 52L228 58L232 74L10 74Z','M92 35H124V52H72ZM130 35H157L180 52H130Z'],
suv:['M10 72L18 54L50 48L68 24L190 24L205 50L230 56L232 74L10 74Z','M74 29H120V48H58ZM126 29H186L198 48H126Z'],
hatch:['M10 72L20 56L58 50L82 28L170 28L214 54L230 60L232 74L10 74Z','M86 33H124V50H66ZM130 33H166L196 50H130Z']};
const fmt=n=>Math.round(n).toLocaleString('ru-RU').replace(/\u00a0/g,' ');
const pay=(P,d,m)=>{const L=P*(1-d/100),r=.18/12;return L*r/(1-Math.pow(1+r,-m))};
function svg(c){return `<img src="${IMG[CARS.indexOf(c)]}" alt="${c.n}" loading="lazy"${c.n==="Kia Rio"?' style="object-fit:contain;background:#fff"':''}>`}
function svgOld(c){const s=SHAPE[c.b];return `<svg viewBox="0 0 240 96" role="img" aria-label="${c.n}"><ellipse cx="120" cy="90" rx="105" ry="4" fill="#000" opacity=".12"/><path d="${s[0]}" fill="${c.c}"/><path d="${s[1]}" fill="#12203a" opacity=".78"/><g fill="#12203a"><circle cx="62" cy="76" r="15"/><circle cx="182" cy="76" r="15"/></g><g fill="#cfd9e0"><circle cx="62" cy="76" r="6"/><circle cx="182" cy="76" r="6"/></g></svg>`}
const $=id=>document.getElementById(id);
$('fBrand').innerHTML+=[...new Set(CARS.map(c=>c.n.split(' ')[0]))].sort().map(b=>`<option>${b}</option>`).join('');
function render(){
const b=$('fBrand').value,k=$('fBody').value,p=+$('fPrice').value;
const r=CARS.filter(c=>(!b||c.n.startsWith(b))&&(!k||c.b===k)&&(!p||c.p<=p));
$('count').textContent=r.length?`Найдено: ${r.length}`:'';
$('list').innerHTML=r.length?r.map((c,i)=>`<article class="car"><div class="pic">${c.t?`<span class="tag">${c.t}</span>`:''}${svg(c)}</div><div class="in"><h3>${c.n}</h3><div class="meta">${c.y} г. · ${fmt(c.km)} км</div><div class="price">${fmt(c.p)} ₸</div><div class="mo">от ${fmt(pay(c.p,20,60))} ₸/мес</div><button class="btn" data-n="${c.n}">Хочу эту</button></div></article>`).join(''):'<div class="empty" style="grid-column:1/-1">Ничего не найдено. Измените фильтры или оставьте заявку — подберём авто под ваш запрос.</div>';
}
$('go').onclick=()=>{render();$('cars').scrollIntoView()};
['fBrand','fBody','fPrice'].forEach(i=>$(i).onchange=render);
$('list').onclick=e=>{const b=e.target.closest('button[data-n]');if(!b)return;$('dTitle').textContent='Заявка: '+b.dataset.n;$('dlg').showModal()};
$('frm').onsubmit=e=>{if(e.submitter&&e.submitter.value==='ok'){$('n').value='';$('p').value='';alert('Заявка отправлена. Менеджер позвонит в течение 15 минут.')}};
function calc(){const P=+$('cPrice').value.replace(/\D/g,'')||0,d=+$('cDown').value,m=+$('cTerm').value;
$('vDown').textContent=d+'%';$('vTerm').textContent=m+' мес.';
const x=pay(P,d,m);$('pay').textContent=P?fmt(x)+' ₸':'—';$('over').textContent=P?`Переплата: ${fmt(x*m-P*(1-d/100))} ₸`:''}
['cPrice','cDown','cTerm'].forEach(i=>$(i).oninput=calc);
render();calc();
