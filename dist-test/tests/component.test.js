import { Component } from '../src/nucleo/component/Component.js';
class TestComponent extends Component {
    count = 0;
    render() {
        const element = document.createElement('div');
        element.textContent = `Count: ${this.count}`;
        return element;
    }
    increment() {
        this.count++;
        this.update();
    }
}
const component = new TestComponent();
component.mount(document.body);
console.log('Mount:', document.body.textContent);
component.increment();
console.log('Update:', document.body.textContent);
component.unmount();
console.log('Unmount:', document.body.textContent);
