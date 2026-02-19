import { animate, svg, utils } from 'animejs';

export function initMeaningfulParticles() {
  const containers = document.querySelectorAll('.particles-container');

  containers.forEach(container => {
    const $path1 = container.querySelector('.path-main');
    const $path2 = container.querySelector('.path-morph');

    if (!$path1 || !$path2) return;

    // Definimos formas con sentido (8 puntos cada una para simetría)
    const shapes = {
      // Un hexágono tecnológico (CPU/Core)
      hexagon: "250,50 423,150 423,350 250,450 77,350 77,150 250,50 250,50",
      
      // Un símbolo de terminal o prompt (>)
      terminal: "150,100 150,100 400,250 400,250 150,400 150,400 120,370 120,130",
      
      // Un diamante abstracto (Arquitectura/Software)
      diamond: "250,80 420,250 420,250 250,420 80,250 80,250 250,80 250,80",
      
      // Una forma de "paréntesis" o bloque de código ({})
      block: "150,50 350,50 400,100 400,400 350,450 150,450 100,400 100,100"
    };

    const shapeKeys = Object.keys(shapes);
    let currentIdx = 0;

    function animateSequence() {
      // Elegimos la siguiente forma en la lista
      currentIdx = (currentIdx + 1) % shapeKeys.length;
      const nextShape = shapes[shapeKeys[currentIdx]];

      // Seteamos el destino oculto
      utils.set($path2, { points: nextShape });

      animate($path1, {
        points: svg.morphTo($path2),
        ease: 'expoInOut', // Transición más "mecánica" y elegante
        duration: 1200,
        delay: 800, // Pausa para que se aprecie la forma
        onComplete: animateSequence
      });
    }

    animateSequence();
  });
}

initMeaningfulParticles();