import { inject, observer } from 'mobx-react'

import { Message, List, Input, Button, Loader } from 'semantic-ui-react'

import { Banner } from './Banner'

@inject('bannersStore')
@observer
export class BannerItem extends React.Component {
  constructor(props) {
    super(props)

    const { match: { params: { slug } }, bannersStore: { getBannerCategory } } = props

    getBannerCategory(slug)

    this.state = {
      image: '',
      newName: '',
    }
  }

  onChange = ({ target: { files } }) => {
    this.onLoadImage(files[0])
  }

  onLoadImage = (file) => {
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = () => {
      this.setState({ image: fr.result })
      this.props.bannersStore.file = file
      this.props.bannersStore.error = undefined
    }
  }

  onSubmit = async (e) => {
    e.preventDefault()

    try {
      await this.props.bannersStore.addBannerImage()
      this.setState({ image: '' })
    } catch (e) {}
  }

  clearImage = (e) => {
    e.preventDefault()
    this.setState({ image: '' })
    this.props.bannersStore.file = ''
  }

  renameBannerCategory = async () => {
    const { newName } = this.state
    if (!newName) return;
    const { bannersStore: { renameCategory }, match: { params: { slug } } } = this.props

    await renameCategory(slug, newName)

    this.setState({ newName: '' })
  }

  changeInput = ({ target: { value, name } }) => this.setState({ [name]: value })

  deleteBanner = item => () => {
    const { bannersStore: { deleteBanner }, match: { params: { slug } } } = this.props

    deleteBanner(slug, item)
  }

  changeBanner = (banner, data) => () => {
    const { bannersStore: { changeBanner }, match: { params: { slug } } } = this.props
    changeBanner(slug, banner, data)
  }

  render() {
    const { image, newName } = this.state
    const { bannersStore: {
      error,
      currentCategory: { banners = [] },
      pendingState,
    },
      match: { params: { slug } },
    } = this.props
    return (
      <div className="banner-item">
        {error && <Message error content={error.message} />}
        {pendingState === 'pending' && <Loader active/>}
        <div className="banner-item__header">
          <h1>{slug}</h1>
          <Button color="blue" onClick={this.renameBannerCategory}>Rename</Button>

          <Input value={newName} name="newName" onChange={this.changeInput} />
        </div>

        <div className="banner-item__add">
          <form onSubmit={this.onSubmit}>
            <Input
              label="Type category name"
              placeholder="Category name..."
              onChange={this.onChange}
              type="file"
            />
            <Button type="submit" color="green">Add banner</Button>
            <Button color="red" type="cancel" onClick={this.clearImage}>Clear</Button>
          </form>
        </div>

        <div className="banner-item__adding">
          {!!image && <img src={image} alt="none" />}
        </div>

        <List className="banner-item__content">
          {banners.map(item => <Banner key={item.path} deleteBanner={this.deleteBanner} changeBanner={this.changeBanner} {...item} />)}
        </List>
      </div>
    );
  }
}