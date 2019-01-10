import BeerList from "./BeerList.js";

it("shallow render correctly", () => {
    const wrapper = shallow(
        <BeerList hasLabels="Y" />
    );

    expect(wrapper).toMatchSnapshot();
})

it("renders correctly", () => {
    const wrapper = render(
        <BeerList hasLabels="Y" />
    );

    expect(wrapper).toMatchSnapshot();
})

it("initial state set up properly", () => {
    const wrapper = shallow(
        <BeerList hasLabels="Y"/>
    )
    expect(wrapper.state("beers")).toEqual([]);
})
