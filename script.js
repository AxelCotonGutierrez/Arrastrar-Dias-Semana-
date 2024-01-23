// Axel Cotón Gutiérrez Copyright 2024
document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable-word');
    const slots = document.querySelectorAll('.word-slot');
    const resultDisplay = document.getElementById('result');
    const checkButton = document.getElementById('check-button');
    const resetButton = document.getElementById('reset-button');
    const wordsArea = document.getElementById('words-area');
    let selectedElement = null;


    function resetElementStyle(element) {
        element.style.position = '';
        element.style.left = '';
        element.style.top = '';
    }

    // Funciones para manejar eventos de arrastre con mouse
    function handleDragStart() {
        selectedElement = this;
        this.classList.add('dragging');
    }

    function handleDragEnd() {
        if (selectedElement) {
            let isElementInSlot = false;
            slots.forEach(slot => {
                if (isElementOverSlot(selectedElement, slot)) {
                    slot.appendChild(selectedElement);
                    resetElementStyle(selectedElement);
                    isElementInSlot = true;
                }
            });

            if (!isElementInSlot) {
                wordsArea.appendChild(selectedElement);
            }

            this.classList.remove('dragging');
            selectedElement = null;
        }
    }

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', handleDragStart);
        draggable.addEventListener('dragend', handleDragEnd);
    });

    // Funciones para manejar eventos táctiles
    function handleTouchStart(e) {
        selectedElement = this;
        this.classList.add('dragging');
        e.preventDefault(); // Evita el desplazamiento en dispositivos táctiles
    }

    function handleTouchMove(e) {
        if (selectedElement) {
            e.preventDefault(); // Solo previene el desplazamiento predeterminado cuando se arrastra un elemento
            const touch = e.targetTouches[0];
            selectedElement.style.position = 'absolute';
            selectedElement.style.left = `${touch.pageX - selectedElement.offsetWidth / 2}px`;
            selectedElement.style.top = `${touch.pageY - selectedElement.offsetHeight / 2}px`;
        }
    }
    

    function isElementOverSlot(element, slot) {
        const elementRect = element.getBoundingClientRect();
        const slotRect = slot.getBoundingClientRect();

        return (
            elementRect.left < slotRect.right &&
            elementRect.right > slotRect.left &&
            elementRect.top < slotRect.bottom &&
            elementRect.bottom > slotRect.top
        );
    }


    function handleTouchEnd() {
        if (selectedElement) {
            let isElementInSlot = false;
            slots.forEach(slot => {
                if (isElementOverSlot(selectedElement, slot)) {
                    slot.appendChild(selectedElement);
                    resetElementStyle(selectedElement);
                    isElementInSlot = true;
                }
            });

            if (!isElementInSlot) {
                wordsArea.appendChild(selectedElement);
            }

            selectedElement.classList.remove('dragging');
            selectedElement = null;
        }
    }

    draggables.forEach(draggable => {
        draggable.addEventListener('touchstart', handleTouchStart);
        draggable.addEventListener('touchend', handleTouchEnd);
    });

    // Agregar eventos táctiles en el área del juego
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Permitir que los slots reciban elementos arrastrables
    slots.forEach(slot => {
        slot.addEventListener('dragover', e => {
            e.preventDefault();
        });

        slot.addEventListener('drop', e => {
            e.preventDefault();
            if (selectedElement) {
                slot.appendChild(selectedElement);
            }
        });
    });

    document.addEventListener('touchmove', handleTouchMove);

  // Comprobar respuestas
  checkButton.addEventListener('click', () => {
    let correctCount = 0;

    // Verificar cada slot
    if (document.getElementById('lunes-slot').querySelector('[alt="Lunes"]')) {
        correctCount++;
    }
    if (document.getElementById('martes-slot').querySelector('[alt="Martes"]')) {
        correctCount++;
    }
    if (document.getElementById('miercoles-slot').querySelector('[alt="Miércoles"]')) {
        correctCount++;
    }
    if (document.getElementById('jueves-slot').querySelector('[alt="Jueves"]')) {
        correctCount++;
    }
    if (document.getElementById('viernes-slot').querySelector('[alt="Viernes"]')) {
        correctCount++;
    }
    if (document.getElementById('sabado-slot').querySelector('[alt="Sábado"]')) {
        correctCount++;
    }
    if (document.getElementById('domingo-slot').querySelector('[alt="Domingo"]')) {
        correctCount++;
    }
   

    // Actualizar el mensaje de resultado
    if (correctCount === draggables.length) {
        resultDisplay.textContent = '¡Correcto! Los días de la semana están en orden.';
        resultDisplay.style.color = 'green';
    } else {
        resultDisplay.textContent = 'Algunos días no están en el orden correcto. Intenta de nuevo.';
        resultDisplay.style.color = 'red';
    }
});


    // Reiniciar el juego
    resetButton.addEventListener('click', () => {
        // Mover las imágenes arrastrables de vuelta a su área original
        draggables.forEach(draggable => {
            wordsArea.appendChild(draggable);
        });

        // Limpiar el mensaje de resultado
        resultDisplay.textContent = '';

        // Reiniciar los slots
        slots.forEach(slot => {
            if (slot.firstChild) {
                wordsArea.appendChild(slot.firstChild);
            }
        });
    });
});

// Navegaciòn"  
 
document.addEventListener('DOMContentLoaded', function() {
    var menuToggle = document.querySelector('.menu-toggle');
    var menu = document.querySelector('.menu');
        
    menuToggle.addEventListener('click', function() {
    menu.classList.toggle('active');
    });
  });