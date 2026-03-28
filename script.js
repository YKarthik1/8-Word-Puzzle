const moves=[
[-1,0],
[1,0],
[0,-1],
[0,1]
];


function parseInput(str){

let nums=str.split(" ").map(Number);

if(nums.length!=9){

alert("Enter 9 numbers");

return null;

}

return[
nums.slice(0,3),
nums.slice(3,6),
nums.slice(6,9)
];

}


function stringify(s){

return JSON.stringify(s);

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

let d=0;

for(let i=0;i<3;i++)
for(let j=0;j<3;j++){

let val=a[i][j];

if(val!=0){

for(let x=0;x<3;x++)
for(let y=0;y<3;y++)
if(b[x][y]==val)
d+=Math.abs(i-x)+Math.abs(j-y);

}

}

return d;

}


function bfs(start,goal){

let q=[[start,[]]];

let visited=new Set();

let nodes=0;

while(q.length){

let[state,path]=q.shift();

let key=stringify(state);

if(visited.has(key))continue;

visited.add(key);

nodes++;

if(key==stringify(goal))

return{path:[...path,state],nodes};

for(let n of neighbors(state))
q.push([n,[...path,state]]);

}

}


function dfs(start,goal){

let stack=[[start,[]]];

let visited=new Set();

let nodes=0;

while(stack.length){

let[state,path]=stack.pop();

let key=stringify(state);

if(visited.has(key))continue;

visited.add(key);

nodes++;

if(key==stringify(goal))

return{path:[...path,state],nodes};

for(let n of neighbors(state))
stack.push([n,[...path,state]]);

}

}


function astar(start,goal){

let open=[[start,[],0]];

let visited=new Set();

let nodes=0;

while(open.length){

open.sort((a,b)=>a[2]-b[2]);

let[state,path,cost]=open.shift();

let key=stringify(state);

if(visited.has(key))continue;

visited.add(key);

nodes++;

if(key==stringify(goal))

return{path:[...path,state],nodes};

for(let n of neighbors(state)){

let g=path.length+1;

let h=manhattan(n,goal);

open.push([n,[...path,state],g+h]);

}

}

}


function draw(state){

let board=document.getElementById("board");

board.innerHTML="";

state.flat().forEach(v=>{

let d=document.createElement("div");

d.className="tile";

d.innerText=v==0?"":v;

board.appendChild(d);

});

}


function animate(path){

let i=0;

let timer=setInterval(()=>{

draw(path[i]);

i++;

if(i>=path.length)
clearInterval(timer);

},500);

}


function solve(){

let start=parseInput(document.getElementById("initial").value);

let goal=parseInput(document.getElementById("goal").value);

let method=document.getElementById("method").value;

if(!start||!goal)return;

let t0=performance.now();

let result;

if(method=="bfs")
result=bfs(start,goal);

else if(method=="dfs")
result=dfs(start,goal);

else
result=astar(start,goal);

let time=(performance.now()-t0)/1000;

animate(result.path);

document.getElementById("metrics").innerHTML=`

Algorithm: ${method.toUpperCase()}<br>

Path Cost: ${result.path.length-1}<br>

Nodes Expanded: ${result.nodes}<br>

Time: ${time.toFixed(3)} sec

`;

}


draw(parseInput("1 2 3 8 0 4 7 6 5"));
