interface ButtonProps {
  text: string;
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: {
    class: string;
    style: React.CSSProperties;
  };
  element?: {
    content: React.ReactNode;
    position: "left" | "right";
  };
  type?: "button" | "submit" | "reset";
  href?: string;
  outlined?: boolean;
  anchorProps?: AnchorSpecificProps;
  ariaLabel?: string;
}

interface AnchorSpecificProps {
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
}

const Button = ({
  text,
  color = "bg-green",
  onClick,
  disabled = false,
  className = "",
  icon,
  element,
  type = "button",
  href,
  outlined = false,
  anchorProps,
  ariaLabel,
}: ButtonProps) => {
  const commonClassNames = `${className} w-fit flex items-center gap-[10px] ${element?.position === "right" ? "flex-row-reverse" : "flex-row"} disabled:cursor-not-allowed disabled:bg-grey disabled:text-dark-grey rounded-[8px] hover:bg-dark-green transition-all text-[14px] px-[12px] py-[8px] ${color} ${
    outlined
      ? "border-[1px] border-green bg-transparent text-green hover:text-dark-green hover:border-dark-green hover:bg-transparent"
      : "text-white"
  }`;

  const content = (
    <>
      {icon && <i className={icon.class} style={icon.style}></i>}
      {element?.content}
      {text}
    </>
  );

  return href ? (
    <a
      href={href}
      className={commonClassNames}
      {...anchorProps}
      aria-label={ariaLabel || text}
    >
      {content}
    </a>
  ) : (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={commonClassNames}
    >
      {content}
    </button>
  );
};

export default Button;
