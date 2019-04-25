import { withRouter } from 'react-router-dom'

import { noop } from 'lodash'

import { MainMenu } from 'shared/modules/MainMenu'
import { Footer } from 'shared/modules/Footer'
import { Page } from 'shared/modules/common'

import './app.sass'

const helmet = {
  title: 'Фотостудия "Подсолнух" - печать фотографий, услуги печати',
  content: "Широкий спектр печатных услуг, печать фотографий, распечатка текстов, и другой дряни",
}

@withRouter
export class App extends React.Component {
  componentDidMount() {
    this.scrollWindowToTop();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.scrollWindowToTop();
    }
  }

  scrollWindowToTop = () => {
    noop();
  }

  render() {
    const { title, content } = helmet
    const { children } = this.props;
    return (
      <Page className="app" title={title} description={content}>
        <nav> <MainMenu /> </nav>

        <main>{children}</main>

        <Footer/>
      </Page>
    )
  }
}