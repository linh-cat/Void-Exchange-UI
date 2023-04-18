import React from "react";
import "./Footer.css";
import logoImg from "../../img/ic_gmx_footer.svg";
import { NavLink } from "react-router-dom";
import { getFooterLinks, SOCIAL_LINKS } from "./constants";
import { i18n } from "@lingui/core";
import ExternalLink from "../ExternalLink/ExternalLink";

export default function Footer({ showRedirectModal, redirectPopupTimestamp }) {
  return (
    <div className="Footer">
      <div className="Footer-wrapper border-t border-gray-700">
        <div className="Footer-logo">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center font-semibold whitespace-nowrap dark:text-white">
            ZK Perp
          </span>
        </div>
        <div className="Footer-social-link-block">
          {SOCIAL_LINKS.map((platform) => {
            return (
              <ExternalLink
                key={platform.name}
                className="App-social-link"
                href={platform.link}
              >
                <img src={platform.icon} alt={platform.name} />
              </ExternalLink>
            );
          })}
        </div>
        <div className="Footer-links">
          {getFooterLinks(true).map(({ external, text, link, isAppLink }) => {
            if (external) {
              return (
                <ExternalLink
                  key={i18n._(text)}
                  href={link}
                  className="Footer-link"
                >
                  {i18n._(text)}
                </ExternalLink>
              );
            }

            return (
              <NavLink
                key={link}
                to={link}
                className="Footer-link"
                activeClassName="active"
              >
                {i18n._(text)}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
