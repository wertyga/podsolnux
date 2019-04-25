import { Button, Grid, Input, Message, Form } from 'semantic-ui-react'

import './changable-input.sass'

export class ChangableInputWrapper extends React.Component {
  static propTypes = {
    values: PropTypes.array.isRequired,
    onConfirm: PropTypes.func,
    onDelete: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.collectInitialState();

    this.state = this.initialStateObj
  }

  collectInitialState = () => {
    this.initialStateObj = { isOpen: [], isChanged: false, loading: false, error: '' }
    this.props.values.forEach(({ name, value }) => {
      this.initialStateObj[name] = {
        isShow: false,
        value,
      };
    })
  }

  onChange = ({ target: { value } }, name) => {
    this.setState({
      [name]: {
        value,
        isShow: true,
      },
    })
  }

  getShow = (name) => {
    this.setState({
      [name]: {
        ...this.state[name],
        isShow: true,
      },
      isChanged: true
    })
  }

  cancelChanges = () => {
    this.setState(this.initialStateObj)
  }

  confirmChanges = async () => {
    const { onConfirm, values } = this.props;

    this.setState({ loading: true })
    const data = values.map(({ name, value }) => ({
      name,
      value: this.state[name].value,
    }))

    try {
      await onConfirm(data)
      this.collectInitialState()

      this.setState(this.initialStateObj)
    } catch (e) {
      this.setState({ loading: false, error: e.message })
    }
  }

  onDelete = async () => {
    this.setState({ loading: true })
    const { onDelete } = this.props;

    try {
      await onDelete()
      this.setState({ loading: false })
    } catch (e) {
      this.setState({ loading: false, error: e.message })
    }
  }

  render() {
    const { isChanged, loading, error } = this.state;
    const { values, onDelete } = this.props;
    return (
    <Form
      className="changable-input"
      loading={loading}
      error={!!error}
    >
      <Message
        error
        content={error}
      />
      <Grid
        className="changable-input__content"
        columns={2}
      >
        <Grid.Column className="changable-input__upper" width={10}>
          {values.map(({ name, value }) => (
            <div className="changable-input__upper-item" key={`${name}-${value}`}>
              {!this.state[name].isShow && <span onClick={() => this.getShow(name)}>{value}</span>}
              {this.state[name].isShow &&
                <Input
                  value={this.state[name].value}
                  onChange={(e) => this.onChange(e, name)}
                />
              }
            </div>
          ))}
        </Grid.Column>

        <Grid.Column
          className="changable-input__buttons"
          width={6}
        >
          <Button
            className={cn({ appear: isChanged })}
            size="small"
            circular
            color="green"
            icon={{
              name: 'check'
            }}
            onClick={this.confirmChanges}
            type="submit"
          />
          <Button
            className={cn({ appear: isChanged })}
            size="small"
            circular
            color="red"
            icon={{
              name: 'times'
            }}
            onClick={this.cancelChanges}
          />
          {onDelete && <Button content="delete" color="red" onClick={this.onDelete} className="delete-button"/>}
        </Grid.Column>
      </Grid>
    </Form>
    );
  }
}