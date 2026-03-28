
const moves=[[-1,0],[1,0],[0,-1],[0,1]];


function parseInput(str){

let nums=str.split(" ").map(Number);

return[

nums.slice(0,3),

nums.slice(3,6),

nums.slice(6,9)

];

}


function findBlank(state){

for(let i=0;i<3;i++)

for(let j=0;j<3;j++)

if(state[i][j]==0)

return[i,j];

}


function neighbors(state){

let[x,y]=findBlank(state);

let list=[];

for(let[dx,dy]of moves){

let nx=x+dx;

let ny=y+dy;

if(nx>=0&&nx<3&&ny>=0&&ny<3){

let newState=JSON.parse(JSON.stringify(state));

[newState[x][y],newState[nx][ny]]=[newState[nx][ny],newState[x][y]];

list.push(newState);

}

}

return list;

}


function manhattan(a,b){

let dist=0;

for(let i=0;i<3;i++)

for(let j=0;j<3;j++){

let val=a[i][j];

if(val!=0){

for(let x=0;x<3;x++)

for(let y=0;y<3;y++)

if(b[x][y]==val)

dist+=Math.abs(i-x)+Math.abs(j-y);

}

}

return dist;

}


function solve(){

let start=parseInput(document.getElementById("initial").value);

let goal=parseInput(document.getElementById("goal").value);

let method=document.getElementById("method").value;

let visited=new Set();

let nodes=0;

let t0=performance.now();


let queue=[[start,[]]];


while(queue.length){

let[state,path]=method=="DFS"?queue.pop():queue.shift();

let key=JSON.stringify(state);

if(visited.has(key))continue;

visited.add(key);

nodes++;


if(JSON.stringify(state)==JSON.stringify(goal)){

let time=(performance.now()-t0)/1000;

animate([...path,state]);

document.getElementById("metrics").innerHTML=

`Path cost: ${path.length}<br>

Nodes explored: ${nodes}<br>

Time: ${time.toFixed(3)} sec`;

return;

}


for(let n of neighbors(state)){

if(method=="A*")

queue.push([n,[...path,state]]);

else

queue.push([n,[...path,state]]);

}

}

}


function draw(state){

let board=document.getElementById("board");

board.innerHTML="";

let flat=state.flat();

flat.forEach(v=>{

let d=document.createElement("div");

d.className="tile";

d.innerText=v==0?"":v;

board.appendChild(d);

});

}


function animate(path){

let i=0;

let interval=setInterval(()=>{

draw(path[i]);

i++;

if(i>=path.length)clearInterval(interval);

},700);

}


draw(parseInput("1 2 3 8 0 4 7 6 5"));
