import { css } from '@emotion/css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className={headerContainer}>
      <h1 className={headerStyle}>Content Manager</h1>
      <Link to="/" className={linkStyle}>모든 컨텐츠</Link> | <Link to="/mycontents" className={linkStyle}>내 컨텐츠</Link>
    </div>
  )
}

const headerContainer = css`
  padding-top: 20px;
`

const headerStyle = css`
  font-size: 40px;
  margin: 30px 0px;
`

const linkStyle = css`
  font-size: 20px;
  color: #555;
  font-weight: bold;
  text-decoration: none;
  margin: 20px 10px;
  :hover {
    color: #058aff;
  }
`
