export default function InteractiveButton({ onClick, src, styleWidthHeight = 'w-40 h-12' }) {
  return (
    <button
      onClick={onClick}
      className={`${styleWidthHeight} bg-no-repeat bg-center bg-cover transition transform hover:scale-110 hover:brightness-125`}
      style={{
        backgroundImage: `url(${src})`,
        cursor: 'pointer',
      }}
    ></button>
  );
}