import { Link } from 'react-router-dom'

export const FormFooter = ({ title, href }) => (
  <div className="auth-page__form-footer">
    <Link to={href}>{title}</Link>
  </div>
)