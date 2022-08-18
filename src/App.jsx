import React, {useEffect, useState, useRef} from 'react';
import mojs from "@mojs/core"

import './app.scss'
import ClapComponent from './ClapComponent';

const App = () => {

    const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random()*(max-min+1)+min)
      } 


    const triangleBurst = useRef();
    const circleBurst = useRef();
    const countAnimation = useRef();
    const countTotalAnimation = useRef();
    const scaleButton = useRef();


    const[totalCount, setTotalCount] = useState(generateRandomNumber(500, 10000));
    const [count, setCount] = useState(0);
    const [isClicked, setClicked] = useState(false)

 useEffect(() =>{
    const tlDuration = 500;
    
    triangleBurst.current = new mojs.Burst({
        parent: '#clap',
        radius: {50:95},
        count: 5,
        angle: 30,
        children: {
          shape: 'polygon',
          radius: {6: 0},
          scale: 1,
          stroke: 'rgba(211,84,0 ,0.5)',
          strokeWidth: 2,
          angle: 210,
          delay: 30,
          speed: 0.2,
          easing: mojs.easing.bezier(0.1, 1, 0.3 ,1),
          duration: tlDuration
        } 
    });

    circleBurst.current =  new mojs.Burst({
    parent: '#clap',
    radius: {50:75},
    angle: 25,
    duration: tlDuration,
    children: {
      shape: 'circle',
      fill: 'rgba(149,165,166 ,0.5)',
      delay: 30,
      speed: 0.2,
      radius: {3: 0},
      easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
    }
   });
      countAnimation.current = new mojs.Html({
        el: '#clap--count',
        isShowStart: false,
        isShowEnd: true,
        y: {0: -30},
        opacity: {0:1},
        duration: tlDuration
      }).then({
        opacity: {1:0},
        y: -80,
        delay: 3*(tlDuration/2)
      });

      countTotalAnimation.current = new mojs.Html({
        el: '#clap--count-total',
        isShowStart: false,
        isShowEnd: true,
        opacity: {0:1},
        delay: (tlDuration)/2,
        duration: tlDuration,
        y: {0: -3}
      });

      scaleButton.current = new mojs.Html({
        el: '#clap',
        duration: tlDuration,
        scale: {1.3: 1},
        easing: mojs.easing.out
      });


    const clap = document.getElementById('clap');
    clap.style.transform = "scale(1, 1)";
    

 }, [])


  
  const handleClick = () => {
    countAnimation.current.replay();
    countTotalAnimation.current.play();
    circleBurst.current.play();
    triangleBurst.current.play();
    scaleButton.current.play();

    setCount(Math.min((count + 1), 50))
    setTotalCount(totalCount + 1);
    setClicked(true)
  }

  return (
   <ClapComponent handleClick={handleClick} count={count} totalCount={totalCount} isClicked={isClicked} />
  )
}

export default App