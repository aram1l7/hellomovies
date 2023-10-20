import React from "react";

function Button(props) {
  const { text, className, Icon, ...rest } = props;
  return (
    <button
      className={`${className} flex px-6 text-sm border disabled:hover:cursor-not-allowed py-2 text-slate-200 disabled:opacity-50 border-transparent
       hover:border-sky-200 hover:text-primary outline-none
        rounded-xl bg-slate-900 duration-200 ease-in
         transition-colors`}
      {...rest}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {text}
    </button>
  );
}

export default Button;
