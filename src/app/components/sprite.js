export default function Sprite({
    url = '',
  }) {
    const spriteStyle = {
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${url})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      };      
  
    return <div style={spriteStyle} />;
  }
  