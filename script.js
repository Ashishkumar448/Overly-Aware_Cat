c=document.querySelector('#c')
c.width  = 1920
c.height = 1080
x=c.getContext('2d')
S=Math.sin
C=Math.cos
Rn=Math.random

R = function(r,g,b,a) {
  a = a === undefined ? 1 : a;
  return "rgba("+(r|0)+","+(g|0)+","+(b|0)+","+a+")";
};
t=go=0
rsz=window.onresize=()=>{
  setTimeout(()=>{
    if(document.body.clientWidth > document.body.clientHeight*1.77777778){
      c.style.height = '100vh'
      setTimeout(()=>c.style.width = c.clientHeight*1.77777778+'px',0)
    }else{
      c.style.width = '100vw'
      setTimeout(()=>c.style.height = c.clientWidth/1.77777778 + 'px',0)
    }
    c.width=1920
    c.height=c.width/1.777777778
  },0)
}
rsz()

async function Draw(){
  if(!t){
    oX=oY=0, oZ=10
    Rl=0,Pt=0,Yw=0
    R=(Rl,Pt,Yw,m)=>{
      M=Math
      A=M.atan2
      H=M.hypot
      X=S(p=A(X,Y)+Rl)*(d=H(X,Y))
      Y=C(p)*d
      X=S(p=A(X,Z)+Yw)*(d=H(X,Z))
      Z=C(p)*d
      Y=S(p=A(Y,Z)+Pt)*(d=H(Y,Z))
      Z=C(p)*d
      if(m){
        X+=oX
        Y+=oY
        Z+=oZ
      }
    }
    R2=(Rl,Pt,Yw,m)=>{X=S(p=(A=(M=Math).atan2)(X,Y)+Rl)*(d=(H=M.hypot)(X,Y)),Y=C(p)*d,Y=S(p=A(Y,Z)+Pt)*(d=H(Y,Z)),Z=C(p)*d,X=S(p=A(X,Z)+Yw)*(d=H(X,Z)),Z=C(p)*d;if(m)X+=oX,Y+=oY,Z+=oZ}

    //Q = () => {
    //  d=10+(Math.hypot(X,Y)*2)**2.5/2000
    //  return [c.width/2+X/d/Z*10000,c.height/2+Y/d/Z*10000]
    //}
    Q = () => {
      return [c.width/2+X/Z*800,c.height/2+Y/Z*800]
    }
    I=(A,B,M,D,E,F,G,H)=>(K=((G-E)*(B-F)-(H-F)*(A-E))/(J=(H-F)*(M-A)-(G-E)*(D-B)))>0&&K<1&&(L=((M-A)*(B                                                                                                            -F)-(D-B)*(A-E))/J)>0&&L<1?[A+K*(M-A),B+K*(D-B)]:0

    async function loadOBJ(url, scale, tx, ty, tz, rl, pt, yw) {
      let res
      await fetch(url, res => res).then(data=>data.text()).then(data=>{
        a=[]
        data.split("\nv ").map(v=>{
          a=[...a, v.split("\n")[0]]
        })
        a=a.filter((v,i)=>i).map(v=>[...v.split(' ').map(n=>(+n.replace("\n", '')))])
        ax=ay=az=0
        a.map(v=>{
          v[1]*=-1
          ax+=v[0]
          ay+=v[1]
          az+=v[2]
        })
        ax/=a.length
        ay/=a.length
        az/=a.length
        a.map(v=>{
          X=(v[0]-ax)*scale
          Y=(v[1]-ay)*scale
          Z=(v[2]-az)*scale
          R2(rl,pt,yw,0)
          v[0]=X
          v[1]=Y
          v[2]=Z
        })
        maxY=-6e6
        a.map(v=>{
          if(v[1]>maxY)maxY=v[1]
        })
        a.map(v=>{
          v[1]-=maxY-oY
          v[0]+=tx
          v[1]+=ty
          v[2]+=tz
        })

        b=[]
        data.split("\nf ").map(v=>{
          b=[...b, v.split("\n")[0]]
        })
        b.shift()
        b=b.map(v=>v.split(' '))
        b=b.map(v=>{
          v=v.map(q=>{
            return +q.split('/')[0]
          })
          v=v.filter(q=>q)
          return v
        })
        
        res=[]
        b.map(v=>{
          e=[]
          v.map(q=>{
            e=[...e, a[q-1]]
          })
          e = e.filter(q=>q)
          res=[...res, e]
        })
      })
      return res
    }
    shps = []
    sd=1, ls = 0
    for(let m=sd; m--;){
      X=S(p=Math.PI*2/sd*m)*ls
      Z=C(p)*ls
      shps.push(await loadOBJ(`https://srmcgann.github.io/objs/cat.obj`,.6, 0, 12, 0, 0, 0, 0))
    }

    Sphere=(ls,cl,rw)=>{
      let X,Y,Z
      let ret=[]
      for(i=cl*rw;i--;){
        a=[]
        j=i%cl
        k=(i/cl|0)
        l=(j+1)%cl

        X=S(p=Math.PI*2/cl*j)*S(q=Math.PI/rw*k)*ls
        Y=C(q)*ls
        Z=C(p)*S(q)*ls
        a=[...a,[X,Y,Z]]
        X=S(p=Math.PI*2/cl*l)*S(q=Math.PI/rw*k)*ls
        Y=C(q)*ls
        Z=C(p)*S(q)*ls
        a=[...a,[X,Y,Z]]
        X=S(p=Math.PI*2/cl*l)*S(q=Math.PI/rw*(k+1))*ls
        Y=C(q)*ls
        Z=C(p)*S(q)*ls
        a=[...a,[X,Y,Z]]
        X=S(p=Math.PI*2/cl*j)*S(q=Math.PI/rw*(k+1))*ls
        Y=C(q)*ls
        Z=C(p)*S(q)*ls
        a=[...a,[X,Y,Z]]

        ret = [...ret, a]
      }
      return ret
    }

    Tetrahedron=ls=>{
      let ret=[]
      let a = []
      let theta=1.2217304763960306
      for(let i=3;i--;){
        X=S(p=Math.PI*2/3*i)
        Y=C(p)+.5
        Z=0
        R2(0,-theta/2,0)
        a=[...a, [X,Y,Z]]
      }
      ret=[...ret, a]
      b=JSON.parse(JSON.stringify(a))
      ax=ay=az=0
      b.map(v=>{
        X=v[0]
        Y=v[1]
        Z=v[2]
        R2(0,theta,0)
        v[0]=X
        v[1]=Y
        v[2]=Z
      })
      ret=[...ret, b]
      ct=0
      ret.map(v=>{
        v.map(q=>{
          ax+=q[0]
          ay+=q[1]
          az+=q[2]
          ct++
        })
      })
      ax/=ct
      ay/=ct
      az/=ct
      ret.map(v=>{
        v.map(q=>{
          q[0]-=ax*1.5
          q[1]-=ay*1.5
          q[2]-=az*1.5
        })
      })

      b=JSON.parse(JSON.stringify(ret))
      b.map(v=>{
        v.map(q=>{
          X=q[0]
          Y=q[1]
          Z=q[2]
          R2(0,Math.PI,Math.PI/2)
          q[0]=X
          q[1]=Y
          q[2]=Z
        })
      })
      ret=[...ret, ...b]

      ret.map(v=>{
        v.map(q=>{
          X=q[0]
          Y=q[1]
          Z=q[2]
          R2(0,.96,0)
          R2(0,0,t*5)
          R2(0,Math.PI,0)
          q[0]=X
          q[1]=Y
          q[2]=Z
          d=Math.hypot(...q)
          q[0]/=d
          q[1]/=d
          q[2]/=d
          q[0]*=ls
          q[1]*=ls
          q[2]*=ls
        })
      })
      return ret
    }

    Octahedron=ls=>{
      ret = []
      a=[]
      for(i=4;i--;){
        X1=S(p=Math.PI*2/4*i+Math.PI/4)
        Y1=C(p)
        Z1=0
        X2=S(p=Math.PI*2/4*(i+1)+Math.PI/4)
        Y2=C(p)
        Z2=0
        X3=0
        Y3=0
        Z3=1
        a=[
          [X1,Y1,Z1],
          [X2,Y2,Z2],
          [X3,Y3,Z3]
        ]
        ret=[...ret, a]
        a=[
          [X1,Y1,-Z1],
          [X2,Y2,-Z2],
          [X3,Y3,-Z3]
        ]
        ret=[...ret, a]
      }
      ret.map(v=>{
        v.map(q=>{
          X=q[0]
          Y=q[1]
          Z=q[2]
          R2(0,Math.PI/2,Math.PI/2)
          q[0]=X
          q[1]=Y
          q[2]=Z
          d=Math.hypot(...q)
          q[0]/=d
          q[1]/=d
          q[2]/=d
          q[0]*=ls
          q[1]*=ls
          q[2]*=ls
        })
      })
      return ret
    }

    Cube=ls=>{
      let ret=[]
      for(j=6;j--;ret=[...ret,b])for(b=[],i=4;i--;)b=[...b,[(a=[S(p=Math.PI/2*i+Math.PI/4),C(p),2**.5/2                                                                                                            ])[j%3]*(l=j<3?-ls:ls),a[(j+1)%3]*l,a[(j+2)%3]*l]]
      ret.map(v=>{
        v.map(q=>{
          X=q[0]
          Y=q[1]
          Z=q[2]
          R2(0,0,t*5)
          q[0]=X
          q[1]=Y
          q[2]=Z
          d=Math.hypot(...q)
          q[0]/=d
          q[1]/=d
          q[2]/=d
          q[0]*=ls
          q[1]*=ls
          q[2]*=ls
        })
      })
      return ret
    }

    Icosahedron=ls=>{
      let a=[1,1],ret=[]
      let b
      for(i=40;i--;)a=[...a,a[l=a.length-1]+a[l-1]];
      let phi=a[l]/a[l-1]
      a=[[[-phi,-1,0],[phi,-1,0],[phi,1,0],[-phi,1,0]],[[0,-phi,-1],[0,phi,-1],[0,phi,1],[0,-phi,1]],[[                                                                                                            -1,0,-phi],[-1,0,phi],[1,0,phi],[1,0,-phi]]]
      let ico=[[[0,1],[1,0],[1,3]],[[0,1],[2,3],[1,0]],[[2,0],[2,3],[1,0]],[[0,1],[2,3],[0,2]],[[1,1],[                                                                                                            2,3],[0,2]],[[1,1],[2,3],[2,0]],[[1,1],[1,2],[0,2]],[[0,1],[2,2],[0,2]],[[0,0],[1,0],[2,0]],[[2,0],[0,3                                                                                                            ],[0,0]],[[1,1],[1,2],[0,3]],[[1,1],[2,0],[0,3]],[[0,1],[1,3],[2,2]],[[1,3],[2,1],[2,2]],[[2,1],[0,3],[                                                                                                            1,2]],[[2,1],[0,0],[1,3]],[[1,2],[2,2],[2,1]],[[2,2],[1,2],[0,2]],[[0,3],[2,1],[0,0]],[[1,3],[1,0],[0,0                                                                                                            ]]]
      ico.map((v,i)=>{
        b=[]
        v.map(q=>{
          t1=q[0],t2=q[1]
          X=a[t1][t2][0],Y=a[t1][t2][1],Z=a[t1][t2][2]
          b=[...b, [X,Y,Z]]
        })
        ret=[...ret, b]
      })
      ret.map(v=>{
        v.map(q=>{
          X=q[0]
          Y=q[1]
          Z=q[2]
          R2(0,0,Math.PI/2)
          q[0]=X
          q[1]=Y
          q[2]=Z
          d=Math.hypot(...q)
          q[0]/=d
          q[1]/=d
          q[2]/=d
          q[0]*=ls
          q[1]*=ls
          q[2]*=ls
        })
      })
      return ret
    }

    Dodecahedron=ls=>{
      let ret=[]
      let sd=5
      let a=[], b=[]
      mind=6e6
      for(let i=sd;i--;){
        X=S(p=Math.PI*2/sd*i)
        Y=C(p)
        Z=0
        if(Y<mind)mind=Y
        a = [...a, [X,Y,Z]]
      }
      a=a.map(v=>{
        X=v[0]
        Y=v[1]-=mind
        Z=v[2]
        R2(0,.5535735,0)
        return [X,Y,Z]
      })

      ret = [...ret, a]
      b=JSON.parse(JSON.stringify(a)).map(v=>{
        d=Math.hypot(v[0],v[1])
        v[0]=S(p=Math.atan2(v[0],v[1])+Math.PI)*d
        v[1]=C(p)*d
        return v
      })
      ret = [...ret, b]

      ret.map(v=>{
        v.map(q=>{
          if(q[2]<mind)mind=q[2]
        })
      })
      ret.map(v=>{
        v.map(q=>{
          q[2]+=ang=1.538840639715
        })
      })
      b=JSON.parse(JSON.stringify(ret)).map(v=>{
        v.map(q=>{
          X=q[0]
          Y=q[1]
          Z=q[2]
          R2(Math.PI,0,Math.PI)
          q[0]=X
          q[1]=Y
          q[2]=Z
        })
        return v
      })
      e=JSON.parse(JSON.stringify(ret = [...ret, ...b]))

      b=JSON.parse(JSON.stringify(ret)).map(v=>{
        v.map(q=>{
          X=q[0]
          Y=q[1]
          Z=q[2]
          R2(0,Math.PI/2,Math.PI/2)
          q[0]=X
          q[1]=Y
          q[2]=Z
        })
        return v
      })
      ret = [...ret, ...b]

      b=JSON.parse(JSON.stringify(e)).map(v=>{
        v.map(q=>{
          X=q[0]
          Y=q[1]
          Z=q[2]
          R2(Math.PI/2,0,Math.PI/2)
          q[0]=X
          q[1]=Y
          q[2]=Z
        })
        return v
      })
      ret = [...ret, ...b]

      ret.map(v=>{
        v.map(q=>{
          X=q[0]
          Y=q[1]
          Z=q[2]
          R2(0,0,t*5)
          q[0]=X
          q[1]=Y
          q[2]=Z
          d=Math.hypot(...q)
          q[0]/=d
          q[1]/=d
          q[2]/=d
          q[0]*=ls
          q[1]*=ls
          q[2]*=ls
        })
      })
      return ret
    }

    stroke=(scol,fcol)=>{
      if(scol){
        x.closePath()
        //x.globalAlpha=.15
        x.strokeStyle=scol
        x.lineWidth=Math.min(500, 500/Z)
        //x.stroke()
        x.globalAlpha=1
        x.lineWidth/=12
        x.stroke()
      }
      if(fcol){
        x.fillStyle=fcol
        x.fill()
      }
    }

    stroke2=(scol,fcol)=>{
      if(scol){
        x.closePath()
        x.globalAlpha=.15
        x.strokeStyle=scol
        x.lineWidth=Math.min(500, 650/Z)
        x.stroke()
        x.globalAlpha=1
        x.lineWidth/=12
        x.stroke()
      }
      if(fcol){
        x.fillStyle=fcol
        x.fill()
      }
    }

    segs = 0
    iPsd = 20
    iPv = .075
    iPcv = .25
    iPulseFreq = 400
    iPcdierate = .02
    iPc_= 1

    Rl=Pt=Yw=oX=oY=0, oZ=4
    ls = 8 
    base_shapes = [
      Tetrahedron(ls),
      Cube(ls),
      Sphere(ls/1.1,6,4),
      Octahedron(ls),
      Dodecahedron(ls),
      Icosahedron(ls),
      ...shps
    ]

    rw=1, cl=1, br=1, sp=16
    iShapesC = rw*cl*br
    shapes = Array(iShapesC).fill().map((shp,m)=>{
      tx = ((m%cl)-cl/2+.5)*sp
      ty = (((m/cl|0)%rw)-rw/2+.5)*sp
      tz = ((m/cl/rw|0)-br/2+.5)*sp
      shpsel=6
      /*switch(m){
        case 0: shpsel = 5; break
        case 1: shpsel = 6; break
        case 2: shpsel = 4; break
      }*/
      a = JSON.parse(JSON.stringify(base_shapes[shpsel%base_shapes.length]))
      switch(shpsel){
        case 0:
          iPc = iPc_
        break
        case 1:
          iPc = iPc_*4
        break
        case 2:
          iPc = Math.max(1, iPc_/3|0)
        break
        case 3:
          iPc = iPc_
        break
        case 4:
          iPc = Math.max(1, iPc_/1.5|0)
        break
        case 5:
          iPc = Math.max(1, iPc_/2|0)
        break
        default:
        break
      }
      a = a.map((v,i)=>{
        P = []
        ax = ay = az = 0
        v.map(q=>{
          ax += q[0]
          ay += q[1]
          az += q[2]
        })
        ax /= v.length
        ay /= v.length
        az /= v.length
        if(shpsel>5 && ax>6 && ay <-6){
          iPc = (Rn()<.85)?1:0
        } else {
          iPc = 0
        }
        d  = Math.hypot(ax,ay,az)
        p1 = Math.atan2(ax, az)
        p2 = Math.acos(ay/d)
        X1 = Y1 = Z1 = 0
        for(let k=iPc; k--;){
          X2 = S(p=Math.PI*2*Rn())*1e3
          Y2 = C(p)*1e3
          Z2 = 0
          v.map((q,j)=>{
            l = j
            X = v[l][0]-ax
            Y = v[l][1]-ay
            Z = v[l][2]-az
            R(0,0,-p1)
            R(0,p2+Math.PI/2,0)
            X3 = X
            Y3 = Y
            l = (j+1)%v.length
            X = v[l][0]-ax
            Y = v[l][1]-ay
            Z = v[l][2]-az
            R(0,0,-p1)
            R(0,p2+Math.PI/2,0)
            X4 = X
            Y4 = Y
            if(pt = I(X1,Y1,X2,Y2,X3,Y3,X4,Y4)){
              ls = Rn()**.5
              X = pt[0] * ls
              Y = pt[1] * ls
              Z = 0
              R(0,-Math.PI/2-p2,0)
              R(0,0,p1)
              X += ax
              Y += ay
              Z += az
              vx = S(p=Math.PI*2*Rn())*iPv
              vy = C(p)*iPv
              vz = 0
              P = [...P, [X, Y, Z, vx, vy, vz, [], []]]
            }
          })
        }
        return [v, P]
      })
      return [tx, ty, tz, a]
    })

    bg = new Image()
    go = false
    bg.onload = () =>{
      go=true
    }
    bg.src = 'https://srmcgann.github.io/drawings/rotated/05412d422b2714fbeab2593366338211_rotated.jpg'

    cols=[
      '#ff882218',
      '#ffff8806',
      '#4400ff08',
      '',
      '',
      '',
    ]
  }

  if(go){
    x.globalAlpha=.2
    x.drawImage(bg, 0, 0, c.width, c.height)
    x.globalAlpha=1
    x.fillStyle='#0004'
    x.fillRect(0,0,c.width,c.height)
    oX=0
    oY=0
    oZ=25
    x.lineJoin=x.lineCap='round'

    shapes.map((shp, m) => {
      Rl = S(t/6)/2 
      Pt = S(t)/4-.6
      Yw = -C(t*2)/1.5+Math.PI/2
      tx = shp[0]
      ty = shp[1]
      tz = shp[2]
      shp[3].map((v,i) => {
        ax = ay = az = 0
        x.beginPath()
        v[0].map(q=>{
          ax += X = q[0]
          ay += Y = q[1]
          az += Z = q[2]
          R(Rl,Pt,Yw,1)
          X+=tx
          Y+=ty
          Z+=tz
          if(Z>0) x.lineTo(...Q())
        })
        if(m==1){
          stroke2('#ffffff06', cols[m])
        } else{
          stroke('#ffffff13', cols[m])
        }
        ax/=v[0].length
        ay/=v[0].length
        az/=v[0].length

        d  = Math.hypot(ax,ay,az)
        p1 = Math.atan2(ax, az)
        p2 = Math.acos(ay/d)
        v[1].map((q, gg) => {
          q[7] = q[7].filter(n=>n[4]>0)
          q[7].map((n,j)=>{
            //cx = n[0]
            //cy = n[1]
            //cz = n[2]
            x.beginPath()
            n[3].map(k => {
              X = k[0] - ax
              Y = k[1] - ay
              Z = k[2] - az
              R(0, 0, -p1)
              R(0, p2+Math.PI/2, 0)
              X_ = X
              Y_ = Y
              Z_ = Z
              X1 = 0
              Y1 = 0
              Z1 = 0
              X2 = X + k[3]
              Y2 = Y + k[4]
              Z2 = Z
              if(0&&m!=1) v[0].map((n,m) => {
                l = m
                X = v[0][l][0]-ax
                Y = v[0][l][1]-ay
                Z = v[0][l][2]-az
                R(0,0,-p1)
                R(0,p2+Math.PI/2,0)
                X3 = X
                Y3 = Y
                l = (m+1)%v[0].length 
                X = v[0][l][0]-ax
                Y = v[0][l][1]-ay
                Z = v[0][l][2]-az
                R(0,0,-p1)
                R(0,p2+Math.PI/2,0)
                X4 = X
                Y4 = Y
                if(pt = I(X1,Y1,X2,Y2,X3,Y3,X4,Y4)){
                  //q[3] *= -1//(X_ - pt[0])/300
                  //q[4] *= -1//(Y_ - pt[1])/300
                  k[3] -= (X2 - pt[0])*3
                  k[4] -= (Y2 - pt[1])*3
                }
              })

              d=Math.hypot(k[3], k[4], k[5])
              k[3]/=d
              k[4]/=d
              k[5]/=d
              k[3]*=iPcv
              k[4]*=iPcv
              k[5]*=iPcv

              X = X_ + k[3]
              Y = Y_ + k[4]
              Z = Z_ + k[5]

              R(0,-Math.PI/2-p2,0)
              R(0,0,p1)
              X += ax
              Y += ay
              Z += az
              k[0] = X
              k[1] = Y
              k[2] = Z
              R(Rl,Pt,Yw,1)
              if(Z>0){
                X+=tx
                Y+=ty
                Z+=tz
                x.lineTo(...Q())
              }
            })
            stroke2(`hsla(${n[4]*360+t*200},99%,${120-(1-n[4]**2)*70}%,${n[4]}`)
            n[4] -= iPcdierate
          })

          q[6] = q[6].filter((v,i)=>i<segs)
          q[6].map((n,j)=>{
            n[3]-=.025
            if(j){
              x.beginPath()
              l = j
              X = q[6][l][0]
              Y = q[6][l][1]
              Z = q[6][l][2]
              R(Rl,Pt,Yw,1)
              X+=tx
              Y+=ty
              Z+=tz
              if(Z>0) x.lineTo(...Q())
              l = j-1
              X = q[6][l][0]
              Y = q[6][l][1]
              Z = q[6][l][2]
              R(Rl,Pt,Yw,1)
              X+=tx
              Y+=ty
              Z+=tz
              if(Z>0) x.lineTo(...Q())
              //x.strokeStyle='#50f2'
              x.lineWidth = Math.min(1e3,10+(800/segs*j)/Z)
              //x.stroke()
              x.strokeStyle='#fff4'
              x.lineWidth /= 4
              x.stroke()
            }
          })

          X = q[0]
          Y = q[1]
          Z = q[2]
          X = q[0] - ax
          Y = q[1] - ay
          Z = q[2] - az
          R(0,0,-p1)
          R(0,p2+Math.PI/2,0)
          X_ = X
          Y_ = Y
          Z_ = Z

          X1 = 0
          Y1 = 0
          Z1 = 0
          X2 = X + (q[3] += (Rn()-.5)*iPv)
          Y2 = Y + (q[4] += (Rn()-.5)*iPv)
          Z2 = Z
          v[0].map((n,m)=>{
            l = m
            X = v[0][l][0]-ax
            Y = v[0][l][1]-ay
            Z = v[0][l][2]-az
            R(0,0,-p1)
            R(0,p2+Math.PI/2,0)
            X3 = X
            Y3 = Y
            l = (m+1)%v[0].length 
            X = v[0][l][0]-ax
            Y = v[0][l][1]-ay
            Z = v[0][l][2]-az
            R(0,0,-p1)
            R(0,p2+Math.PI/2,0)
            X4 = X
            Y4 = Y
            if(pt = I(X1,Y1,X2,Y2,X3,Y3,X4,Y4)){
              //q[3] *= -1//(X_ - pt[0])/300
              //q[4] *= -1//(Y_ - pt[1])/300
              q[3] -= (X2 - pt[0])*2
              q[4] -= (Y2 - pt[1])*2
            }
          })

          d=Math.hypot(q[3],q[4],q[5])
          q[3]/=d
          q[4]/=d 
          q[5]/=d
          q[3]*=iPv
          q[4]*=iPv
          q[5]*=iPv

          X = X_ + q[3]
          Y = Y_ + q[4]
          Z = Z_ + q[5]

          R(0,-Math.PI/2-p2,0)
          R(0,0,p1)
          X += ax
          Y += ay
          Z += az
          q[0] = X
          q[1] = Y
          q[2] = Z
          q[6] = [[X,Y,Z,1], ...q[6]]
          if(!((j+i*21+q.length+gg*5+(t*60)|0)%iPulseFreq)){
            a = []
            for(let i = iPsd; i--;){
              let cx = X-S(p=Math.PI*2/iPsd*i)*.01
              let cy = Y-C(p)*.01
              let cz = Z
              vx = S(p)
              vy = C(p)
              a = [...a, [cx,cy,cz,vx,vy,0]]
            }
            q[7] = [[X,Y,Z,a,1], ...q[7]]
          }
          /*R(Rl,Pt,Yw,1)
          if(Z>0){
            X+=tx
            Y+=ty
            Z+=tz
            l = Q()
            s = Math.min(1e3, 100/Z)
            x.fillStyle='#fff1'
            x.fillRect(l[0]-s/2,l[1]-s/2,s,s) 
            s/=6
            x.fillStyle='#fffa'
            x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
          }*/
        })
      })
    })
  }

  t+=1/60
  requestAnimationFrame(Draw)

}
Draw()