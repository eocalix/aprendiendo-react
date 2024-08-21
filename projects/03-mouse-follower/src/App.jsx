import { useEffect, useState } from "react"

const FollowMouse = () => {

  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Pointer move
  useEffect(() => {
    console.log('Effect ', {enabled});

    const handleMove = (event) => {
      const { clientX, clientY } = event;
      console.log(clientX, clientY);
      setPosition({ x: clientX, y: clientY });
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove); 
    }

    // Cleanup method
    // Cuando el componente se desmonta
    // Cuando cambian las dependencias, antes de ejecutar
    // el efecto de nuevo
    return () => {
      console.log('Cleanup');
      window.removeEventListener('pointermove', handleMove);
    }

  }, [enabled]);

// [] => Se ejecuta una vez cuando se monta el componente
// [enable,...] => Se ejecuta cuando cambia enabled y cuando se monta el componente
// undefined => Se ejecuta cada vez que se renderiza el componente

  // Change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled);

    return () => {
      document.body.classList.remove('no-cursor');
    }
  }, [enabled]);

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40, 
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      >
      </div>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Deactivate' : 'Activate'} follow cursor
      </button>
    </>
  )
}

function App() {
  const [mounted, setMounted] = useState(true);
  return (
    <main>
      { mounted && <FollowMouse /> }
      <br></br>
      <button onClick={() => setMounted(!mounted)}>
        Toggle mounted FollowMouse component
      </button>
    </main>
  )
}

export default App
