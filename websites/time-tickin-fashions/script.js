"use strict";
const products=Array.from(document.querySelectorAll(".product"));
const filters=Array.from(document.querySelectorAll("[data-filter]"));
const cart=[];
const overlay=document.getElementById("cart-overlay");
const cartOpen=document.getElementById("cart-open");
const cartClose=document.getElementById("cart-close");
const cartList=document.getElementById("cart-list");
const count=document.getElementById("cart-count");
const total=document.getElementById("cart-total");
const status=document.getElementById("status");
const shopLink=document.getElementById("shop-link");
function renderCart(){
 count.textContent=String(cart.length);
 cartList.replaceChildren();
 let sum=0;
 cart.forEach((item,index)=>{
  sum+=item.amount;
  const li=document.createElement("li");
  const name=document.createElement("span");name.textContent=item.name;
  const remove=document.createElement("button");remove.type="button";remove.textContent="Remove";remove.setAttribute("aria-label","Remove "+item.name);
  remove.addEventListener("click",()=>{cart.splice(index,1);renderCart()});
  li.append(name,remove);cartList.appendChild(li);
 });
 if(!cart.length){const li=document.createElement("li");li.textContent="No items selected yet.";cartList.appendChild(li)}
 total.textContent=sum.toLocaleString("en-US",{style:"currency",currency:"USD"});
}
filters.forEach(button=>button.addEventListener("click",()=>{
 filters.forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
 products.forEach(card=>{card.hidden=button.dataset.filter!=="All"&&card.dataset.category!==button.dataset.filter});
}));
document.querySelectorAll(".add").forEach(button=>button.addEventListener("click",()=>{
 const card=button.closest(".product");
 cart.push({name:card.dataset.name,amount:Number(card.dataset.amount)});
 renderCart();status.textContent=card.dataset.name+" added to your demo bag.";overlay.hidden=false;cartClose.focus();
}));
cartOpen.addEventListener("click",()=>{renderCart();overlay.hidden=false;cartClose.focus()});
cartClose.addEventListener("click",()=>{overlay.hidden=true;cartOpen.focus()});
overlay.addEventListener("click",event=>{if(event.target===overlay){overlay.hidden=true;cartOpen.focus()}});
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!overlay.hidden){overlay.hidden=true;cartOpen.focus()}});
shopLink.addEventListener("click",()=>{});
renderCart();