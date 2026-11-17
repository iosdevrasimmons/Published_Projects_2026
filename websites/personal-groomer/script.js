"use strict";
const menu=Array.from(document.querySelectorAll("[data-view]"));
const views=Array.from(document.querySelectorAll("[data-panel]"));
menu.forEach(btn=>btn.addEventListener("click",()=>{
 menu.forEach(b=>b.setAttribute("aria-pressed",String(b===btn)));
 views.forEach(panel=>panel.hidden=panel.dataset.panel!==btn.dataset.view);
 if(btn.dataset.view==="records")document.getElementById("record-search").focus();
}));
const rows=Array.from(document.querySelectorAll("#records tbody tr"));
const search=document.getElementById("record-search");
const count=document.getElementById("visible-count");
function filterRows(){let shown=0;rows.forEach(row=>{row.hidden=!row.textContent.toLowerCase().includes(search.value.trim().toLowerCase());if(!row.hidden)shown++});count.textContent=shown+" records shown";}
search.addEventListener("input",filterRows);
const stages=[]; // Populated from the HTML data attribute.
document.querySelectorAll("[data-status]").forEach(button=>button.addEventListener("click",()=>{
 const values=button.dataset.stages.split("|");
 button.textContent=values[(values.indexOf(button.textContent)+1)%values.length];
 filterRows();
}));
document.getElementById("export").addEventListener("click",()=>{
 const table=document.querySelector("#records");
 const csv=Array.from(table.querySelectorAll("tr")).map(row=>Array.from(row.children).map(cell=>{
  const value=cell.textContent.trim().replace(/"/g,'""');
  return '"'+value+'"';
 }).join(",")).join("\r\n");
 const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
 const a=document.createElement("a");a.href=url;a.download="sample-dashboard-records.csv";document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);
});
filterRows();