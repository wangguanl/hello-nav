import './index.css';
import gitHubIcon from '../../assets/images/github.png';
import { Button, Dropdown } from 'antd';
import { useState } from 'react';

function onCornerClick(e: React.SyntheticEvent, repository: string) {
  e.preventDefault();
  window.open(repository);
  return false;
}

function getImgSrc(fileName: string): string {
  return /^(http|https)/.test(fileName)
    ? fileName
    : new URL(`../../assets/icons/${fileName}`, import.meta.url).href;
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const TextColorBox = (name: string) => (
  <div
    style={{
      backgroundColor: getRandomColor(),
      color: getRandomColor(),
    }}
  >
    {name}
  </div>
);

const single = ({ homepage, icon, repository, name, darkInvert }: AppItem) => {
  const [ErrImg, setErrImg] = useState(true);
  console.log(ErrImg);

  return (
    <a className="app" href={homepage as string} title={name} target="_blank">
      <div className="img-box">
        {icon ? (
          ErrImg ? (
            <img
              src={getImgSrc(icon)}
              className={darkInvert ? 'dark-invert' : ''}
              alt={name}
              onError={() => {
                setErrImg(false);
              }}
            />
          ) : (
            TextColorBox(name)
          )
        ) : (
          TextColorBox(name)
        )}
      </div>
      <p className="title">{name}</p>
      {repository && (
        <div
          onKeyDown={() => {}}
          onClick={e => onCornerClick(e, repository)}
          className="corner"
        >
          <div className="corner-icon-wrap">
            <img
              className="corner-icon"
              draggable={false}
              src={gitHubIcon}
              alt=""
            />
          </div>
        </div>
      )}
    </a>
  );
};

const Cell = ({ homepage, icon, repository, name, darkInvert }: AppItem) => (
  <li className="cell">
    {Array.isArray(homepage) && homepage.length > 1 ? (
      <Dropdown
        menu={{
          items: homepage.map(({ href, title }) => ({
            key: href,
            label: (
              <a className="app" href={href} target="_blank">
                {title}
              </a>
            ),
          })),
        }}
        placement="bottomLeft"
        arrow
      >
        {single({
          homepage: homepage[0].href,
          icon,
          repository,
          name,
          darkInvert,
        })}
      </Dropdown>
    ) : (
      single({ homepage, icon, repository, name, darkInvert })
    )}
  </li>
);
export default Cell;
