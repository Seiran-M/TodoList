import React from 'react'
import {AppWithRedux} from './AppWithRedux'
import {Story} from '@storybook/react'
import {ReduxStoreProviderDecorator} from './stories/decorators/ReduxStoreProviderDecorator'


export default {
   title: 'Example/AppWithRedux',
   component: AppWithRedux,
   decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample: Story = () => {
   return (
      <AppWithRedux/>
   )
}