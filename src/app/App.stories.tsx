import React from 'react'
import {App} from './App'
import {Story} from '@storybook/react'
import {ReduxStoreProviderDecorator} from '../stories/decorators/ReduxStoreProviderDecorator'


export default {
   title: 'Example/App',
   component: App,
   decorators: [ReduxStoreProviderDecorator]
}

export const AppWBaseExample: Story = () => {
   return (
      <App/>
   )
}