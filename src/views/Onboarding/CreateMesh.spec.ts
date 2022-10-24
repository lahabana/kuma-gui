import { flushPromises } from '@vue/test-utils'
import { render, screen } from '@testing-library/vue'
import { KButton, KTable } from '@kong/kongponents'

import CreateMesh from './CreateMesh.vue'
import { store, storeKey } from '@/store/store'
import { ClientConfigInterface } from '@/store/modules/config/config.types'
import * as config from '@/services/mock/responses/config.json'

function renderComponent(mode = 'standalone') {
  const clientConfig: ClientConfigInterface = { ...config, mode }
  store.state.config.clientConfig = clientConfig

  return render(CreateMesh, {
    global: {
      plugins: [[store, storeKey]],
      components: {
        KButton,
        KTable,
      },
      stubs: {
        routerLink: {
          props: ['to'],
          template: '<a>{{ to.name }}</a>',
        },
      },
    },
  })
}

describe('CreateMesh.vue', () => {
  it('renders snapshot', async () => {
    const { container } = renderComponent()

    await flushPromises()

    expect(container).toMatchSnapshot()
  })

  it('renders multizone next step', () => {
    renderComponent('global')

    expect(screen.getByText('onboarding-multi-zone')).toBeInTheDocument()
  })
})
