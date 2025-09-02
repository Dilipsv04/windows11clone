
import React from 'react';

interface SelectionBoxProps {
    x: number;
    y: number;
    width: number;
    height: number;
}

const SelectionBox: React.FC<SelectionBoxProps> = ({ x, y, width, height }) => {
    return (
        <div
            className="absolute bg-blue-400/20 border border-blue-400/50"
            style={{ left: x, top: y, width, height }}
        />
    );
};

export default SelectionBox;