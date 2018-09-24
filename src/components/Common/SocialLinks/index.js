import React from 'react';

const images = [
  {
    link: 'http://google.com',
    image: 'https://www.sundowners.org.uk/wp-content/uploads/Logos/fb.png'
  },
  {
    link: 'http://google.com',
    image: 'https://www.sundowners.org.uk/wp-content/uploads/Logos/fb.png'
  },
  {
    link: 'http://google.com',
    image: 'https://www.sundowners.org.uk/wp-content/uploads/Logos/fb.png'
  },
  {
    link: 'http://google.com',
    image: 'https://www.sundowners.org.uk/wp-content/uploads/Logos/fb.png'
  },

];

const SocialLinks = () => {
  return (
    images.map(d =>
      <div>
        <tbody>
        <tr>
          <td>
            <a target="_blank" href={d.link}>
              <img src={d.image} width="20" height="20"/>
            </a>
          </td>
        </tr>
        </tbody>
      </div>
    )
  )
};

export default SocialLinks;