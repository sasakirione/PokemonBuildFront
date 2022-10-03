import StatusForm from "../../components/atomic/StatusForm";
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

const defaultValues = {
    h: 0,
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    s: 0
}
const setHp = (hp: number) => {
}
const setAttack = (a: number) => {
}
const setDefense = (b: number) => {
}
const setSpAttack = (c: number) => {
}
const setSpDefense = (d: number) => {
}
const setSpeed = (s: number) => {
}
let sum = 0

const pokemon = null

describe("StatusFormの努力値部分のテスト", () => {
    const statusType = "EV"
    test("S調整タブが表示がされる", () => {
        const isTab = true
        const wrapper = shallow(<StatusForm defaultValues={defaultValues} setHp={setHp} setAttack={setAttack}
                                            setDefense={setDefense} setSpAttack={setSpAttack}
                                            setSpDefense={setSpDefense}
                                            setSpeed={setSpeed} sum={sum} statusType={statusType} isTab={isTab}
                                            pokemon={pokemon}/>)
        // @ts-ignore
        expect(wrapper.find('[data-test-id="status-form-speed-tab"]').exists()).toBeTruthy()
    });

    test("S調整タブが表示がされない", () => {
        const isTab = false
        const wrapper = shallow(<StatusForm defaultValues={defaultValues} setHp={setHp} setAttack={setAttack}
                                            setDefense={setDefense} setSpAttack={setSpAttack}
                                            setSpDefense={setSpDefense}
                                            setSpeed={setSpeed} sum={sum} statusType={statusType} isTab={isTab}
                                            pokemon={pokemon}/>)
        // @ts-ignore
        expect(wrapper.find('[data-test-id="status-form-speed-tab"]').exists()).toBeFalsy()
    });

    test("努力値オーバー警告が表示される", () => {
        sum = 509
        const isTab = false
        const wrapper = shallow(<StatusForm defaultValues={defaultValues} setHp={setHp} setAttack={setAttack}
                                            setDefense={setDefense} setSpAttack={setSpAttack}
                                            setSpDefense={setSpDefense}
                                            setSpeed={setSpeed} sum={sum} statusType={statusType} isTab={isTab}
                                            pokemon={pokemon}/>)
        // @ts-ignore
        expect(wrapper.find('[data-test-id="status-form-sum-over"]').exists()).toBeTruthy()
    });

    test("努力値オーバー警告が表示されない", () => {
        sum = 508
        const isTab = false
        const wrapper = shallow(<StatusForm defaultValues={defaultValues} setHp={setHp} setAttack={setAttack}
                                            setDefense={setDefense} setSpAttack={setSpAttack}
                                            setSpDefense={setSpDefense}
                                            setSpeed={setSpeed} sum={sum} statusType={statusType} isTab={isTab}
                                            pokemon={pokemon}/>)
        // @ts-ignore
        expect(wrapper.find('[data-test-id="status-form-sum-over"]').exists()).toBeFalsy()
    });
});


