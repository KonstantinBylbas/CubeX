import "./Button.scss";

export default function Button({ text, type, handlerClick }) {
  return (
    <button className={type} onClick={handlerClick}>
      {text}
    </button>
  );
}
