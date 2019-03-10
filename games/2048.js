a=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]

c=(a,n)=>{ //compresses a single row
	a=a.filter(e=>e) //removes undefines
	for (i=1;i<a.length;i++) {
		if (a[i]==a[i-1]) { //if 2 are touching
			a[i]++ //add 1
			a.splice(i-1,1) //remove old one
		}
	}
	return [...Array((4-a.length)*n).fill(0),...a,...Array((4-a.length)*!n).fill(0)] //pad result depending on side
}

document.body.innerHTML="<canvas id='c' width=256 height=256>" //insert canvas
s=document.getElementById("c").getContext("2d") //screen

n=r=>{return ~~(Math.random()*r)} //new pos

g=()=>{ //generates new block
	i=n(4)
	j=n(4)
	if (a[i][j]!=0) {
		g() //if block is set, re gen
	}
	else {
		a[i][j]=n(2) //generate a 0 or 1 block
	}
}

p=l=0
d=1
document.onkeydown=e=>{
	k=e.key

	if (k=="a"||k=="d") {
		a.forEach((e,i)=>{
			a[i]=c(a[i],k=="d")
		})
		l|=2<<(k.charCodeAt()-97)
	}
	else if (k=="w"||k=="s") {
		a.forEach((e,i)=>{
			tmp=a.map(x=>x[i])
			tmp=c(tmp,k=="s")
			for (j in tmp) {
				a[j][i]=tmp[j]
			}
		})
		l|=2<<(k.charCodeAt()-97)
	}
	else {
		return //dont keep going if WASD wasnt presed
	}

	if (p==JSON.stringify(a)) {
		if (l==8912914) {
			alert("Game Over")
			a=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
			p=0
		}
	}
	else {
		p=JSON.stringify(a)
		l=0
		g()
	}
	
	for(i in a) {
		for (j in a[i]) {
			s.fillStyle="hsl(200,100%,"+(a[j][i]==0?100:a[j][i]*5)+"%)"
			s.fillRect(i*64,j*64,64,64)
			if (a[j][i]==10&&d) { //2^(10+1)=2048
				alert("You Win!")
				d=0 //dont show this again
			}
		}
	}
}