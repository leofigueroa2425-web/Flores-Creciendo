onload = () => {
    document.body.classList.remove("container");
    
    // Espera a que las flores crezcan (4s) y permanezcan por 5s adicionales
    setTimeout(() => {
        transformFlowersToHeart();
    }, 9000);
};

function transformFlowersToHeart() {
    // Ocultar solo el pasto/grass (no los tallos)
    hideOnlyGrass();
    
    // Crear fondo de transición
    createTransitionBackground();
    
    // Convertir flores (pétalos y tallos) en partículas
    setTimeout(() => {
        convertFlowersToParticles();
    }, 1000);
}

function hideOnlyGrass() {
    // Ocultar solo el pasto, no los tallos de las flores
    const grassElements = document.querySelectorAll(
        '.growing-grass, .long-g, .flower__grass, .grow-ans, .moon'
    );
    
    grassElements.forEach(grass => {
        grass.classList.add('grass-hidden');
    });
}

function createTransitionBackground() {
    const bg = document.createElement('div');
    bg.classList.add('transition-bg');
    document.body.appendChild(bg);
    
    setTimeout(() => {
        bg.classList.add('transition-bg-visible');
    }, 500);
}

function convertFlowersToParticles() {
    const flowers = [
        { 
            element: document.querySelector('.flower--1'),
            petalColor: '#f5f069',
            stemColor: '#095721'
        },
        { 
            element: document.querySelector('.flower--2'),
            petalColor: '#f5d869', 
            stemColor: '#0a4d1c'
        },
        { 
            element: document.querySelector('.flower--3'),
            petalColor: '#f5c869',
            stemColor: '#083c16'
        },
        { 
            element: document.querySelector('.flower--4'),
            petalColor: '#f5d869', 
            stemColor: '#0a4d1c'
        },
        { 
            element: document.querySelector('.flower--5'),
            petalColor: '#f5d869', 
            stemColor: '#0a4d1c'
        },
        { 
            element: document.querySelector('.flower--6'),
            petalColor: '#f5c869',
            stemColor: '#083c16'
        }
    ];
    
    const heartFinalX = window.innerWidth / 2;
    const heartFinalY = window.innerHeight / 2;
    
    // Convertir cada flor en partículas (pétalos y tallos)
    flowers.forEach((flower, index) => {
        const flowerRect = flower.element.getBoundingClientRect();
        const flowerCenterX = flowerRect.left + flowerRect.width / 2;
        const flowerCenterY = flowerRect.top + flowerRect.height / 2;
        
        // Animación suave de descomposición de la flor completa
        flower.element.style.animation = 'flower-to-particles 2.5s forwards';
        
        // Crear partículas de pétalos y tallos después de un breve retraso
        setTimeout(() => {
            // Crear partículas de pétalos
            createPetalParticles(flowerCenterX, flowerCenterY, heartFinalX, heartFinalY, flower.petalColor, index);
            
            // Crear partículas de tallos (desde la base de la flor)
            const stemBaseY = flowerRect.bottom;
            createStemParticles(flowerCenterX, stemBaseY, heartFinalX, heartFinalY, flower.stemColor, index);
            
            // Ocultar completamente la flor después de la animación
            setTimeout(() => {
                flower.element.style.display = 'none';
            }, 2500);
        }, 600);
    });
    
    // Mostrar el corazón después de que todas las partículas completen su viaje
    setTimeout(() => {
        showHeart(heartFinalX, heartFinalY);
    }, 5000);
}

function createPetalParticles(flowerX, flowerY, heartX, heartY, baseColor, flowerIndex) {
    const particlesContainer = document.getElementById('flower-particles');
    const particleCount = 20; // Partículas de pétalos
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.classList.add('flower-particle', 'petal-particle');
            
            // Tamaño y forma de partícula de pétalo
            const size = 2.5 + Math.random() * 3.5;
            particle.style.width = `${size}vmin`;
            particle.style.height = `${size}vmin`;
            
            // Color basado en la flor de origen
            particle.style.background = `radial-gradient(circle, ${baseColor}, #ff7b4d)`;
            
            // Posición inicial (desde los pétalos de la flor)
            const petalSpread = 40;
            const startX = flowerX + (Math.random() - 0.5) * petalSpread;
            const startY = flowerY - 20 + (Math.random() - 0.5) * petalSpread;
            
            particle.style.left = `${startX}px`;
            particle.style.top = `${startY}px`;
            
            // Punto intermedio con trayectoria curva suave
            const midX = startX + (heartX - startX) * 0.4 + (Math.random() - 0.5) * 150;
            const midY = startY + (heartY - startY) * 0.4 + (Math.random() - 0.5) * 150;
            
            // Variables CSS para la animación suave
            particle.style.setProperty('--startX', '0px');
            particle.style.setProperty('--startY', '0px');
            particle.style.setProperty('--midX', `${midX - startX}px`);
            particle.style.setProperty('--midY', `${midY - startY}px`);
            particle.style.setProperty('--targetX', `${heartX - startX}px`);
            particle.style.setProperty('--targetY', `${heartY - startY}px`);
            
            particlesContainer.appendChild(particle);
            
            // Iniciar animación suave del viaje del pétalo
            setTimeout(() => {
                particle.style.animation = `petal-particle-journey 3.5s forwards cubic-bezier(0.4, 0, 0.2, 1)`;
                
                // Eliminar partícula después de la animación
                setTimeout(() => {
                    particle.remove();
                }, 3500);
            }, 100);
        }, i * 150); // Espaciamiento más amplio para suavidad
    }
}

function createStemParticles(stemX, stemY, heartX, heartY, stemColor, flowerIndex) {
    const particlesContainer = document.getElementById('flower-particles');
    const particleCount = 12; // Partículas de tallos
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.classList.add('flower-particle', 'stem-particle');
            
            // Tamaño y forma de partícula de tallo (más alargada)
            const width = 1.5 + Math.random() * 2;
            const height = width * (1.5 + Math.random() * 1);
            particle.style.width = `${width}vmin`;
            particle.style.height = `${height}vmin`;
            
            // Color del tallo
            particle.style.background = `radial-gradient(circle, ${stemColor}, #0c6b2a)`;
            
            // Posición inicial (desde la base del tallo)
            const stemSpread = 15;
            const startX = stemX + (Math.random() - 0.5) * stemSpread;
            const startY = stemY + (Math.random() - 0.5) * stemSpread;
            
            particle.style.left = `${startX}px`;
            particle.style.top = `${startY}px`;
            
            // Punto intermedio con trayectoria más directa
            const midX = startX + (heartX - startX) * 0.5 + (Math.random() - 0.5) * 80;
            const midY = startY + (heartY - startY) * 0.5 + (Math.random() - 0.5) * 80;
            
            // Variables CSS para la animación
            particle.style.setProperty('--startX', '0px');
            particle.style.setProperty('--startY', '0px');
            particle.style.setProperty('--midX', `${midX - startX}px`);
            particle.style.setProperty('--midY', `${midY - startY}px`);
            particle.style.setProperty('--targetX', `${heartX - startX}px`);
            particle.style.setProperty('--targetY', `${heartY - startY}px`);
            
            particlesContainer.appendChild(particle);
            
            // Iniciar animación del viaje del tallo
            setTimeout(() => {
                particle.style.animation = `stem-particle-journey 3s forwards cubic-bezier(0.4, 0, 0.2, 1)`;
                
                // Eliminar partícula después de la animación
                setTimeout(() => {
                    particle.remove();
                }, 3000);
            }, 100);
        }, i * 200); // Espaciamiento para tallos
    }
}

function showHeart(heartX, heartY) {
    const heartContainer = document.querySelector('.heart-container');
    const heart = document.querySelector('.heart');
    
    // Posicionar el corazón
    heartContainer.style.display = 'flex';
    
    // Animación de aparición del corazón
    setTimeout(() => {
        heart.classList.add('heart-visible');
        
        // Efecto de destello final suave
        createFinalFlash(heartX, heartY);
    }, 500);
}

function createFinalFlash(centerX, centerY) {
    const particlesContainer = document.getElementById('flower-particles');
    
    // Crear partículas de destello final suaves
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const flashParticle = document.createElement('div');
            flashParticle.classList.add('flower-particle', 'petal-particle');
            flashParticle.style.background = 'radial-gradient(circle, #ffffff, #ff6b8b)';
            
            // Tamaño y posición
            const size = 1.5 + Math.random() * 2.5;
            flashParticle.style.width = `${size}vmin`;
            flashParticle.style.height = `${size}vmin`;
            flashParticle.style.left = `${centerX}px`;
            flashParticle.style.top = `${centerY}px`;
            
            // Animación de explosión suave
            const angle = Math.random() * Math.PI * 2;
            const distance = 60 + Math.random() * 90;
            const targetX = Math.cos(angle) * distance;
            const targetY = Math.sin(angle) * distance;
            
            // Punto intermedio para curva suave
            const midX = targetX * 0.6;
            const midY = targetY * 0.6;
            
            flashParticle.style.setProperty('--startX', '0px');
            flashParticle.style.setProperty('--startY', '0px');
            flashParticle.style.setProperty('--midX', `${midX}px`);
            flashParticle.style.setProperty('--midY', `${midY}px`);
            flashParticle.style.setProperty('--targetX', `${targetX}px`);
            flashParticle.style.setProperty('--targetY', `${targetY}px`);
            
            particlesContainer.appendChild(flashParticle);
            
            // Animación suave
            setTimeout(() => {
                flashParticle.style.animation = `petal-particle-journey 2s forwards cubic-bezier(0.4, 0, 0.2, 1)`;
                
                // Eliminar después de animación
                setTimeout(() => {
                    flashParticle.remove();
                }, 2000);
            }, 50);
        }, i * 150);
    }
}