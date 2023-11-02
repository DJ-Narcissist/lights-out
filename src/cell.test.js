import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Cell from "./Cell";
import { test } from "node:test";


test('renders Cell Component', ( )=> {
    const { container } = render(<Cell isLit={true} />);
    expect(container.firstChild).toMatchSnapShot();
});