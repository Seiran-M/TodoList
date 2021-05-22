import React from 'react'
import {App} from './App'
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from '../stories/decorators/ReduxStoreProviderDecorator'
import {Meta} from '@storybook/react'


export default {
   title: 'Example/App',
   component: App,
   decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
} as Meta

export const AppBaseExample = () => {
   return <App demo={true}/>;
}