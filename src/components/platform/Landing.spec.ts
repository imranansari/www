import { mount } from '@vue/test-utils';
import Landing from './Landing.vue';

describe('components/platform/Landing', () => {
  it('render platform message', () => {
    const msg = 'The global cloud platform for developers & teams';
    const wrapper = mount(Landing);
    expect(wrapper.text()).toContain(msg);
  });
});
