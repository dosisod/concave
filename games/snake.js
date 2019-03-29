document.body.innerHTML="<canvas id='c' width=512 height=512>" //insert canvas
s=document.getElementById("c").getContext("2d") //screen

u=(x, y)=>{
	l=k //update last known character if it is valid
	t.unshift([t[0][0]+x,t[0][1]+y]) //u => unshift head by X and Y
}

n=()=>{return ~~(Math.random()*16)} //new fruit pos

document.body.onkeydown=e=>{
	if((l=="w"&&e.key=="s")||(l=="s"&&e.key=="w")||(l=="a"&&e.key=="d")||(l=="d"&&e.key=="a"))return //if player goes in opposite direction, ignore
	k=e.key //sets key on keydown
}

r=(x, y, c)=>f(x*32, y*32, 32, 32,c) //draw using block size
f=(x, y, w, h, c)=>{ //draw using pixel size
	s.fillStyle="#"+c
	s.fillRect(x, y, w, h)
}

g=()=>{ //generate new fruit pos if inside snake body
	x=n()
	y=n()
	for (i of t)
		if (i.toString()==[x,y].toString())
			g() //run itself again
}

x=y=p=k=l=0 //sets fruit pos, key etc
j=250 //starting time interval
t=[[9,9]] //head start
m=()=>{ //main
	p=1
	//if key is WASD unshift head, else say a key wasnt pressed
	k=="w"?u(0,-1):k=="s"?u(0,1):k=="a"?u(-1,0):k=="d"?u(1,0):p=0
	if (t[0][0]==x&&t[0][1]==y) g() //if you get fruit move it
	else if (p) t.pop() //if you didnt get fruit remove last tail from snake

	f(0, 0, 512, 512, 888) //redraws BG
	r(...t[0], "0e0") //draws head
	//if out of bounds die
	if (t[0][0]<0||t[0][0]>15||t[0][1]<0||t[0][1]>15) return
	for (i in t) {
		if(i!=0) { //skip head
			r(...t[i],"aaa") //draw body
			//if part of tail is in head die
			if (t[i].toString()==t[0].toString()) return
		}
	}
	if (p) r(x, y, 100) //draw fruit
	setTimeout(m, j-t.length*5) //run next frame
}
m()