
window.addEventListener('DOMContentLoaded', (event) =>{



    let worldangle = 0
    
    let keysPressed = {}

    document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true;
     });
     
     document.addEventListener('keyup', (event) => {
         delete keysPressed[event.key];
      });

      let tutorial_canvas = document.getElementById("tutorial");
      let tutorial_canvas_context = tutorial_canvas.getContext('2d');
      let extra_canvas = document.getElementById("extra");
      let extra_canvas_context = extra_canvas.getContext('2d');

      tutorial_canvas.style.background = "#000000"
      extra_canvas.style.background = "#00000000"

      tutorial_canvas_context.translate(350, 350)
    //   tutorial_canvas_context.scale(.5, .5)


    let flex = tutorial_canvas.getBoundingClientRect();

    // Add the event listeners for mousedown, mousemove, and mouseup
    let tip = {}
    let xs
    let ys
   
   
    
    window.addEventListener('mousedown', e => {

          flex = tutorial_canvas.getBoundingClientRect();
          xs = e.clientX - flex.left;
          ys = e.clientY - flex.top;
          tip.x = xs
          tip.y = ys
    
          tip.body = tip

     });
    

    class Rectangle {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }
        draw(){
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move(){
            this.x+=this.xmom
            this.y+=this.ymom
        }
        isPointInside(point){
            if(point.x >= this.x){
                if(point.y >= this.y){
                    if(point.x <= this.x+this.width){
                        if(point.y <= this.y+this.height){
                        return true
                        }
                    }
                }
            }
            return false
        }
    }
    class Circle{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){

            this.height = 0
            this.width = 0
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.xrepel = 0
            this.yrepel = 0
            this.lens = 0
        }       
         draw(){
            tutorial_canvas_context.lineWidth = 1
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
           tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke(); 
        }
        move(){
            this.x += this.xmom
            this.y += this.ymom
        }
        isPointInside(point){
            this.areaY = point.y - this.y 
            this.areaX = point.x - this.x
            if(((this.areaX*this.areaX)+(this.areaY*this.areaY)) <= (this.radius*this.radius)){
                return true
            }
            return false
        }

        repelCheck(point){
            this.areaY = point.y - this.y 
            this.areaX = point.x - this.x
            if(((this.areaX*this.areaX)+(this.areaY*this.areaY)) <= (this.radius+point.radius)*(point.radius+this.radius)){
                return true
            }
            return false
        }
    }

    class Line{
        constructor(x,y, x2, y2, color, width){
            this.x1 = x
            this.y1 = y
            this.x2 = x2
            this.y2 = y2
            this.color = color
            this.width = width
        }
        hypotenuse(){
            let xdif = this.x1-this.x2
            let ydif = this.y1-this.y2
            let hypotenuse = (xdif*xdif)+(ydif*ydif)
            return Math.sqrt(hypotenuse)
        }
        draw(){
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.lineWidth = this.width
            tutorial_canvas_context.beginPath()
            tutorial_canvas_context.moveTo(this.x1, this.y1)         
            tutorial_canvas_context.lineTo(this.x2, this.y2)
            tutorial_canvas_context.stroke()
            tutorial_canvas_context.lineWidth = 1
        }
    }

    class Sprite{
        constructor(src, w, h){
            this.image = new Image()
            this.image.src = src
            this.center = new Circle(350,350, 10, "transparent")
            this.h = h
            this.w = w
            this.angle = Math.random()*6.28
            this.guide = new Circle(0,0,30,"yellow")

        }
        // drawPrime(){
        //     this.control()
        //     tutorial_canvas_context.rotate(this.angle)
        //     tutorial_canvas_context.translate(-this.center.x, -this.center.y)
        //     tutorial_canvas_context.drawImage(this.image, this.center.x-(this.w/2), this.center.y-(this.h/2), this.w, this.h)

        //     tutorial_canvas_context.translate(this.center.x, this.center.y)
        //     tutorial_canvas_context.rotate(-this.angle)
        //     // this.guide.x = this.center.x + (Math.sin(this.angle)*61)
        //     // this.guide.y = this.center.y + (Math.cos(this.angle)*61)
        //     // this.guide.draw()
        //     // console.log(this.guide)
        // }
        draw(){
            // this.control()
            tutorial_canvas_context.drawImage(this.image, this.center.x-(this.w/2), this.center.y-(this.h/2), this.w, this.h)

            // this.guide.x = this.center.x + (Math.sin(this.angle)*61)
            // this.guide.y = this.center.y + (Math.cos(this.angle)*61)
            // this.guide.draw()
            // console.log(this.guide)
        }
        rotate(){
            worldangle +=.0005
            this.angle +=.05
            // tutorial_canvas_context.rotate(this.angle)
        }
        unrotate(){
            worldangle -=.0015
            this.angle -=.15
            // tutorial_canvas_context.rotate(this.angle)
        }
        control(){

            if(keysPressed['r']){
                this.rotate()
            }
            if(keysPressed['t']){
                this.unrotate()
            }
            if(keysPressed['w']){
                this.center.x += (Math.sin(this.angle)*5)
                this.center.y += (Math.cos(this.angle)*5)


            tutorial_canvas_context.translate( (Math.sin(this.angle)*1),  (Math.cos(this.angle)*1))

            let protosprite = new Sprite('donut.png', this.w, this.h)
            protosprite.center.x = this.center.x
            protosprite.center.y = this.center.y
            snake.push(protosprite)
                // console.log(this.center)
            }
        }

    }

    let snake = []

    let protosprite
    for(let t =0 ; t< 10; t++){

        let scale = Math.random()+.2
        protosprite = new Sprite('donut.png', scale*90, scale*75)
        protosprite.center.x = 350+Math.random()*700
        protosprite.center.y = 350+Math.random()*700
        snake.push(protosprite)

    }

    window.setInterval(function(){ 
        tutorial_canvas_context.clearRect(-10000000000,-1000000,tutorial_canvas.width*10000000000, tutorial_canvas.height*10000000000)
        // donut.drawPrime()



        // 

        protosprite.control()
        tutorial_canvas_context.rotate(protosprite.angle+worldangle)
        tutorial_canvas_context.translate(-protosprite.center.x, -protosprite.center.y)
        for(let t = snake.length-1; t> 0; t--){
            snake[t].draw()
            if(snake[t].angle > worldangle-.1 && snake[t].angle < worldangle+.1){
                protosprite = snake[t]
            }
        }
        tutorial_canvas_context.translate(protosprite.center.x, protosprite.center.y)

        tutorial_canvas_context.rotate(-(protosprite.angle-worldangle))
        // 
    }, 50) 



        
})