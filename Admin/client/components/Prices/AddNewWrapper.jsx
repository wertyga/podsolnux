import { Form, Button, Select, Message } from 'semantic-ui-react'

const TEXT = {
  emptyError: ' Заполните все поля',
  addNewOne: 'Add new one...',
  addNewLabel: 'Add new',
}

export class AddNewWrapper extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    categories: PropTypes.array,
    addNewPendingState: PropTypes.string,
    addNewPrice: PropTypes.func,
    isOneCategory: PropTypes.bool,
    category: PropTypes.string,
    fields: PropTypes.array,
  }
  static defaultProps = {
    categories: [],
  }

  constructor(props) {
    super(props)

    const { categories, fields } = props;
    this.fields = fields || ['name', 'value']

    this.initialState = {
      ...this.fields.reduce((a, b) => ({
        ...a,
        [b]: '',
      }), {}),
      category: categories,
      isAddNew: false,
      error: '',
    }

    this.state = this.initialState
  }

  checkEmptyFields = () => {
    // const values = ['value', 'name', 'category']
    return this.fields.find(item => !this.state[item])
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value, error: '' })
  }

  onSubmit = async () => {
    const error = this.checkEmptyFields();
    if (error) {
      this.setState({ error: TEXT.emptyError })
      return;
    }

    try {
      await this.props.addNewPrice({
        ...this.state,
        value: this.state.value,
      });
      this.setState(this.initialState);
    } catch (e) {
      this.setState({ error: e.message })
    }
  }

  selectChange = ({ target: { innerText } }) => {
    this.setState({ category: innerText, isAddNew: innerText === TEXT.addNewOne })
  }

  render() {
    const { error, isAddNew } = this.state
    const { categories, addNewPendingState, isOneCategory } = this.props;
    const options = [
      ...categories.map(item => ({ value: item, text: item, key: item })),
      { value: 'new', text: TEXT.addNewOne, key: 'new' },
    ]
    return (
      <Form
        onSubmit={this.onSubmit}
        className="inputs-wrapper"
        error={!!error}
        loading={addNewPendingState === 'pending'}
      >
        <div className="inputs-wrapper__content">
            {!isOneCategory &&
              <div className="inputs-wrapper__content__select">
                <Select
                  placeholder="Categories..."
                  options={options}
                  onChange={this.selectChange}
                />
                {isAddNew &&
                  <Form.Input
                    value={this.state.category}
                    name="category"
                    onChange={this.onChange}
                    className="new-one"
                  />
                }
              </div>
            }
          {this.fields.map(item => (
            <Form.Input
              key={item}
              label={`${item.charAt(0).toUpperCase()}${item.slice(1)}`}
              value={this.state[item]}
              name={item}
              onChange={this.onChange}
            />
          ))}

          <Button
            type="submit"
            circular
            color="green"
            icon={{
              name: 'plus',
            }}
          />
        </div>

        <Message
          error
          content={error.message || error}
        />
      </Form>
    );
  }
}