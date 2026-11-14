"use strict";
const buttons = Array.from(document.querySelectorAll("[data-tab]"));
const panels = Array.from(document.querySelectorAll("[data-panel]"));
function showPanel(id) {
  buttons.forEach(button => {
    const active = button.dataset.tab === id;
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  });
  panels.forEach(panel => { panel.hidden = panel.dataset.panel !== id; });
}
buttons.forEach((button, index) => {
  button.addEventListener("click", () => showPanel(button.dataset.tab));
  button.addEventListener("keydown", event => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % buttons.length;
    else if (event.key === "ArrowLeft") next = (index + buttons.length - 1) % buttons.length;
    else return;
    event.preventDefault();
    buttons[next].focus();
    showPanel(buttons[next].dataset.tab);
  });
});
showPanel("crm");

const stages=["New","Contacted","Demo Scheduled","Onboarded"];
const leads=[
  {name:"Harbor Table (sample)",area:"Example location · Michigan",stage:0},
  {name:"Lakeside Kitchen (sample)",area:"Example location · Michigan",stage:1},
  {name:"Oak & Union (sample)",area:"Example location · Michigan",stage:2}
];
const leadList=document.getElementById("leads");
function renderLeads(){
  leadList.replaceChildren();
  leads.forEach((lead,index)=>{
    const row=document.createElement("div");row.className="lead-row";
    const label=document.createElement("div");
    const strong=document.createElement("strong");strong.textContent=lead.name;
    const small=document.createElement("small");small.textContent=lead.area;
    label.append(strong,small);
    const action=document.createElement("button");
    action.type="button";action.className="stage-btn";
    action.textContent=stages[lead.stage]+" ↻";
    action.setAttribute("aria-label","Change pipeline stage for "+lead.name);
    action.addEventListener("click",()=>{leads[index].stage=(lead.stage+1)%stages.length;renderLeads();});
    row.append(label,action);leadList.appendChild(row);
  });
  document.getElementById("lead-count").textContent=String(leads.length).padStart(2,"0");
}
document.getElementById("add-sample").addEventListener("click",()=>{
  if(leads.length>=9)return;
  leads.push({name:"Sample Restaurant "+(leads.length+1),area:"Fictional demo entry",stage:0});
  renderLeads();
});
renderLeads();

document.getElementById("download-report").addEventListener("click",()=>{
  const csv=[
    ["Metric","Example Value","Status"],
    ["Illustrative meals served","12480","Fictional demo"],
    ["Illustrative restaurant count","48","Fictional demo"],
    ["Illustrative regions","6","Fictional demo"],
    ["Illustrative report count","12","Fictional demo"]
  ].map(row=>row.join(",")).join("\r\n");
  const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
  const link=document.createElement("a");link.href=url;link.download="food-access-demo-report.csv";
  document.body.appendChild(link);link.click();link.remove();URL.revokeObjectURL(url);
});
