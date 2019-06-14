import React from "react";
import { ensureHttpUrl } from "../../../helpers/common/urlFixerInHref";

const images = {
  github: "/assets/Footer/github.png",
  telegram: "/assets/Footer/telegram.png",
  medium: "/assets/Footer/medium.png",
  reddit: "/assets/Footer/reddit.png",
  twitter: "/assets/Footer/twitter.png"
};

const targetElement = (url, image, text) => (
  <td>
    <a target="_blank" href={ensureHttpUrl(url)} rel="noopener noreferrer">
      <img id={text} className="push--left" src={image} width="20" height="20" alt={text} />
    </a>
  </td>
);

const SocialLinks = props => {
  const { urls } = props || {};
  return (
    <table>
      <tbody>
        <tr>
          {targetElement(urls.github, images.github, "github")}
          {targetElement(urls.telegram, images.telegram, "telegram")}
          {targetElement(urls.medium, images.medium, "medium")}
          {targetElement(urls.reddit, images.reddit, "reddit")}
          {targetElement(urls.twitter, images.twitter, "twitter")}
        </tr>
      </tbody>
    </table>
  );
};

export default SocialLinks;
