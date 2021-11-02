import { mount } from '@vue/test-utils'
import App from '../App'
import TestComponent from '../components/TestComponent'


describe('Tests ', () => {

  it('Test input cost', () => {

    const wrapper = mount(App)

    const dateInput = wrapper.find('input[name=date]')
    const amountInput = wrapper.find('input[name=amount]')
    const categoryInput = wrapper.find('input[name=category]')

    dateInput.setValue('02.11.2021')
    amountInput.setValue(100)
    categoryInput.setValue('Sport')

    expect(wrapper.vm.dateInput).toBe('02.11.2021')
    expect(wrapper.vm.amountInput).toBe(100)
    expect(wrapper.vm.category).toBe('Sport')

  })


  it('Content of TestComponent', () => {

    const wrapper = mount(TestComponent, {
      propsData: {
        message: 'Hello from test!'
      }
    })

    expect(wrapper.text()).toEqual(
      'The message is: Hello from test!'
    )

  })

})
