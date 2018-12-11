

window.onload = _ => {
  draw()
  window.setInterval(draw, 1000)
}

const range = num => Array.from(Array(num).keys())

const getCentre = (p1, p2, o) => {
  let mp = {X: (p1.X + p2.X) / 2, Y: (p1.Y + p2.Y) / 2}
  let dx = (p1.X - p2.X), dy = (p1.Y - p2.Y)
  let ddx = 0
  let ddy = 0
  if (Math.abs(dy) < 1) {
    ddx = 0
    ddy = Math.random() * (o.Y - mp.Y) 
  } else {
    let dir = (mp.X > o.X) ? -1 : 1
    ddx = dir * Math.random() * 5
    ddy = - (dx / dy) * ddx
  }
  let x = mp.X + ddx
  let y = mp.Y + ddy
  let r = Math.sqrt(Math.pow(x - p1.X, 2) + Math.pow(y - p1.Y, 2))
  return {X: x, Y: y, R: r}
}

const getRad = (p, o) => {
  let x = (p.X - o.X)
  let y = (p.Y - o.Y)
  return Math.atan2(y, x)
}

const draw = _ => {
  let canvas = document.getElementById('Canvas')
  let ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, 640, 640)

  let devide = 12
  let r = 50
  let o = {X: 150, Y: 100}

  let radu = Math.PI * 2 / devide
  // base ellipse points
  let ps = range(devide).map(i => {
          let x = Math.cos(radu * i) * r * 2 + o.X
          let y = Math.sin(radu * i) * r + o.Y
          return {X: x, Y: y}
  })
  
  // middle points
  let msource = ps.concat(ps[0])
  ctx.beginPath()
  ctx.lineWidth = 4
  ctx.lineJoin = "round"
  let ms = ps.map( (p1, i) => {
          let p2 = msource[i + 1]
          let mp = getCentre(p1, p2, o)
          let r1 = getRad(p1, mp)
          let r2 = getRad(p2, mp)
          ctx.arc(mp.X, mp.Y, mp.R, r1, r2)
          return mp
  })
  ctx.closePath()
  ctx.stroke()
}
