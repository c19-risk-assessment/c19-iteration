import React from 'react';
import { Component } from 'react';
const Chart = require('chart.js');
import { Container, Box } from '@chakra-ui/react';
// //chart stuff vvvvvv

// //chart stuff ^^^^

// did i do this right jonah?
//vvvvv right I forgot about that
//not workin throwing me error on browser
// oh we also need to use super on props and add the constructor and pass in props, I believe

class Histogram extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const canvas = document.getElementById('canvas2');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particleArray = [];
    let adjustX = 10;
    let adjustY = 10;
    let connectLength = 50;
    let searchDistance = Math.sqrt(Math.pow(connectLength, 2) / 2);

    //handle mouse
    const mouse = {
      x: null,
      y: null,
      radius: 200,
    };
    let mouseMaxDistance = Math.sqrt(Math.pow(mouse.radius, 2) / 2);

    window.addEventListener('mousemove', function (event) {
      mouse['x'] = event['x'];
      mouse['y'] = event['y'];
    });

    ctx.fillStyle = 'white';
    ctx.font = '10px Verdana';

    ctx.fillText('Covid Risk Histogram', 0, 10);
    const textCoordinates = ctx.getImageData(0, 0, 200, 200);
    //////////////////////
    //rgba(255, 92, 133, 1)
    //rgba(205, 255, 117, 1)
    //ctx.fillStyle ='rgba('+(255-255*this.color)+','+(255-255*this.color2)+','+(255-255*this.color3)+',0.5)'
    //ctx.fillStyle ='rgba('+(255-50*this.color)+','+(92+163*this.color2)+','+(133-16*this.color3)+',1)';

    ///////////////////
    class Particle {
      constructor(x, y) {
        this['x'] = x;
        this['y'] = y;
        this['size'] = 3;
        this['baseX'] = this['x'];
        this['baseY'] = this['y'];
        this['density'] = Math.random() * 28 + 2;
        this['velocity'] = Math.random() * 10 * -1;
        this['color'] = 0;
        this['color2'] = 0;
        this['color3'] = 0;
        this['farcolor'] = 0;
      }
      // rgb(255, 79, 79)
      draw() {
        ctx.fillStyle =
          'rgba(' +
          (255 - 255 * this.color3) +
          ',' +
          (255 - 255 * this.color) +
          ',' +
          (255 - 255 * this.color) +
          ',0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < mouse.radius - 50) {
          this.x -= directionX;
          this.y -= directionY;
          this.color = distance / (mouse.radius - 50);
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 50;
            if (Math.abs(this.x - this.baseX) < 0.15) {
              let dx = this.x - this.baseX;
              this.x -= dx;
            }
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 50;
            if (Math.abs(this.y - this.baseY) < 0.15) {
              let dy = this.y - this.baseY;
              this.y -= dy;
            }
          }
          let astrayX = this.x - this.baseX;
          let astrayY = this.y - this.baseY;
          let astray = Math.sqrt(astrayX * astrayX + astrayY * astrayY);
          if (astray < mouse.radius - 50) {
            this.color = astray / (mouse.radius - 50);
          }
        }
      }
    }

    function init() {
      for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
          if (
            textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] >
            128
          ) {
            let positionX = x + adjustX;
            let positionY = y + adjustY;
            particleArray.push(new Particle(positionX * 10, positionY * 10));
          }
        }
      }
    }
    init();

    ///////////////////////////////////
    // console.log(particleArray[0])
    // console.log(particleArray[100])
    // console.log(particleArray[particleArray.length - 1])
    // console.log(particleArray[particleArray.length - 15])
    ///////////////////////////
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
      }
      connect();
      requestAnimationFrame(animate);
    }
    animate();

    function connect() {
      let opacityValue = 1;
      for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
          if (
            particleArray[a].x -
              particleArray[b].x +
              particleArray[a].x -
              particleArray[b].x <
            searchDistance
          ) {
            let distance = Math.sqrt(
              (particleArray[a].x - particleArray[b].x) *
                (particleArray[a].x - particleArray[b].x) +
                (particleArray[a].y - particleArray[b].y) *
                  (particleArray[a].y - particleArray[b].y)
            );
            if (distance < connectLength) {
              let rmix = (particleArray[a].color + particleArray[b].color) / 2;
              let gmix =
                (particleArray[a].color2 + particleArray[b].color2) / 2;
              let bmix =
                (particleArray[a].color3 + particleArray[b].color3) / 2;
              let widthMix =
                (particleArray[a].size + particleArray[b].size) / 2.5;
              opacityValue = 1 - distance / 30;
              ctx.strokeStyle =
                'rgba(' +
                (255 - 255 * bmix) +
                ',' +
                (255 - 255 * rmix) +
                ',' +
                (255 - 255 * rmix) +
                ',' +
                opacityValue +
                ')';
              ctx.lineWidth = widthMix;
              ctx.beginPath();
              ctx.moveTo(particleArray[a].x, particleArray[a].y);
              ctx.lineTo(particleArray[b].x, particleArray[b].y);
              ctx.stroke();
            }
          }
        }
      }
    }

    //keons particles^^^^^^^^^^^-----------------------------------------------------------------------

    var ctx2 = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx2, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [1, 2, 3, 5, 4, 3, 0],
          },
        ],
      },
      // Configuration options go here
      options: {},
    });
  }
  render() {
    return (
      <div>
        <canvas id="canvas2"></canvas>
        <div className="chart">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    );
  }
}

export default Histogram;
