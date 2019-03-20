import React from 'react'

import { Form, Field } from 'react-final-form'
import styled from 'styled-components'
import { Switch, Button } from '@material-ui/core'
import TextField from 'client/components/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import SelectCategory from 'client/components/SelectCategory'
import SelectTypes from 'client/components/SelectTypes'

const Formular = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  margin: 0 2rem;
`

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const SwitchAdapter = ({ input: { onChange, value }, ...rest }) => (
  <Switch
    checked={!!value}
    onChange={(event, isInputChecked) => onChange(isInputChecked)}
    {...rest}
  />
)

const MenuForm = ({ types, categories, onSubmit, initialValues, refetch }) => (
  <Form
    initialValues={initialValues}
    onSubmit={async (values, { reset }) => {
      await onSubmit(values)
      reset()
    }}
  >
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Formular>
          <TextField name="englishName" label="🇬🇧 Name" />
          <TextField name="laoName" label="🇱🇦 Name" />
          <TextField name="price" label="＄" parse={value => Number(value)} />
          <TextField name="englishDetail" label="🇬🇧 Detail" />
          <TextField name="laoDetail" label="🇱🇦 Detail" />
          <TextField name="cloudinaryId" label="Cloudinary Image Name" />
          <SelectTypes
            name="typeIds"
            label="Meat type"
            data={types}
            refetch={refetch}
          />
          <SelectCategory
            name="categoryId"
            label="Category"
            data={categories}
            refetch={refetch}
          />
          <Div>
            <FormControlLabel
              style={{
                marginLeft: 0,
              }}
              control={
                <Field name="new" component={SwitchAdapter} label="new" />
              }
              label="New"
              labelPlacement="start"
            />
            <FormControlLabel
              control={
                <Field name="promo" component={SwitchAdapter} label="promo" />
              }
              label="Promo"
              labelPlacement="start"
            />
          </Div>
          <Button type="submit" color="primary">
            Add
          </Button>
        </Formular>
      </form>
    )}
  </Form>
)

export default MenuForm
