import { Form, Button } from 'semantic-ui-react'

export class AddBannerItem extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();


  }

  render() {
    const { img = '', altImage = '', title, subtitle } = this.props
    return (
      <div className="add-banner__item">
        <Form
          onSubmit={this.onSubmit}
        >
          <img src={img} alt={altImage} />
          <Form.Input label="Alt image title:" value={altImage}/>
          <Form.Input label="Title:" value={title}/>
          <Form.Input label="Subtitle:" value={subtitle}/>

          <Button type="submit">Save</Button>
        </Form>
      </div>
    );
  }
}