import { useState } from 'react'
import { List, Button, Input } from 'semantic-ui-react'

const inputModifiers = [
  {
    name: 'href',
  },
]

export const Banner = ({ deleteBanner, changeBanner, path, ...props }) => {
  const state = inputModifiers.reduce((a, { name }) => {
    const [value, setInput] = useState(props[name] || '')

    return {
      ...a,
      [name]: {
        value,
        setState({ target: { value } }) { setInput(value) },
      },
    }
  }, {})

  return (
    <List.Item className="banner">
      <div className="modify">
        {inputModifiers.map(({ name }) => (
          <Input
            key={name}
            value={state[name].value}
            onChange={state[name].setState}
            label={name.toUpperCase()}
            placeholder={`${name}...`}
          />
        ))}
        <div className="banner__buttons">
          <Button color="blue" onClick={changeBanner(path, Object.entries(state).reduce((a, [key, { value }]) => ({ ...a, [key]: value }), {}))}>Change image</Button>
          <Button color="red" onClick={deleteBanner(path)}>Delete image</Button>
        </div>
      </div>

      <img src={path} alt="bb" />
    </List.Item>
  );
}