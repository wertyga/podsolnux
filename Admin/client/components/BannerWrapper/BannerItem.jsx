import { inject, observer } from 'mobx-react'

import { Message, List, Input, Button, Loader } from 'semantic-ui-react'

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
    }
  }

  onSubmit = async (e) => {
    e.preventDefault()

    try {
      await this.props.bannersStore.addBannerImage()
      this.setState({ image: '' })
    } catch (e) {}
  }

  clearImage = () => {
    this.setState({ image: '' })
  }

  renameBannerCategory = () => {
    const { newName } = this.state
    if (!newName) return;
    const { bannersStore: { renameCategory }, match: { params: { slug } } } = this.props

    renameCategory(slug, newName)
  }

  changeName = ({ target: { value } }) => this.setState({ newName: value })

  deleteBanner = item => () => {
    const { bannersStore: { deleteBanner }, match: { params: { slug } } } = this.props

    deleteBanner(slug, item)
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
          <h1>{slug.toUpperCase()}</h1>
          <Button color="blue" onClick={this.renameBannerCategory}>Rename</Button>

          <Input value={newName} onChange={this.changeName} />
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
            <Button color="red" onClick={this.clearImage}>Clear</Button>
          </form>
        </div>

        <div className="banner-item__adding">
          {!!image && <img src={image} alt="none" />}
        </div>

        <List className="banner-item__content">
          {banners.map((item) =>
            <List.Item key={item}>
              <img src={item} alt="bb" />
              <Button color="red" onClick={this.deleteBanner(item)}>Delete image</Button>
            </List.Item>
          )}
        </List>
      </div>
    );
  }
}