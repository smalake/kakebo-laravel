import React from "react";

export class ToTop extends React.Component {
    componentDidMount(prevProps: any) {
        window.scrollTo(0, 0);
    }

    render() {
        return null;
    }
}
