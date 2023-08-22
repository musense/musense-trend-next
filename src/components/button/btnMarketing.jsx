import Link from "next/link";
import React from "react";

export default function BtnMarketing({
  name,
  to,
  title,
  className = '',
  type = "link",
  callback = null,
  active = false,
  cancelHoverState = false,
}) {

  const linkProps = {
    title: title,
    className: `btn-marketing ${className}`,
    href: to,
    onClick: callback
  }

  const buttonProps = {
    title: title,
    className: cancelHoverState
      ? `btn-marketing ${className} `
      : `btn-marketing ${className} ${active ? "active" : ""}`,
    onClick: callback,
  }

  const linkComponent = <Link {...linkProps}>{name}</Link>;
  const buttonComponent = <button {...buttonProps}>{title}</button>
  const titleComponent = <div {...buttonProps} style={{ cursor: 'default' }}>{title}</div>;

  switch (type) {
    case "link":
      return linkComponent;
    case "title":
      return titleComponent;
    case "button":
      return buttonComponent;
    default:
      return linkComponent;
  }
}
