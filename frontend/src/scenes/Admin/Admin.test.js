import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Admin from './Admin'
import RequestStage from './components/requeststage/RequestStage'
import Adapter from 'enzyme-adapter-react-16'

let mock = new MockAdapter(axios)

Enzyme.configure({ adapter: new Adapter() })

describe('Admin component', () => {
  test('renders', () => {
    const wrapper = shallow(<Admin />)
    expect(wrapper.exists()).toBe(true)
  })
  test("renders booking requests tables with title", () => {
    const wrapper = mount(<RequestStage />)
    const now = new Date(Date.now())
    wrapper.setProps({
      title: 'Hello World' ,
      stage: 'bookingRequests'
    })
    mock.onGet('http://localhost:4200/bookingrequest/').reply(200, {
      data: [{
        adult: 1,
        child: 0,
        from: "2018-11-13T17:00:00.000Z",
        infant: 0,
        name: "Bradley M Wertman",
        room: 1,
        stage: "newRequest",
        to: "2018-11-19T17:00:00.000Z",
        _id: "5be07ee8a403ee8baba411d3"
      },{
        adult: 1,
        child: 0,
        from: "2018-11-13T17:00:00.000Z",
        infant: 0,
        name: "Bradley M Wertman",
        room: 1,
        stage: "newRequest",
        to: "2018-11-20T17:00:00.000Z",
        _id: "5be07f9fa403ee8baba411d4"
      // data:[{
      //   _id: 12345678,
      //   name: 'John Doe',
      //   from: now,
      //   to: new Date(Date.now() + 12096e5), //+2weeks
      //   room: 1,
      //   adult: 2,
      //   child: 2,
      //   infant: 1,
      //   stage: 'newRequest'
      // },{
      //   _id: 91011121,
      //   name: 'Jane Doe',
      //   from: now,
      //   to: new Date(Date.now() + 12096e5), //+2weeks
      //   room: 1,
      //   adult: 2,
      //   child: 2,
      //   infant: 1,
      //   stage: 'accepted'
      }]})
    expect(wrapper.find('h2').html().toEqual('<h2>Hello World</h2>'))
    expect(wrapper.find('tr').children().forEach((node) => {
      node.childAt(1).html().toEqual(`<td>${now}</td>`)
    }))
    mock.restore()
  })
})
