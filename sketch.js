var piso
var pontos
var trex ,trex_running;
var piso2
var semvoo
var nuvem2
var cactu1, cactu2, cactu3, cactu4, cactu5, cactu6
var cactuss
var nuvenss
var play = 1
var end = 0
var gameState = play
var derrota
var perdeu
var denovo
var perdeu2
var denovo2
var surpresa
function preload(){
  trex_running = loadAnimation('trex1.png', 'trex3.png', 'trex4.png')
  piso2 = loadImage('ground2.png')
  nuvem2 = loadImage('cloud.png')
  cactu1 = loadImage('obstacle1.png')
  cactu2 = loadImage('obstacle2.png')
  cactu3 = loadImage('obstacle3.png')
  cactu4 = loadImage('obstacle4.png')
  cactu5 = loadImage('obstacle5.png')
  cactu6 = loadImage('obstacle6.png')
  derrota = loadAnimation('trex_collided.png')
  perdeu2 = loadImage('gameOver.png')
  denovo2 = loadImage('restart.png')
  surpresa = loadSound('Gravação.mp3')
}

function setup(){
  createCanvas(1280,570)
  pontos = 0
  semvoo = createSprite (100, 320, 400, 30)
  semvoo.visible = false
  trex = createSprite (100, 240, 20, 50)
  trex.addAnimation('trex_running', trex_running)
  piso = createSprite (100, 300, 10, 10)
  edges = createEdgeSprites()
  piso.addImage(piso2)
  cactuss = new Group()
  nuvenss = new Group()
  trex.setCollider('circle', 0,0,50)
  trex.addAnimation('trex_collided',derrota)
  perdeu = createSprite(625, 150, 400, 30)
  perdeu.addImage(perdeu2)
  perdeu.visible = false
  denovo = createSprite(625, 250, 400, 30)
  denovo.addImage(denovo2)
  denovo.visible = false
}

function draw(){
  background("white")
  textSize(20)
  text('anos vivo: ' + pontos, 1100, 50)
  if(gameState == play){
    pontos += Math.round(frameCount / 10)
    if (keyIsDown(32) && trex.y >= 195){
      trex.velocityY = -13
    } 
    if (piso.x < 0){
      piso.x = piso.width / 2
    }
    piso.velocityX = -10
    trex.velocityY = trex.velocityY +1
    tokitou()
  cactus()
    if(cactuss.isTouching(trex)){
      gameState = end
    }
  }

  else if (gameState == end){
    piso.velocityX = 0
    cactuss.setVelocityXEach(0)
    nuvenss.setVelocityXEach(0)
    trex.changeAnimation('trex_collided',derrota)
    trex.velocityY = trex.velocityY +100
    nuvenss.setLifetimeEach(-1)
    cactuss.setLifetimeEach(-1)
    perdeu.visible = true
    denovo.visible = true
  }

  if(mousePressedOver(denovo)){
    funcao()
  }

  if(mousePressedOver(trex)){
    surpresa.play()
  }
  trex.collide(semvoo)
  drawSprites()
}

function tokitou(){
  if(frameCount % 60 === 0){
    nuvem = createSprite (1300, 100, 40, 10)
    nuvem.addImage(nuvem2)
    nuvem.velocityX = -5
    nuvem.y = Math.round(random(100, 250))
    nuvem.depth = trex.depth
    trex.depth +=1
    nuvem.lifetime = 270
    nuvenss.add(nuvem)
  }
}
function cactus(){
  if(frameCount % 60 === 0){
    cactu = createSprite (1300, 275, 40, 10)
    cactu.velocityX = -10
    var kk = Math.round(random(1, 6))
    switch(kk){
      case 1:cactu.addImage(cactu1)
      break;
       case 2:cactu.addImage(cactu2)
      break; 
      case 3:cactu.addImage(cactu3)
      break;
       case 4:cactu.addImage(cactu4)
      break;
       case 5:cactu.addImage(cactu5)
      break;
       case 6:cactu.addImage(cactu6)
      break; 
      default: break
    }
    cactu.lifetime = 270
    cactuss.add(cactu)
  }
  cactuss.depth = denovo.depth
  denovo.depth +=1
}

function funcao(){
  nuvenss.destroyEach()
  cactuss.destroyEach()
  pontos = 0
  denovo.visible = false
  perdeu.visible = false
  trex.changeAnimation('trex_running',trex_running)
gameState = play
}