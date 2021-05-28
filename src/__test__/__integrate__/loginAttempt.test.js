import App from "../../App";
import  { shallow } from "enzyme";
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

describe("<App />", () => {
  it("should be defined", () => {
    expect(App).toBeDefined();
  });

  it("click event test", () => {
    const mockCallBack = jest.fn();

    const button1 = shallow((<button onClick={mockCallBack}>Ok!</button>));
    button1.find('button').simulate('click');
    button1.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(2);
  });
});
