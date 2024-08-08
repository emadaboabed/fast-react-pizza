import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  let base =
    "bg-yellow-400 text-sm uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ";

  let styles = {
    primary: base + " py-3 px-4 md:px-6 md:py-4 ",
    small: base + " py-2 px-4 md:px-5 md:py-2.5 text-xs ",
    round: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-sm ",
    secondary:
      " uppercase text-sm font-semibold text-stone-400 inline-block tracking-wide rounded-full hover:bg-stone-300 border-2 border-stone-300 transition-colors duration-300 focus:outline-none focus:ring focus:by-stone-300 hover:text-stone-800 focus:text-stone-800 focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed  py-2.5 px-4 md:px-6 md:py-3.5 ",
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
