import Index from "@/pages/index"
import { mount } from '@vue/test-utils'

describe(`button click`, () => {
  const wrapper = mount(Index)
  test(`ボタンをクリックしたらcounterは0になる`, async () => {
    await wrapper.find(`button`).trigger(`click`)
    console.log(wrapper.vm.counter);
    expect(wrapper.vm.counter).toBe(0)
  })
})