import Link from "next/link";
import React from "react";

export default function BtnMarketing({
  name,
  to,
  title,
  type = "link",
  callback = null,
  disabled = null,
  active = false,
  target = "_self",
  cancelHoverState = false,
  close = false
}) {

  const linkProps = React.useMemo(() => ({
    target: target,
    title: title,
    className: `btn-marketing ${name}`,
    href: to,
    onClick: close
      ? () => { window.top.close(); }
      : callback
        ? callback
        : null,

  }), [target, title, name, to, callback, close])
  const buttonProps = React.useMemo(() => ({
    disabled: disabled || false,
    title: title,
    className: cancelHoverState
      ? `btn-marketing ${name} `
      : `btn-marketing ${name} ${active ? "active" : ""}`,
    onClick: callback,
  }), [disabled, title, cancelHoverState, name, active, callback])
  // console.log("🚀 ~ file: btnMarketing.jsx:31 ~ buttonProps ~ buttonProps:", buttonProps)

  const linkComponent = <Link {...linkProps}> {name}</Link>;
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
