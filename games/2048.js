a=[
	Array(4).fill(0),
	Array(4).fill(0),
	Array(4).fill(0),
	Array(4).fill(0)
] //empty array

a[0][0]=1
a[0][1]=1
a[0][2]=2

c=(a,n)=>{ //compresses a single row
	a=a.filter(e=>e) //removes undefines
	for (i=1;i<a.length;i++) {
		if (a[i]==a[i-1]) { //if 2 are touching
			a[i]++ //add 1
			a.splice(i-1,1) //remove old one
		}
	}
	if (n) {
		//a.reverse()
	}
	return [...Array((4-a.length)*n).fill(0),...a,...Array((4-a.length)*!n).fill(0)] //pad result depending on swipe
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

	f(0,0,256,256,"f00")
	l=0

	if (k=="a") {
		a.forEach((e,i)=>{
			a[i]=c(a[i],0)
		})
	}
	else if (k=="d") {
		a.forEach((e,i)=>{
			a[i]=c(a[i],1)
		})
	}
	
	for(i in a) {
		for (j in a[i]) {
			s.fillStyle="#"+a[j][i]+a[j][i]+a[j][i]
			s.fillRect(i*64,j*64,64,64)
		}
	}
}