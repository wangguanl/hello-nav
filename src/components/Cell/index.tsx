import './index.css';
import gitHubIcon from '../../assets/images/github.png';
import { Button, Dropdown } from 'antd';

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

const single = ({ homepage, icon, repository, name, darkInvert }: AppItem) => (
  <a className="app" href={homepage as string} title={name} target="_blank">
    <div className="img-box">
      <img
        src={getImgSrc(icon)}
        className={darkInvert ? 'dark-invert' : ''}
        alt={name}
      />
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

const Cell = ({ homepage, icon, repository, name, darkInvert }: AppItem) => (
  <li className="cell">
    {Array.isArray(homepage) ? (
      homepage.length > 1 ? (
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
          <a className="app" href="#!" title={name}>
            <div className="img-box">
              <img
                src={getImgSrc(icon)}
                className={darkInvert ? 'dark-invert' : ''}
                alt={name}
              />
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
        </Dropdown>
      ) : (
        single({ homepage: homepage[0].href, icon, repository, name, darkInvert })
      )
    ) : (
      single({ homepage, icon, repository, name, darkInvert })
    )}
  </li>
);
export default Cell;
