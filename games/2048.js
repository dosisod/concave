a=[
	Array(4).fill(0),
	Array(4).fill(0),
	Array(4).fill(0),
	Array(4).fill(0)
] //empty array

a[0][0]=1
a[0][1]=1
a[1][3]=2
a[0][2]=2 //test

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

r=(x, y, c)=>f(x*64, y*64, 64, 64,c) //draw using block size
f=(x, y, w, h, c)=>{ //draw using pixel size
	s.fillStyle="#"+c
	s.fillRect(x, y, w, h)
}

document.body.onkeydown=e=>{
	k=e.key

	f(0,0,256,256,"fff")
	l=0
	for (i in a) {
		for (j in a[i]) {
			if (j>l)l=j //gets highest color on board
		}
	}

	if (k=="a"||k=="d") {
		a.forEach((e,i)=>{
			a[i]=c(a[i],k=="d")
		})
	}
	else if (k=="w"||k=="s") {
		a.forEach((e,i)=>{
			tmp=a.map(x=>x[i])
			tmp=c(tmp,k=="s")
			for (j in tmp) {
				a[j][i]=tmp[j]
			}
		})
	}
	
	for(i in a) {
		for (j in a[i]) {
			s.fillStyle="hsl(200,100%,"+((a[j][i]+1)/(l+1))*100+"%)"
			s.fillRect(i*64,j*64,64,64)
		}
	}
}