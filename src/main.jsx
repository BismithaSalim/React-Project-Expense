import React from 'react'
import ReactDOM from 'react-dom/client'

// scroll bar
import 'simplebar-react/dist/simplebar.min.css'

// redux
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistedStore } from './store'

// project import
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <App />
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
)