import Link from "next/link";
import React from "react";

export default function BtnMarketing({
  name,
  to,
  title,
  type = "link",
  callback = null,
  disabled = null,
  active = null,
}) {


  const linkComponent = <Link title={title} className={`btn-marketing ${name}`} href={to}>{name}</Link>;
  const buttonComponent = (
    <button
      active={active}
      disabled={disabled}
      title={title}
      className={`btn-marketing ${name} ${active? "active" : ""}`}
      onClick={callback}
    >{title}</button>)
  switch (type) {
    case "link":
      return linkComponent;
    case "button":
      return buttonComponent;
    default:
      return linkComponent;
  }
}
